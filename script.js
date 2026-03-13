// === GSAP SPLIT TEXT ANIMATION ===
document.addEventListener('DOMContentLoaded', () => {
    // Wait for fonts to load
    document.fonts.ready.then(() => {
        // Register GSAP plugins
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            // Check if SplitText is available
            if (typeof SplitText !== 'undefined') {
                // Animate "Rivalz"
                const rivalzElement = document.querySelector('.split-text-rivalz');
                if (rivalzElement) {
                    const splitRivalz = new SplitText(rivalzElement, { 
                        type: 'chars',
                        charsClass: 'split-char'
                    });
                    
                    gsap.fromTo(splitRivalz.chars, 
                        {
                            opacity: 0,
                            y: 60,
                            rotationX: -90
                        },
                        {
                            opacity: 1,
                            y: 0,
                            rotationX: 0,
                            duration: 1.8,
                            ease: 'power3.out',
                            stagger: 0.15,
                            scrollTrigger: {
                                trigger: rivalzElement,
                                start: 'top 90%',
                                once: true
                            }
                        }
                    );
                }
                
                // Animate "DevCore."
                const devcoreElement = document.querySelector('.split-text-devcore');
                if (devcoreElement) {
                    const splitDevcore = new SplitText(devcoreElement, { 
                        type: 'chars',
                        charsClass: 'split-char'
                    });
                    
                    gsap.fromTo(splitDevcore.chars, 
                        {
                            opacity: 0,
                            y: 60,
                            scale: 0.5,
                            rotationY: 90
                        },
                        {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            rotationY: 0,
                            duration: 1.8,
                            ease: 'power3.out',
                            stagger: 0.15,
                            delay: 0.8,
                            scrollTrigger: {
                                trigger: devcoreElement,
                                start: 'top 90%',
                                once: true
                            }
                        }
                    );
                }
            }
        }
    });
});

// === PRELOADER ===
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hide');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        }, 1000);
    }
    
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    updateTime();
    setInterval(updateTime, 1000);
});

// === CURSOR TRAIL ANIMATION ===
let lastMouseMoveTime = Date.now();
let mouseMoving = false;
let mouseTimeout;

document.addEventListener('mousemove', (e) => {
    lastMouseMoveTime = Date.now();
    mouseMoving = true;
    
    // Clear existing timeout
    clearTimeout(mouseTimeout);
    
    // Create triangle
    const triangle = document.createElement('div');
    triangle.className = 'cursor-triangle';
    triangle.style.left = e.clientX + 'px';
    triangle.style.top = e.clientY + 'px';
    
    document.body.appendChild(triangle);
    
    // Remove triangle after animation
    setTimeout(() => {
        triangle.remove();
    }, 1000);
    
    // Set timeout to stop creating triangles
    mouseTimeout = setTimeout(() => {
        mouseMoving = false;
    }, 50);
});

// === CLICK CIRCLE ANIMATION ===
document.addEventListener('click', (e) => {
    // Create white circle on click
    const circle = document.createElement('div');
    circle.className = 'cursor-click-circle';
    circle.style.left = e.clientX + 'px';
    circle.style.top = e.clientY + 'px';
    
    document.body.appendChild(circle);
    
    // Remove circle after animation
    setTimeout(() => {
        circle.remove();
    }, 1000);
});

