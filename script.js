// ============================
// Document Ready
// ============================
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initContactForm();
    initParticleEffect();
});

// ============================
// Navbar Effects
// ============================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ============================
// Mobile Menu
// ============================
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ============================
// Smooth Scroll
// ============================
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================
// Scroll Reveal Animation
// ============================
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        reveals.forEach((reveal, index) => {
            const revealTop = reveal.getBoundingClientRect().top;

            if (revealTop < windowHeight - revealPoint) {
                // Add staggered delay for project cards
                if (reveal.closest('.projects-grid') || reveal.closest('.photo-grid')) {
                    setTimeout(() => {
                        reveal.classList.add('active');
                    }, index * 100);
                } else {
                    reveal.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger on load
    revealOnScroll();
}

// ============================
// Contact Form
// ============================
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.btn-submit');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Simulate form submission
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        // Simulate successful submission
        setTimeout(() => {
            submitBtn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
            submitBtn.style.background = 'linear-gradient(135deg, #27ca40, #1a9f2e)';

            // Reset form
            form.reset();

            // Show success message
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 2000);

        // In a real application, you would send this data to a server
        console.log('Form submitted:', { name, email, message });
    });

    // Input focus effects
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const icon = group.querySelector('.form-icon');

        input.addEventListener('focus', () => {
            icon.style.color = 'var(--primary-color)';
        });

        input.addEventListener('blur', () => {
            icon.style.color = 'var(--text-muted)';
        });
    });
}

// ============================
// Particle Effect (Hero Background)
// ============================
function initParticleEffect() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    // Create floating particles
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random properties
    const size = Math.random() * 4 + 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;

    // Style the particle
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        top: ${y}%;
        background: rgba(0, 212, 255, ${Math.random() * 0.5 + 0.1});
        border-radius: 50%;
        animation: float ${duration}s ease-in-out ${delay}s infinite;
    `;

    container.appendChild(particle);
}

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.5;
        }
        25% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * -100}px) scale(1.5);
            opacity: 1;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1);
            opacity: 0.5;
        }
        75% {
            transform: translate(${Math.random() * -100}px, ${Math.random() * 100 - 50}px) scale(1.5);
            opacity: 1;
        }
    }
`;
document.head.appendChild(particleStyle);

// ============================
// Skill Progress Animation
// ============================
function initSkillAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');

    const animateSkills = () => {
        skillItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const progress = item.querySelector('.skill-progress');

            if (rect.top < window.innerHeight - 100) {
                setTimeout(() => {
                    const width = progress.style.getPropertyValue('--progress');
                    progress.style.width = width;
                }, index * 150);
            }
        });
    };

    window.addEventListener('scroll', animateSkills);
    animateSkills();
}

// Initialize skill animation
initSkillAnimation();

// ============================
// Button Hover Effects
// ============================
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', (e) => {
        // Add ripple effect
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        btn.style.setProperty('--ripple-x', x + 'px');
        btn.style.setProperty('--ripple-y', y + 'px');
    });
});

// ============================
// Project Card Hover Effects
// ============================
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// ============================
// Photo Card Hover Effect
// ============================
const photoCards = document.querySelectorAll('.photo-card');
photoCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('reveal');
});

// ============================
// Add stagger animation to elements
// ============================
function initStaggerAnimation() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
        card.classList.add('reveal');
    });

    const goalItems = document.querySelectorAll('.goal-item');
    goalItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('reveal');
    });
}

initStaggerAnimation();

// ============================
// Performance: Debounce Scroll Events
// ============================
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// ============================
// Cursor Trail Effect (Optional - Lightweight)
// ============================
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor following
function animateCursor() {
    const diffX = mouseX - cursorX;
    const diffY = mouseY - cursorY;

    cursorX += diffX * 0.1;
    cursorY += diffY * 0.1;

    requestAnimationFrame(animateCursor);
}
animateCursor();

// ============================
// Intersection Observer for Lazy Loading
// ============================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all reveal elements
document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// ============================
// Console Welcome Message
// ============================
console.log('%c👋 Welcome to Roy Silvance\'s Portfolio!', 'font-size: 20px; color: #00d4ff; font-weight: bold;');
console.log('%c🚀 Feel free to explore the code and connect with me!', 'font-size: 14px; color: #7c3aed;');
console.log('%c💻 "Coding the Future, Defending the Digital World"', 'font-size: 12px; color: #ff006e; font-style: italic;');
