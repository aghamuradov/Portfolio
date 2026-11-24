(function () {
    'use strict';

    var root = document.documentElement;
    var nav = document.getElementById('nav');
    var burger = document.getElementById('burger');
    var links = document.getElementById('nav-links');
    var progress = document.getElementById('scroll-progress');
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Farbschema ---------- */
    document.getElementById('theme-toggle').addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });

    /* ---------- Mobiles Menü ---------- */
    function closeMenu() {
        links.classList.remove('open');
        nav.classList.remove('menu-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Menü öffnen');
    }
    burger.addEventListener('click', function () {
        var open = !links.classList.contains('open');
        links.classList.toggle('open', open);
        nav.classList.toggle('menu-open', open);
        burger.setAttribute('aria-expanded', String(open));
        burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    });
    links.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

    /* ---------- Scroll: Navigation + Fortschritt ---------- */
    var ticking = false;
    function onScroll() {
        var y = window.scrollY;
        nav.classList.toggle('scrolled', y > 40);
        var max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
        ticking = false;
    }
    window.addEventListener('scroll', function () {
        if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
    onScroll();

    /* ---------- Aktiver Menüpunkt ---------- */
    var navMap = {};
    links.querySelectorAll('a').forEach(function (a) { navMap[a.getAttribute('href').slice(1)] = a; });
    if ('IntersectionObserver' in window) {
        var secObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (en.isIntersecting && navMap[en.target.id]) {
                    Object.keys(navMap).forEach(function (k) { navMap[k].classList.remove('active'); });
                    navMap[en.target.id].classList.add('active');
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        document.querySelectorAll('main section[id]').forEach(function (s) { secObs.observe(s); });
    }

    /* ---------- Reveal-Animationen ---------- */
    var revealTargets = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !reduceMotion) {
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (!en.isIntersecting) return;
                var el = en.target;
                var siblings = el.parentElement ? Array.prototype.filter.call(el.parentElement.children, function (c) { return c.classList.contains('reveal'); }) : [];
                var idx = Math.max(0, siblings.indexOf(el));
                el.style.transitionDelay = Math.min(idx * 80, 400) + 'ms';
                el.classList.add('in');
                if (el.classList.contains('stat')) countUp(el.querySelector('.stat-num'));
                obs.unobserve(el);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        revealTargets.forEach(function (el) { obs.observe(el); });
    } else {
        revealTargets.forEach(function (el) { el.classList.add('in'); });
    }

    /* ---------- Zähler ---------- */
    function countUp(el) {
        if (!el || reduceMotion) return;
        var target = parseFloat(el.getAttribute('data-count'));
        var dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
        var start = null, dur = 1400;
        function fmt(v) { return v.toFixed(dec).replace('.', ','); }
        function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = fmt(target * eased);
            if (p < 1) requestAnimationFrame(step); else el.textContent = fmt(target);
        }
        requestAnimationFrame(step);
    }

    /* ---------- Schreibmaschinen-Effekt ---------- */
    var typed = document.getElementById('typed');
    var phrases = [
        'mit klassischen Algorithmen.',
        'mit Machine Learning.',
        'mit großen Sprachmodellen.',
        'mit Python und pandas.',
        'für bessere Entscheidungen.'
    ];
    if (typed && !reduceMotion) {
        var pi = 0, ci = phrases[0].length, deleting = true;
        setTimeout(function tick() {
            var word = phrases[pi];
            if (deleting) {
                ci--;
                typed.textContent = word.slice(0, ci);
                if (ci <= 0) { deleting = false; pi = (pi + 1) % phrases.length; }
                setTimeout(tick, 35);
            } else {
                word = phrases[pi];
                ci++;
                typed.textContent = word.slice(0, ci);
                if (ci >= word.length) { deleting = true; setTimeout(tick, 2200); }
                else setTimeout(tick, 65);
            }
        }, 2600);
    }

    /* ---------- PDF-Vorschau ---------- */
    var modal = document.getElementById('doc-modal');
    var frame = document.getElementById('doc-modal-frame');
    var title = document.getElementById('doc-modal-title');
    var openTab = document.getElementById('doc-modal-open');
    var dl = document.getElementById('doc-modal-download');
    // Mobile Browser zeigen PDFs in iframes oft nicht an – dort direkt im neuen Tab öffnen.
    var canEmbed = typeof modal.showModal === 'function' &&
        window.matchMedia('(min-width: 768px) and (pointer: fine)').matches;

    document.querySelectorAll('[data-doc]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            var href = a.getAttribute('href');
            if (!canEmbed) {
                e.preventDefault();
                window.open(href, '_blank', 'noopener');
                return;
            }
            e.preventDefault();
            title.textContent = a.getAttribute('data-title') || 'Dokument';
            frame.src = href + '#view=FitH';
            openTab.href = href;
            dl.href = href;
            modal.showModal();
        });
    });
    function closeModal() { modal.close(); }
    document.getElementById('doc-modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    modal.addEventListener('close', function () { frame.src = 'about:blank'; });

    /* ---------- Parallaxe für Fotobänder ---------- */
    var parallaxImgs = document.querySelectorAll('[data-parallax]');
    if (parallaxImgs.length && !reduceMotion) {
        var pTicking = false;
        function parallax() {
            var vh = window.innerHeight;
            parallaxImgs.forEach(function (img) {
                var r = img.parentElement.parentElement.getBoundingClientRect();
                if (r.bottom < 0 || r.top > vh) return;
                var p = (r.top + r.height / 2 - vh / 2) / (vh + r.height); // -0.5 … 0.5
                img.style.transform = 'translate3d(0,' + (p * -18).toFixed(2) + '%,0)';
            });
            pTicking = false;
        }
        window.addEventListener('scroll', function () {
            if (!pTicking) { requestAnimationFrame(parallax); pTicking = true; }
        }, { passive: true });
        window.addEventListener('resize', parallax);
        parallax();
    }

    /* ---------- Jahr ---------- */
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