// === LOCAL TIME LOGIC ===
function updateTime() {
    const timeDisplay = document.getElementById('local-time');
    if (timeDisplay) {
        const now = new Date();
        timeDisplay.textContent = now.toLocaleTimeString('en-IN', {
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }
}

// === DARK MODE LOGIC ===
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

if (themeToggle) {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        html.classList.remove('dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        if (html.classList.contains('dark')) {
            localStorage.theme = 'dark';
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.theme = 'light';
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// === MOBILE MENU ===
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');
const closeBtn = document.getElementById('close-menu');
const links = document.querySelectorAll('.mobile-link');

const toggleMenu = () => {
    if (menu) {
        const isOpen = menu.style.opacity === '1';
        menu.style.opacity = isOpen ? '0' : '1';
        menu.style.pointerEvents = isOpen ? 'none' : 'auto';
    }
};

if (btn) btn.addEventListener('click', toggleMenu);
if (closeBtn) closeBtn.addEventListener('click', toggleMenu);
links.forEach(link => link.addEventListener('click', toggleMenu));

// === SCROLL TO TOP & ACTIVE NAVIGATION (ScrollSpy) ===
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const sections = document.querySelectorAll('.section-spy');
const navLinks = document.querySelectorAll('.nav-link');
const navBar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (scrollToTopBtn) {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.remove('translate-y-20', 'opacity-0');
        } else {
            scrollToTopBtn.classList.add('translate-y-20', 'opacity-0');
        }
    }

    // Add shadow to nav on scroll
    if (navBar) {
        if (window.scrollY > 50) {
            navBar.classList.add('scrolled');
        } else {
            navBar.classList.remove('scrolled');
        }
    }

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-primary', 'dark:text-white', 'font-bold');
        link.classList.add('text-slate-600', 'dark:text-slate-400');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('text-primary', 'dark:text-white', 'font-bold');
            link.classList.remove('text-slate-600', 'dark:text-slate-400');
        }
    });
});

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// === PROJECT FILTER LOGIC ===
const filterBtns = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projects.forEach(project => {
            const categories = project.getAttribute('data-filter-category').split(' ');
            
            if (filterValue === 'all' || categories.includes(filterValue)) {
                project.style.display = 'block';
                project.classList.add('reveal-on-scroll', 'is-visible');
            } else {
                project.style.display = 'none';
                project.classList.remove('reveal-on-scroll', 'is-visible');
            }
        });
    });
});

// === 3D TILT EFFECT ===
if (window.matchMedia("(min-width: 768px)").matches) {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -3; 
            const rotateY = ((x - centerX) / centerX) * 3;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// === PARALLAX EFFECT ===
window.addEventListener('scroll', () => {
    const parallaxImages = document.querySelectorAll('.parallax-img');
    parallaxImages.forEach(img => {
        const rect = img.parentElement.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
            const speed = 0.08;
            const yPos = (window.innerHeight - rect.top) * speed;
            img.style.transform = `translateY(${yPos - 20}px) scale(1.1)`;
        }
    });
});

// === PROJECT MODAL LOGIC ===
const modal = document.getElementById('project-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalContent = document.getElementById('modal-content');
const closeModal = document.getElementById('close-modal');
const triggers = document.querySelectorAll('.project-trigger');

const mTitle = document.getElementById('modal-title');
const mCategory = document.getElementById('modal-category');
const mImage = document.getElementById('modal-image');
const mDesc = document.getElementById('modal-desc');

function openModal(data) {
    if (modal && mTitle && mCategory && mImage && mDesc) {
        mTitle.textContent = data.title;
        mCategory.textContent = data.category;
        mImage.src = data.image;
        mDesc.textContent = data.desc;

        modal.classList.remove('hidden');
        setTimeout(() => {
            if (modalBackdrop) modalBackdrop.classList.remove('opacity-0');
            if (modalContent) {
                modalContent.classList.remove('scale-95', 'opacity-0');
                modalContent.classList.add('scale-100', 'opacity-100');
            }
        }, 10);
        document.body.style.overflow = 'hidden'; 
    }
}

function hideModal() {
    if (modalBackdrop) modalBackdrop.classList.add('opacity-0');
    if (modalContent) {
        modalContent.classList.remove('scale-100', 'opacity-100');
        modalContent.classList.add('scale-95', 'opacity-0');
    }
    
    setTimeout(() => {
        if (modal) modal.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}

triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const data = {
            title: trigger.dataset.title,
            category: trigger.dataset.category,
            image: trigger.dataset.image,
            desc: trigger.dataset.desc
        };
        openModal(data);
    });
});

if (closeModal) closeModal.addEventListener('click', hideModal);
if (modalBackdrop) modalBackdrop.addEventListener('click', hideModal);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideModal();
});

// === TOAST NOTIFICATION LOGIC ===
const toastContainer = document.getElementById('toast-container');
const contactForm = document.getElementById('contact-form');

