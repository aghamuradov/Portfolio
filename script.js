// ===================================
// Preloader
// ===================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 500);
});

// ===================================
// Header Scroll Effect
// ===================================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Mobile Menu Toggle
// ===================================
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===================================
// Active Navigation Link
// ===================================
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

// ===================================
// Smooth Scroll
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
            e.preventDefault();
            
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Back to Top Button
// ===================================
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Scroll Animations (Intersection Observer)
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// Add animate-on-scroll class to timeline items, project cards, etc.
window.addEventListener('DOMContentLoaded', () => {
    // Timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.classList.add('animate-on-scroll');
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.transitionDelay = `${index * 0.15}s`;
    });
    
    // Skill categories
    document.querySelectorAll('.skill-category').forEach((category, index) => {
        category.classList.add('animate-on-scroll');
        category.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Contact items
    document.querySelectorAll('.contact-item').forEach((item, index) => {
        item.classList.add('animate-on-scroll');
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Re-observe all animated elements
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
});

// ===================================
// Typing Effect for Hero Subtitle
// ===================================
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    heroSubtitle.style.opacity = '1';
    
    let charIndex = 0;
    
    function typeText() {
        if (charIndex < text.length) {
            heroSubtitle.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 50);
        }
    }
    
    setTimeout(typeText, 800);
}

// ===================================
// Dynamic Year in Footer
// ===================================
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-text p');
if (footerText) {
    footerText.textContent = footerText.textContent.replace('2025', currentYear);
}

// ===================================
// Parallax Effect for Hero Background
// ===================================
const heroBackground = document.querySelector('.hero-background');

if (heroBackground) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// ===================================
// Mouse Move Effect for Hero
// ===================================
const hero = document.querySelector('.hero');

if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPercent = (clientX / innerWidth - 0.5) * 20;
        const yPercent = (clientY / innerHeight - 0.5) * 20;
        
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translate(${xPercent}px, ${yPercent}px)`;
        }
    });
    
    hero.addEventListener('mouseleave', () => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = 'translate(0, 0)';
        }
    });
}

// ===================================
// Lazy Loading Images (if any are added later)
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Console Message
// ===================================
console.log('%c👋 Hallo! Willkommen auf meinem Portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cInteressiert an einer Zusammenarbeit? Kontaktieren Sie mich!', 'color: #8b5cf6; font-size: 14px;');
console.log('%c📧 s.aghamuradov@gmail.com', 'color: #ec4899; font-size: 14px;');

// ===================================
// Performance Optimization
// ===================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedUpdateActiveLink = debounce(updateActiveLink, 100);
window.removeEventListener('scroll', updateActiveLink);
window.addEventListener('scroll', debouncedUpdateActiveLink);

// ===================================
// Easter Egg: Konami Code
// ===================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    // Add rainbow effect to the page
    document.body.style.animation = 'rainbow 3s infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Show a fun message
    const message = document.createElement('div');
    message.textContent = '🎉 Konami Code aktiviert! 🎉';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        padding: 2rem 3rem;
        border-radius: 20px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 10001;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        animation: bounceIn 0.5s ease;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'bounceOut 0.5s ease';
        setTimeout(() => {
            message.remove();
            document.body.style.animation = '';
            style.remove();
        }, 500);
    }, 3000);
}

// ===================================
// Print Styles Detection
// ===================================
if (window.matchMedia) {
    const mediaQueryList = window.matchMedia('print');
    mediaQueryList.addListener((mql) => {
        if (mql.matches) {
            console.log('Printing page...');
        }
    });
}

// ===================================
// Accessibility: Skip to main content
// ===================================
const skipLink = document.querySelector('a[href="#article"]');
if (skipLink) {
    skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById('article') || document.querySelector('article');
        if (target) {
            target.setAttribute('tabindex', '-1');
            target.focus();
        }
    });
}

// ===================================
// Initialize
// ===================================
console.log('✅ Portfolio website loaded successfully!');
