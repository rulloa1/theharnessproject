/**
 * SPECTACULAR LANDING PAGE ANIMATIONS
 * The HARNESS Project - Interactive & Engaging Experience
 * Created: January 25, 2026
 * Extracted from index.html
 */

(function () {
    'use strict';

    // ========== PAGE LOADER ========== //
    window.addEventListener('load', function () {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => loader.remove(), 500);
            }, 1000);
        }
    });

    // ========== SCROLL ANIMATIONS ========== //
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animation elements
    document.addEventListener('DOMContentLoaded', function () {
        const animatedElements = document.querySelectorAll(
            '.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .section-header'
        );
        animatedElements.forEach(el => observer.observe(el));
    });

    // ========== ANIMATED COUNTER ========== //
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);

        element.classList.add('counting');
    }

    // Observe stat numbers for counting animation
    const statsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.stat-number').forEach(el => {
            statsObserver.observe(el);
        });
    });

    // ========== PARALLAX EFFECT ========== //
    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');

        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });

        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // ========== NAVBAR SCROLL EFFECT ========== //
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const nav = document.querySelector('nav');
        if (!nav) return;
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 500) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // ========== SMOOTH SCROLL FOR ANCHOR LINKS ========== //
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href !== '') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    });

    // ========== FLOATING PARTICLES GENERATION ========== //
    function createParticles() {
        const particlesContainer = document.querySelector('.hero-particles');
        if (!particlesContainer) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    document.addEventListener('DOMContentLoaded', createParticles);

    // ========== INTERACTIVE TOOL CARDS ========== //
    document.addEventListener('DOMContentLoaded', function () {
        const toolCards = document.querySelectorAll('.tool-card-interactive');

        toolCards.forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.zIndex = '10';
            });

            card.addEventListener('mouseleave', function () {
                this.style.zIndex = '1';
            });

            // Add ripple effect on click
            card.addEventListener('click', function (e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    top: ${y}px;
                    left: ${x}px;
                    background: radial-gradient(circle, rgba(0,189,189,0.3) 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                    animation: ripple 0.6s ease-out;
                `;

                this.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });
    });

    // Add ripple animation in JS generated style if not in CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ========== TESTIMONIAL SLIDER ========== //
    class TestimonialSlider {
        constructor(container) {
            this.container = container;
            this.testimonials = [];
            this.currentIndex = 0;
            this.autoplayInterval = null;
        }

        init(testimonials) {
            this.testimonials = testimonials;
            this.render();
            this.startAutoplay();
        }

        render() {
            if (!this.container || this.testimonials.length === 0) return;

            const testimonial = this.testimonials[this.currentIndex];
            this.container.innerHTML = `
                <div class="testimonial-card fade-in-up visible">
                    <div class="testimonial-quote">${testimonial.quote}</div>
                    <div class="testimonial-author">${testimonial.author}</div>
                    <div class="testimonial-role">${testimonial.role}</div>
                </div>
            `;
        }

        next() {
            this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
            this.render();
        }

        prev() {
            this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
            this.render();
        }

        startAutoplay() {
            this.autoplayInterval = setInterval(() => this.next(), 5000);
        }

        stopAutoplay() {
            if (this.autoplayInterval) {
                clearInterval(this.autoplayInterval);
            }
        }
    }

    // Initialize testimonial slider
    document.addEventListener('DOMContentLoaded', function () {
        const sliderContainer = document.querySelector('.testimonial-slider');
        if (sliderContainer) {
            const slider = new TestimonialSlider(sliderContainer);

            const testimonials = [
                {
                    quote: "The HARNESS Project transformed how we teach sexual health education. The tools are engaging, practical, and evidence-based.",
                    author: "Dr. Sarah Johnson",
                    role: "Health Educator, University of California"
                },
                {
                    quote: "Finally, a comprehensive platform that makes SafER sex education accessible and empowering for everyone.",
                    author: "Michael Chen",
                    role: "Public Health Director"
                },
                {
                    quote: "The interactive tools and visual resources make complex topics easy to understand and discuss with students.",
                    author: "Jennifer Martinez",
                    role: "High School Health Teacher"
                }
            ];

            slider.init(testimonials);
        }
    });

    // ========== FEATURE CARD 3D TILT EFFECT ========== //
    document.addEventListener('DOMContentLoaded', function () {
        const cards = document.querySelectorAll('.feature-card-3d');

        cards.forEach(card => {
            card.addEventListener('mousemove', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                this.style.transform = `
                    translateY(-15px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg)
                `;
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            });
        });
    });

    // ========== MOBILE MENU TOGGLE ========== //
    document.addEventListener('DOMContentLoaded', function () {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        if (hamburger && navLinks) {
            hamburger.addEventListener('click', function () {
                this.classList.toggle('active');
                navLinks.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', function (e) {
                if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        }
    });

    // ========== CURSOR TRAIL EFFECT (Optional) ========== //
    let cursorTrail = [];
    const trailLength = 10;

    function createCursorTrail(e) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: linear-gradient(135deg, #00BDBD, #F6CC00);
            pointer-events: none;
            z-index: 9999;
            opacity: 0.6;
            left: ${e.clientX - 4}px;
            top: ${e.clientY - 4}px;
            animation: cursorFade 0.5s ease-out forwards;
        `;

        document.body.appendChild(trail);
        cursorTrail.push(trail);

        if (cursorTrail.length > trailLength) {
            const oldTrail = cursorTrail.shift();
            oldTrail.remove();
        }
    }

    // Add cursor trail animation
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        @keyframes cursorFade {
            to {
                opacity: 0;
                transform: scale(0);
            }
        }
    `;
    document.head.appendChild(cursorStyle);

    // Enable cursor trail on desktop only
    if (window.innerWidth > 1024) {
        let throttle = false;
        document.addEventListener('mousemove', function (e) {
            if (!throttle) {
                createCursorTrail(e);
                throttle = true;
                setTimeout(() => throttle = false, 50);
            }
        });
    }

    // ========== CONSOLE EASTER EGG ========== //
    console.log('%c🛡️ The HARNESS Project',
        'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #00BDBD, #F6CC00, #DD0E6E); -webkit-background-clip: text; color: transparent;');
    console.log('%cEmpowering Sexual Health Education Since 2024',
        'font-size: 14px; color: #666;');
    console.log('%c💡 Interested in our code? We\'re hiring! Visit theharnessproject.org/careers',
        'font-size: 12px; color: #00BDBD;');

})();