function showToast(message, type = 'success') {
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    
    const icon = type === 'success' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-exclamation-circle"></i>';
    const colorClass = type === 'success' ? 'bg-slate-900 text-white dark:bg-white dark:text-black' : 'bg-red-500 text-white';

    toast.className = `flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl font-medium text-sm toast-enter toast-enter-active ${colorClass}`;
    toast.innerHTML = `${icon} <span>${message}</span>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('toast-enter-active');
        toast.classList.add('toast-exit-active');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-circle-notch animate-spin"></i> Sending...';
        btn.disabled = true;

        try {
            const formData = new FormData(contactForm);
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                showToast('Message sent successfully! We will contact you soon.');
                contactForm.reset();
            } else {
                showToast('Failed to send message. Please try again or contact via Discord.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('Failed to send message. Please try again or contact via Discord.', 'error');
        } finally {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    });
}

// === SCROLL REVEAL ANIMATION [MODERN] ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
    observer.observe(el);
});

// === MAGNETIC BUTTON EFFECT ===
const magneticBtns = document.querySelectorAll('.magnetic-btn');

if (window.matchMedia("(min-width: 768px)").matches) {
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
}

// === SPOTLIGHT EFFECT LOGIC [NEW] ===
const spotlightCards = document.querySelectorAll('.spotlight-card');

spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// === FLOATING PARTICLES EFFECT ===
function createFloatingParticle() {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 5000);
}

// Create particles periodically
setInterval(createFloatingParticle, 300);

// === SMOOTH SCROLL WITH EASING ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// === ADD RIPPLE EFFECT TO BUTTONS ===
document.querySelectorAll('button, .magnetic-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// === 3D R LOGO INTERACTIVE ROTATION ===
const rLogoContainer = document.getElementById('r-logo-container');
const rLogoText = document.getElementById('r-logo-text');

if (rLogoContainer && rLogoText && window.matchMedia("(min-width: 768px)").matches) {
    rLogoContainer.addEventListener('mousemove', (e) => {
        const rect = rLogoContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = ((x - centerX) / centerX) * 15;
        const rotateX = ((y - centerY) / centerY) * -15;
        
        rLogoText.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05)`;
        rLogoText.style.transition = 'transform 0.1s ease-out';
    });
    
    rLogoContainer.addEventListener('mouseleave', () => {
        rLogoText.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
        rLogoText.style.transition = 'transform 0.5s ease-out';
    });
}

// === SEE ALL SERVICES FUNCTIONALITY ===
const seeAllBtn = document.getElementById('see-all-btn');
const additionalServices = document.getElementById('additional-services');
let servicesExpanded = false;
let lastScrollY = window.scrollY;

if (seeAllBtn && additionalServices) {
    // Toggle services on button click
    seeAllBtn.addEventListener('click', () => {
        servicesExpanded = !servicesExpanded;
        
        if (servicesExpanded) {
            // Show additional services
            additionalServices.style.maxHeight = '2000px';
            additionalServices.style.opacity = '1';
            seeAllBtn.querySelector('i').style.transform = 'rotate(180deg)';
            seeAllBtn.querySelector('span').textContent = 'Show Less';
            lastScrollY = window.scrollY; // Remember scroll position when expanded
        } else {
            // Hide additional services
            additionalServices.style.maxHeight = '0';
            additionalServices.style.opacity = '0';
            seeAllBtn.querySelector('i').style.transform = 'rotate(0deg)';
            seeAllBtn.querySelector('span').textContent = 'See All Services';
        }
    });
}

// === SERVICE DETAILS PAGE FUNCTIONALITY ===
const serviceDetailsPage = document.getElementById('serviceDetailsPage');
const detailsServiceIcon = document.getElementById('detailsServiceIcon');
const detailsServiceTitle = document.getElementById('detailsServiceTitle');
const detailsServiceSubtitle = document.getElementById('detailsServiceSubtitle');
const detailsDeliveryBadge = document.getElementById('detailsDeliveryBadge');
const detailsPriceBadge = document.getElementById('detailsPriceBadge');
const detailsFeaturesList = document.getElementById('detailsFeaturesList');
const detailsProcessSteps = document.getElementById('detailsProcessSteps');
const detailsFaqList = document.getElementById('detailsFaqList');
const detailsOrderPrice = document.getElementById('detailsOrderPrice');
const detailsOrderDelivery = document.getElementById('detailsOrderDelivery');
const detailsCloseBtn = document.querySelector('.service-details-close');
const detailsOverlay = document.querySelector('.service-details-overlay');

