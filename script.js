// Home Page Script
document.addEventListener('DOMContentLoaded', function() {
    // Load AI Features
    loadHomeAIFeatures();
    
    // Initialize Onboarding Slider
    initOnboardingSlider();
    
    // Contact Form Handler
    handleContactForm();
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
        });
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
