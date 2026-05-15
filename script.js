// Home Page Script
console.log('Script.js loaded successfully!');

// Mobile Menu Toggle - Run immediately with retry
(function() {
    console.log('Mobile menu IIFE started');
    
    function initMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navCenterLinks = document.querySelector('.nav-center-links');
        const navRightButtons = document.querySelector('.nav-right-buttons');
        
        console.log('Searching for elements...');
        console.log('Mobile Menu Button:', mobileMenuBtn);
        console.log('Nav Center Links:', navCenterLinks);
        console.log('Nav Right Buttons:', navRightButtons);
        
        if (!mobileMenuBtn) {
            console.error('❌ Mobile menu button not found!');
            return false;
        }
        
        if (!navCenterLinks) {
            console.error('❌ Nav center links not found!');
            return false;
        }
        
        if (!navRightButtons) {
            console.error('❌ Nav right buttons not found!');
            return false;
        }
        
        console.log('✅ All elements found! Adding click listener...');
        
        // Click handler with null checks
        mobileMenuBtn.addEventListener('click', function(e) {
            console.log('🔥 Mobile menu button clicked!');
            e.preventDefault();
            e.stopPropagation();
            
            // Safety check
            if (!navCenterLinks || !navRightButtons) {
                console.error('Elements became null!');
                return;
            }
            
            // Toggle active class
            const isActive = navCenterLinks.classList.contains('active');
            console.log('Current state - isActive:', isActive);
            
            if (isActive) {
                // Close menu
                navCenterLinks.classList.remove('active');
                navRightButtons.classList.remove('active');
                console.log('✅ Menu closed');
            } else {
                // Open menu
                navCenterLinks.classList.add('active');
                navRightButtons.classList.add('active');
                console.log('✅ Menu opened');
                console.log('navCenterLinks classes:', navCenterLinks.className);
                console.log('navRightButtons classes:', navRightButtons.className);
            }
            
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('.material-icons');
            if (icon) {
                icon.textContent = isActive ? 'menu' : 'close';
                console.log('Icon changed to:', icon.textContent);
            }
        });
        
        console.log('✅ Click listener added successfully!');
        
        // Close menu when clicking a link
        const navLinks = navCenterLinks.querySelectorAll('.nav-link');
        console.log('Found nav links:', navLinks.length);
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navCenterLinks && navRightButtons) {
                    navCenterLinks.classList.remove('active');
                    navRightButtons.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('.material-icons');
                    if (icon) icon.textContent = 'menu';
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navCenterLinks && navCenterLinks.classList.contains('active')) {
                if (!e.target.closest('.navbar')) {
                    navCenterLinks.classList.remove('active');
                    if (navRightButtons) {
                        navRightButtons.classList.remove('active');
                    }
                    const icon = mobileMenuBtn.querySelector('.material-icons');
                    if (icon) icon.textContent = 'menu';
                }
            }
        });
        
        return true;
    }
    
    // Try to initialize with retries
    let attempts = 0;
    const maxAttempts = 10;
    
    function tryInit() {
        attempts++;
        console.log(`Attempt ${attempts} to initialize mobile menu...`);
        
        if (initMobileMenu()) {
            console.log('✅ Mobile menu initialized successfully!');
        } else if (attempts < maxAttempts) {
            console.log('Retrying in 100ms...');
            setTimeout(tryInit, 100);
        } else {
            console.error('❌ Failed to initialize mobile menu after', maxAttempts, 'attempts');
        }
    }
    
    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryInit);
    } else {
        tryInit();
    }
})();

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Loading other features...');
    
    // Load AI Features
    try {
        loadHomeAIFeatures();
    } catch (e) {
        console.error('Error loading AI features:', e);
    }
    
    // Initialize Onboarding Slider
    try {
        initOnboardingSlider();
    } catch (e) {
        console.error('Error initializing slider:', e);
    }
    
    // Contact Form Handler
    try {
        handleContactForm();
    } catch (e) {
        console.error('Error handling contact form:', e);
    }
    
    // Smooth Scroll
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
});

function initOnboardingSlider() {
    const slides = document.querySelectorAll('.onboarding-img');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    if (slides.length === 0) return;
    
    // Auto slide every 3 seconds
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (currentSlide + 1) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }, 3000);
    
    // Dot click functionality
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            currentSlide = index;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        });
    });
}

function handleContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Show success message
        alert('Thank you for contacting us! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

function loadHomeAIFeatures() {
    const container = document.getElementById('homeAIFeatures');
    if (!container) return;
    
    container.innerHTML = AppData.homeAIFeatures.map(feature => `
        <div class="ai-feature-card">
            <span class="material-icons">${feature.icon}</span>
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
        </div>
    `).join('');
}