// Service data with enhanced information
const serviceData = {
    'Discord Server Setup': {
        icon: 'fab fa-discord',
        subtitle: 'Professional server setup with bots, roles, channels and automation',
        features: ['Role & Permission Setup', 'Channel Organization', 'Moderation Bots', 'Ticket System', 'Welcome & Verification', 'Auto Moderation'],
        process: [
            { title: 'Consultation', desc: 'We discuss your server needs and requirements' },
            { title: 'Setup & Configuration', desc: 'Create roles, channels, and permissions structure' },
            { title: 'Bot Integration', desc: 'Install and configure moderation and utility bots' },
            { title: 'Testing & Delivery', desc: 'Test all features and provide documentation' }
        ],
        faq: [
            { q: 'How long does setup take?', a: 'Most Discord servers are completed within 24-48 hours depending on complexity.' },
            { q: 'Do you provide ongoing support?', a: 'Yes, we offer 30 days of free support after delivery.' },
            { q: 'Can you customize existing servers?', a: 'Absolutely! We can modify and improve existing Discord servers.' }
        ]
    },
    'Minecraft Server Development': {
        icon: 'fas fa-cube',
        subtitle: 'Custom plugins, server setup, and performance optimization',
        features: ['Custom Plugin Development', 'Server Configuration', 'Performance Optimization', 'World Management', 'Economy Systems', 'Anti-Cheat Setup'],
        process: [
            { title: 'Requirements Analysis', desc: 'Understanding your server vision and gameplay mechanics' },
            { title: 'Plugin Development', desc: 'Creating custom plugins tailored to your needs' },
            { title: 'Server Optimization', desc: 'Configuring for maximum performance and stability' },
            { title: 'Launch & Support', desc: 'Server launch with comprehensive documentation' }
        ],
        faq: [
            { q: 'What Minecraft versions do you support?', a: 'We support all major versions from 1.16 to the latest release.' },
            { q: 'Do you provide server hosting?', a: 'We can recommend hosting providers and help with setup.' },
            { q: 'Can you create custom game modes?', a: 'Yes, we specialize in unique custom game modes and mechanics.' }
        ]
    },
    'YouTube Channel Setup': {
        icon: 'fab fa-youtube',
        subtitle: 'Full channel branding, banners, SEO, and automation tools',
        features: ['Channel Branding', 'Custom Banners & Thumbnails', 'SEO Optimization', 'Video Templates', 'Automation Tools', 'Analytics Setup'],
        process: [
            { title: 'Brand Strategy', desc: 'Develop your unique channel identity and niche' },
            { title: 'Visual Design', desc: 'Create stunning banners, logos, and thumbnail templates' },
            { title: 'SEO Optimization', desc: 'Optimize channel for maximum discoverability' },
            { title: 'Launch Strategy', desc: 'Content calendar and growth strategy implementation' }
        ],
        faq: [
            { q: 'Do you help with content creation?', a: 'We focus on channel setup and branding, but can provide content strategy guidance.' },
            { q: 'How long until I see results?', a: 'Channel optimization effects are typically visible within 2-4 weeks.' },
            { q: 'Do you provide ongoing SEO support?', a: 'Yes, we offer monthly SEO optimization packages.' }
        ]
    },
    'Custom Discord Bots': {
        icon: 'fas fa-robot',
        subtitle: 'Powerful bots with moderation, leveling, tickets and automation',
        features: ['Moderation Commands', 'Leveling System', 'Ticket System', 'Custom Commands', 'Auto Responses', 'Music & Entertainment'],
        process: [
            { title: 'Feature Planning', desc: 'Define bot functionality and command structure' },
            { title: 'Development', desc: 'Code the bot with all requested features' },
            { title: 'Testing', desc: 'Comprehensive testing in development environment' },
            { title: 'Deployment', desc: 'Deploy bot and provide hosting setup guidance' }
        ],
        faq: [
            { q: 'Do you provide bot hosting?', a: 'We can set up hosting or recommend reliable hosting services.' },
            { q: 'Can you add features later?', a: 'Yes, we offer ongoing development and feature additions.' },
            { q: 'Is the source code included?', a: 'Yes, you receive full source code and documentation.' }
        ]
    },
    'Minecraft Texture Pack': {
        icon: 'fas fa-palette',
        subtitle: 'Custom texture packs with unique designs and optimized performance',
        features: ['Custom Block Textures', 'Item Redesigns', 'GUI Customization', 'Performance Optimized', 'HD & Low-Res Options', 'Installation Support'],
        process: [
            { title: 'Style Consultation', desc: 'Discuss your preferred art style and theme' },
            { title: 'Asset Creation', desc: 'Design and create all texture assets' },
            { title: 'Pack Assembly', desc: 'Compile textures into optimized resource pack' },
            { title: 'Testing & Delivery', desc: 'Test across versions and provide installation guide' }
        ],
        faq: [
            { q: 'What resolutions do you offer?', a: 'We create packs in 16x, 32x, 64x, and 128x resolutions.' },
            { q: 'Do you support modded Minecraft?', a: 'Yes, we can create textures for popular mod packs.' },
            { q: 'Can I request revisions?', a: 'Yes, we include up to 3 revision rounds in our service.' }
        ]
    },
    'Thumbnails': {
        icon: 'fas fa-image',
        subtitle: 'Eye-catching thumbnails for YouTube, Twitch, and social media',
        features: ['YouTube Thumbnails', 'Twitch Graphics', 'Social Media Posts', 'Custom Designs', 'Fast Delivery', 'Unlimited Revisions'],
        process: [
            { title: 'Brief & Style', desc: 'Understand your brand and thumbnail requirements' },
            { title: 'Concept Design', desc: 'Create initial thumbnail concepts and layouts' },
            { title: 'Refinement', desc: 'Polish designs based on your feedback' },
            { title: 'Final Delivery', desc: 'Deliver high-quality files in multiple formats' }
        ],
        faq: [
            { q: 'How many thumbnails do I get?', a: 'Packages start from 5 thumbnails with bulk discounts available.' },
            { q: 'What file formats do you provide?', a: 'We deliver PNG, JPG, and PSD files for maximum flexibility.' },
            { q: 'Do you create thumbnail templates?', a: 'Yes, we can create reusable templates for consistent branding.' }
        ]
    },
    'Web Designing': {
        icon: 'fas fa-code',
        subtitle: 'Modern, responsive websites with clean code and stunning visuals',
        features: ['Responsive Design', 'Modern UI/UX', 'Clean Code', 'SEO Optimized', 'Fast Loading', 'Cross-Browser Compatible'],
        process: [
            { title: 'Discovery & Planning', desc: 'Understand your business goals and target audience' },
            { title: 'Design & Prototyping', desc: 'Create wireframes and visual designs' },
            { title: 'Development', desc: 'Build responsive website with clean, optimized code' },
            { title: 'Launch & Optimization', desc: 'Deploy website and optimize for performance' }
        ],
        faq: [
            { q: 'Do you provide hosting?', a: 'We can recommend hosting providers and assist with setup.' },
            { q: 'Is the website mobile-friendly?', a: 'Yes, all our websites are fully responsive and mobile-optimized.' },
            { q: 'Do you offer maintenance?', a: 'Yes, we provide ongoing maintenance and update packages.' }
        ]
    },
    'Plugins & Mod Setup': {
        icon: 'fas fa-puzzle-piece',
        subtitle: 'Expert installation and configuration of plugins and mods',
        features: ['Plugin Installation', 'Mod Configuration', 'Compatibility Testing', 'Performance Tuning', 'Error Troubleshooting', '24/7 Support'],
        process: [
            { title: 'Requirements Review', desc: 'Analyze your plugin and mod requirements' },
            { title: 'Installation', desc: 'Install and configure all requested plugins/mods' },
            { title: 'Compatibility Testing', desc: 'Ensure all components work together smoothly' },
            { title: 'Documentation', desc: 'Provide setup guide and troubleshooting tips' }
        ],
        faq: [
            { q: 'What platforms do you support?', a: 'We support Minecraft, Discord, and various gaming platforms.' },
            { q: 'Do you fix compatibility issues?', a: 'Yes, we resolve conflicts and ensure smooth operation.' },
            { q: 'Is ongoing support included?', a: 'Yes, we provide 30 days of free support after setup.' }
        ]
    }
};

