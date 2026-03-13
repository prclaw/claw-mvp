// ResumeCraft AI - Modern JavaScript
// This file contains all JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'white';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                navLinks.style.gap = '20px';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navLinks.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    }
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active', !isActive);
        });
    });
    
    // Scroll Animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                }
            }
        });
    });
    
    // Form submission handling
    const ctaButtons = document.querySelectorAll('.btn[href*="google.com/forms"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track conversion
            trackEvent('conversion_click', {
                plan: this.textContent.trim(),
                price: this.textContent.includes('$10') ? 10 : 
                       this.textContent.includes('$25') ? 25 : 50
            });
            
            // Open in new tab (already handled by href)
            // Additional tracking can be added here
        });
    });
    
    // Update trust counter (simulated animation)
    const trustNumber = document.querySelector('.trust-number');
    if (trustNumber) {
        let current = 500;
        const target = 527;
        const increment = () => {
            if (current < target) {
                current += Math.floor(Math.random() * 3) + 1;
                trustNumber.textContent = current + '+';
                setTimeout(increment, 50);
            }
        };
        // Start counter after page loads
        setTimeout(increment, 1000);
    }
    
    // Add loading animation to buttons on click
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            // Add loading state
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            this.disabled = true;
            
            // Reset after 2 seconds (simulated processing)
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.disabled = false;
            }, 2000);
        });
    });
    
    // Price plan hover effects
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('popular')) {
                this.style.transform = 'translateY(-8px)';
                this.style.boxShadow = 'var(--shadow-lg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('popular')) {
                this.style.transform = '';
                this.style.boxShadow = '';
            }
        });
    });
    
    // Initialize tooltips for badges
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        badge.title = badge.textContent.trim();
    });
});

// Analytics tracking function
function trackEvent(eventName, eventData = {}) {
    console.log(`Tracking: ${eventName}`, eventData);
    
    // Google Analytics integration (uncomment when GA is set up)
    /*
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    */
    
    // Facebook Pixel integration (uncomment when set up)
    /*
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
    }
    */
}

// Track page views
window.addEventListener('load', () => {
    trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
    });
    
    // Track time on page
    let timeStart = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - timeStart) / 1000);
        trackEvent('time_on_page', {
            seconds: timeSpent,
            page: document.title
        });
    });
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.getEntriesByType('navigation')[0];
            if (perfData) {
                trackEvent('performance_metrics', {
                    dns_lookup: Math.round(perfData.domainLookupEnd - perfData.domainLookupStart),
                    tcp_connect: Math.round(perfData.connectEnd - perfData.connectStart),
                    ttfb: Math.round(perfData.responseStart - perfData.requestStart),
                    dom_load: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                    page_load: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                    total_time: Math.round(perfData.loadEventEnd - perfData.startTime)
                });
            }
        }, 0);
    });
}

// Error tracking
window.addEventListener('error', function(e) {
    trackEvent('javascript_error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno
    });
});

// Form validation (for future custom forms)
function validateForm(form) {
    const email = form.querySelector('input[type="email"]');
    const file = form.querySelector('input[type="file"]');
    
    if (email && !email.value.includes('@')) {
        alert('Please enter a valid email address');
        return false;
    }
    
    if (file && !file.value) {
        alert('Please select a resume file to upload');
        return false;
    }
    
    return true;
}

// File upload preview (for future enhancements)
function setupFileUpload() {
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const fileSize = (file.size / 1024 / 1024).toFixed(2); // MB
                if (fileSize > 10) {
                    alert('File size must be less than 10MB');
                    this.value = '';
                } else {
                    trackEvent('file_uploaded', {
                        filename: file.name,
                        size: fileSize + 'MB',
                        type: file.type
                    });
                }
            }
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupFileUpload);
} else {
    setupFileUpload();
}