// Open enhanced service details page
function openServiceDetailsPage(serviceName, serviceInfo) {
    const data = serviceData[serviceName];
    if (!data || !serviceDetailsPage) return;

    // Update header information
    if (detailsServiceIcon) detailsServiceIcon.innerHTML = `<i class="${data.icon}"></i>`;
    if (detailsServiceTitle) detailsServiceTitle.textContent = serviceName;
    if (detailsServiceSubtitle) detailsServiceSubtitle.textContent = data.subtitle;
    if (detailsDeliveryBadge) detailsDeliveryBadge.innerHTML = `<i class="fas fa-clock"></i> ${serviceInfo.delivery}`;
    if (detailsPriceBadge) detailsPriceBadge.innerHTML = `<i class="fas fa-tag"></i> ${serviceInfo.price}`;
    if (detailsOrderPrice) detailsOrderPrice.textContent = serviceInfo.price;
    if (detailsOrderDelivery) detailsOrderDelivery.textContent = `Delivered in ${serviceInfo.delivery.toLowerCase()}`;

    // Update features list
    if (detailsFeaturesList) {
        detailsFeaturesList.innerHTML = '';
        data.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            detailsFeaturesList.appendChild(li);
        });
    }

    // Update process steps
    if (detailsProcessSteps) {
        detailsProcessSteps.innerHTML = '';
        data.process.forEach((step, index) => {
            const stepDiv = document.createElement('div');
            stepDiv.className = 'process-step';
            stepDiv.innerHTML = `
                <div class="process-step-number">${index + 1}</div>
                <div class="process-step-content">
                    <h4>${step.title}</h4>
                    <p>${step.desc}</p>
                </div>
            `;
            detailsProcessSteps.appendChild(stepDiv);
        });
    }

    // Update FAQ
    if (detailsFaqList) {
        detailsFaqList.innerHTML = '';
        data.faq.forEach(faqItem => {
            const faqDiv = document.createElement('div');
            faqDiv.className = 'faq-item';
            faqDiv.innerHTML = `
                <div class="faq-question">
                    ${faqItem.q}
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer">${faqItem.a}</div>
            `;
            
            // Add click event for FAQ toggle
            const question = faqDiv.querySelector('.faq-question');
            question.addEventListener('click', () => {
                faqDiv.classList.toggle('active');
            });
            
            detailsFaqList.appendChild(faqDiv);
        });
    }

    // Show the details page
    serviceDetailsPage.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        serviceDetailsPage.style.opacity = '1';
    }, 10);
}

// Close service details page
function closeServiceDetailsPage() {
    if (!serviceDetailsPage) return;
    
    serviceDetailsPage.style.opacity = '0';
    setTimeout(() => {
        serviceDetailsPage.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

// Initialize View Details buttons
document.addEventListener('DOMContentLoaded', () => {
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const serviceInfo = {
                service: button.dataset.service,
                desc: button.dataset.desc,
                features: button.dataset.features,
                delivery: button.dataset.delivery,
                price: button.dataset.price
            };
            
            // Open the enhanced details page
            openServiceDetailsPage(serviceInfo.service, serviceInfo);
        });
    });
    
    // Close details page events
    if (detailsCloseBtn) {
        detailsCloseBtn.addEventListener('click', closeServiceDetailsPage);
    }
    
    if (detailsOverlay) {
        detailsOverlay.addEventListener('click', closeServiceDetailsPage);
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && serviceDetailsPage && serviceDetailsPage.style.display === 'block') {
            closeServiceDetailsPage();
        }
    });
});

// === ORDER FORM FUNCTIONALITY ===
const orderFormPage = document.getElementById('orderFormPage');
const orderFormClose = document.querySelector('.order-form-close');
const orderFormOverlay = document.querySelector('.order-form-overlay');
const orderForm = document.getElementById('orderForm');
const orderQuantityInput = document.getElementById('orderQuantity');
const decreaseQtyBtn = document.getElementById('decreaseQty');
const increaseQtyBtn = document.getElementById('increaseQty');

// Order calculation variables
let basePrice = 15;
let quantity = 1;
let deliveryFee = 0;
let addonsTotal = 0;

// Service pricing data
const servicePricing = {
    'Discord Server Setup': { basic: 15, standard: 30, premium: 50 },
    'Minecraft Server Development': { basic: 50, standard: 100, premium: 200 },
    'YouTube Channel Setup': { basic: 30, standard: 60, premium: 100 },
    'Custom Discord Bots': { basic: 100, standard: 200, premium: 350 },
    'Minecraft Texture Pack': { basic: 40, standard: 80, premium: 150 },
    'Thumbnails': { basic: 10, standard: 25, premium: 50 },
    'Web Designing': { basic: 200, standard: 400, premium: 700 },
    'Plugins & Mod Setup': { basic: 20, standard: 40, premium: 75 }
};

// Open order form
function openOrderForm(serviceName) {
    if (!orderFormPage) return;
    
    // Set service name
    const orderServiceName = document.getElementById('orderServiceName');
    const orderServiceTitle = document.getElementById('orderServiceTitle');
    const orderServiceIcon = document.getElementById('orderServiceIcon');
    const summaryServiceName = document.getElementById('summaryServiceName');
    
    if (orderServiceName) orderServiceName.value = serviceName;
    if (orderServiceTitle) orderServiceTitle.textContent = `Order ${serviceName}`;
    if (summaryServiceName) summaryServiceName.textContent = serviceName;
    
    // Set icon based on service
    const iconMap = {
        'Discord Server Setup': 'fab fa-discord',
        'Minecraft Server Development': 'fas fa-cube',
        'YouTube Channel Setup': 'fab fa-youtube',
        'Custom Discord Bots': 'fas fa-robot',
        'Minecraft Texture Pack': 'fas fa-palette',
        'Thumbnails': 'fas fa-image',
        'Web Designing': 'fas fa-code',
        'Plugins & Mod Setup': 'fas fa-puzzle-piece'
    };
    
    if (orderServiceIcon) {
        orderServiceIcon.innerHTML = `<i class="${iconMap[serviceName] || 'fas fa-shopping-cart'}"></i>`;
    }
    
    // Update package prices based on service
    const pricing = servicePricing[serviceName] || { basic: 15, standard: 30, premium: 50 };
    const packageOptions = document.querySelectorAll('.package-option');
    packageOptions.forEach((option, index) => {
        const priceSpan = option.querySelector('.package-price');
        const prices = [pricing.basic, pricing.standard, pricing.premium];
        if (priceSpan) priceSpan.textContent = `$${prices[index]}`;
        option.dataset.price = prices[index];
    });
    
    // Reset form
    if (orderForm) orderForm.reset();
    quantity = 1;
    deliveryFee = 0;
    addonsTotal = 0;
    basePrice = pricing.basic;
    
    // Update summary
    updateOrderSummary();
    
    // Show form
    orderFormPage.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        orderFormPage.style.opacity = '1';
    }, 10);
}

// Close order form
function closeOrderForm() {
    if (!orderFormPage) return;
    
    orderFormPage.style.opacity = '0';
    setTimeout(() => {
        orderFormPage.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

// Update order summary
function updateOrderSummary() {
    const summaryBasePrice = document.getElementById('summaryBasePrice');
    const summaryQuantity = document.getElementById('summaryQuantity');
    const summarySubtotal = document.getElementById('summarySubtotal');
    const summaryDeliveryFee = document.getElementById('summaryDeliveryFee');
    const summaryAddons = document.getElementById('summaryAddons');
    const summaryTotal = document.getElementById('summaryTotal');
    const deliveryFeeItem = document.getElementById('deliveryFeeItem');
    const addonsItem = document.getElementById('addonsItem');
    
    const subtotal = basePrice * quantity;
    const total = subtotal + deliveryFee + addonsTotal;
    
    if (summaryBasePrice) summaryBasePrice.textContent = `$${basePrice.toFixed(2)}`;
    if (summaryQuantity) summaryQuantity.textContent = `x${quantity}`;
    if (summarySubtotal) summarySubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (summaryDeliveryFee) summaryDeliveryFee.textContent = `$${deliveryFee.toFixed(2)}`;
    if (summaryAddons) summaryAddons.textContent = `$${addonsTotal.toFixed(2)}`;
    if (summaryTotal) summaryTotal.textContent = `$${total.toFixed(2)}`;
    
    // Show/hide delivery fee and addons items
    if (deliveryFeeItem) {
        deliveryFeeItem.style.display = deliveryFee > 0 ? 'flex' : 'none';
    }
    if (addonsItem) {
        addonsItem.style.display = addonsTotal > 0 ? 'flex' : 'none';
    }
}

// Initialize order form events
document.addEventListener('DOMContentLoaded', () => {
    // Close button
    if (orderFormClose) {
        orderFormClose.addEventListener('click', closeOrderForm);
    }
    
    // Overlay click
    if (orderFormOverlay) {
        orderFormOverlay.addEventListener('click', closeOrderForm);
    }
    
    // Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && orderFormPage && orderFormPage.style.display === 'block') {
            closeOrderForm();
        }
    });
    
    // Quantity buttons
    if (decreaseQtyBtn) {
        decreaseQtyBtn.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                if (orderQuantityInput) orderQuantityInput.value = quantity;
                updateOrderSummary();
            }
        });
    }
    
    if (increaseQtyBtn) {
        increaseQtyBtn.addEventListener('click', () => {
            if (quantity < 100) {
                quantity++;
                if (orderQuantityInput) orderQuantityInput.value = quantity;
                updateOrderSummary();
            }
        });
    }
    
    // Quantity input change
    if (orderQuantityInput) {
        orderQuantityInput.addEventListener('change', (e) => {
            quantity = parseInt(e.target.value) || 1;
            if (quantity < 1) quantity = 1;
            if (quantity > 100) quantity = 100;
            e.target.value = quantity;
            updateOrderSummary();
        });
    }
    
    // Package selection
    const packageOptions = document.querySelectorAll('.package-option');
    packageOptions.forEach(option => {
        const radio = option.querySelector('input[type="radio"]');
        if (radio) {
            radio.addEventListener('change', (e) => {
                if (e.target.checked) {
                    basePrice = parseFloat(option.dataset.price) || 15;
                    const packageName = option.querySelector('h4').textContent;
                    const summaryServicePackage = document.getElementById('summaryServicePackage');
                    if (summaryServicePackage) {
                        summaryServicePackage.textContent = `${packageName} Package`;
                    }
                    updateOrderSummary();
                }
            });
        }
        
        // Make entire option clickable
        option.addEventListener('click', () => {
            const radio = option.querySelector('input[type="radio"]');
            if (radio) radio.click();
        });
    });
    
    // Delivery options
    const deliveryOptions = document.querySelectorAll('.delivery-option');
    deliveryOptions.forEach(option => {
        const radio = option.querySelector('input[type="radio"]');
        if (radio) {
            radio.addEventListener('change', (e) => {
                if (e.target.checked) {
                    deliveryFee = parseFloat(option.dataset.extra) || 0;
                    updateOrderSummary();
                }
            });
        }
        
        // Make entire option clickable
        option.addEventListener('click', () => {
            const radio = option.querySelector('input[type="radio"]');
            if (radio) radio.click();
        });
    });
    
    // Add-on options
    const addonOptions = document.querySelectorAll('.addon-option');
    addonOptions.forEach(option => {
        const checkbox = option.querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                addonsTotal = 0;
                document.querySelectorAll('.addon-option input[type="checkbox"]:checked').forEach(checked => {
                    addonsTotal += parseFloat(checked.dataset.price) || 0;
                });
                updateOrderSummary();
            });
        }
        
        // Make entire option clickable
        option.addEventListener('click', (e) => {
            if (e.target.tagName !== 'INPUT') {
                const checkbox = option.querySelector('input[type="checkbox"]');
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                    checkbox.dispatchEvent(new Event('change'));
                }
            }
        });
    });
    
    // Form submission
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(orderForm);
            const orderData = {
                service: formData.get('serviceName'),
                package: formData.get('package'),
                quantity: quantity,
                delivery: formData.get('delivery'),
                addons: Array.from(formData.getAll('addons')),
                specifications: formData.get('specifications'),
                name: formData.get('name'),
                email: formData.get('email'),
                discord: formData.get('discord'),
                total: (basePrice * quantity + deliveryFee + addonsTotal).toFixed(2)
            };
            
            // Create Discord message
            const message = `
**New Order Request**

**Service:** ${orderData.service}
**Package:** ${orderData.package}
**Quantity:** ${orderData.quantity}
**Delivery:** ${orderData.delivery}
**Add-ons:** ${orderData.addons.length > 0 ? orderData.addons.join(', ') : 'None'}

**Specifications:**
${orderData.specifications || 'No specifications provided'}

**Customer Information:**
Name: ${orderData.name}
Email: ${orderData.email}
Discord: ${orderData.discord || 'Not provided'}

**Total Amount:** $${orderData.total}
            `.trim();
            
            // Encode message for Discord
            const encodedMessage = encodeURIComponent(message);
            
            // Redirect to Discord
            window.open('https://discord.gg/7aSHAjgYeB', '_blank');
            
            // Show success message
            if (typeof showToast === 'function') {
                showToast('Order details prepared! Please complete your order on Discord.');
            }
            
            // Close form after a delay
            setTimeout(() => {
                closeOrderForm();
            }, 2000);
        });
    }
    
    // Update "Order Now" buttons to open order form
    document.addEventListener('click', (e) => {
        // Check if clicked element or its parent is an Order Now button
        const orderBtn = e.target.closest('.order-btn-primary, .service-modal-btn-primary, .order-now-btn');
        if (orderBtn) {
            e.preventDefault();
            e.stopPropagation();
            
            // Get service name from button data attribute or details page
            let serviceName = orderBtn.dataset.service || '';
            
            // If no data attribute, try to get from details page
            if (!serviceName && detailsServiceTitle) {
                serviceName = detailsServiceTitle.textContent;
            }
            
            if (serviceName) {
                // Close details page if open
                if (serviceDetailsPage && serviceDetailsPage.style.display === 'block') {
                    closeServiceDetailsPage();
                }
                
                // Open order form
                setTimeout(() => {
                    openOrderForm(serviceName);
                }, 300);
            }
        }
    });
    
    // Handle Order Now buttons from service cards directly
    const orderNowButtons = document.querySelectorAll('.order-now-btn');
    orderNowButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const serviceName = button.dataset.service;
            if (serviceName) {
                openOrderForm(serviceName);
            }
        });
    });
});

