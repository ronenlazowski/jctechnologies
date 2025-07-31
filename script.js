// JC Technologies - Main JavaScript File

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all animations and interactions
    initScrollAnimations();
    initFormAnimations();
    initSmoothScrolling();
    initParticleEffects();
    initCustomSelects();
    
});

// Smooth scrolling for anchor links
function initSmoothScrolling() {
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
}

// Scroll-triggered animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start paused animations
                entry.target.style.animationPlayState = 'running';
                
                // Add visible class for additional effects
                entry.target.classList.add('animate-in');
                
                // Special handling for different element types
                if (entry.target.classList.contains('feature-card')) {
                    animateFeatureCard(entry.target);
                }
                
                if (entry.target.classList.contains('service-card')) {
                    animateServiceCard(entry.target);
                }
                
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const elementsToObserve = [
        '.feature-card',
        '.service-card', 
        '.contact-method',
        '.form-group',
        '.profile-card',
        '.skills-list li',
        '.stat-number'
    ];
    
    elementsToObserve.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            observer.observe(el);
        });
    });
}

// Animate feature cards with stagger effect
function animateFeatureCard(card) {
    const icon = card.querySelector('.feature-icon');
    if (icon) {
        setTimeout(() => {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        }, 200);
    }
}

// Animate service cards
function animateServiceCard(card) {
    const features = card.querySelectorAll('.service-features li');
    features.forEach((feature, index) => {
        setTimeout(() => {
            feature.style.transform = 'translateX(5px)';
            feature.style.color = '#32CD32';
            setTimeout(() => {
                feature.style.transform = 'translateX(0)';
                feature.style.color = '';
            }, 200);
        }, index * 100);
    });
}

// Animate counter numbers
function animateCounter(element) {
    const originalText = element.textContent;
    const numbers = originalText.match(/\d+/g);
    
    if (!numbers) return; // No numbers found, don't animate
    
    const targetNumber = parseInt(numbers[0]);
    const prefix = originalText.split(numbers[0])[0];
    const suffix = originalText.split(numbers[0])[1];
    
    let current = 0;
    const increment = targetNumber / 30;
    const timer = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
            current = targetNumber;
            clearInterval(timer);
        }
        element.textContent = prefix + Math.floor(current) + suffix;
    }, 50);
}

// Form animations and interactions
function initFormAnimations() {
    // Only run if contact form exists
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    // Form submission animation
    contactForm.addEventListener('submit', function(e) {
        const submitBtn = document.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.style.transform = 'scale(0.98)';
            const span = submitBtn.querySelector('span');
            if (span) {
                span.textContent = 'Sending...';
            }
            
            setTimeout(() => {
                submitBtn.style.transform = 'scale(1)';
            }, 200);
        }
    });
    
    // Enhanced form field interactions
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value) {
                this.parentElement.classList.add('has-value');
            } else {
                this.parentElement.classList.remove('has-value');
            }
        });
    });
}

// Enhanced particle effects
function initParticleEffects() {
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach((particle, index) => {
        // Randomize particle properties
        const size = Math.random() * 4 + 2;
        const delay = Math.random() * 6;
        const duration = Math.random() * 4 + 4;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animationDelay = delay + 's';
        particle.style.animationDuration = duration + 's';
        
        // Random horizontal movement
        const randomX = Math.random() * 100;
        particle.style.left = randomX + '%';
    });
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Add some interactive hover effects
document.addEventListener('mouseover', function(e) {
    // Enhanced button hover effects
    if (e.target.classList.contains('cta-button')) {
        e.target.style.transform = 'translateY(-3px) scale(1.05)';
    }
    
    // Logo pulse effect
    if (e.target.classList.contains('logo')) {
        e.target.style.transform = 'scale(1.05)';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.classList.contains('cta-button')) {
        e.target.style.transform = '';
    }
    
    if (e.target.classList.contains('logo')) {
        e.target.style.transform = '';
    }
});

// Add typing effect for taglines (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect for hero tagline if desired
function initTypingEffect() {
    const tagline = document.querySelector('.hero .tagline');
    if (tagline) {
        const originalText = tagline.textContent;
        // Uncomment below to enable typing effect
        // typeWriter(tagline, originalText, 50);
    }
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Error handling for animations
window.addEventListener('error', function(e) {
    console.log('Animation error caught:', e.error);
    // Gracefully degrade animations if there are errors
});

// Export functions for potential future use
window.JCTech = {
    initScrollAnimations,
    initFormAnimations,
    animateCounter,
    typeWriter
};

// Custom Select Dropdown Functionality
function initCustomSelects() {
    const customSelects = document.querySelectorAll('.custom-select');
    
    customSelects.forEach(selectWrapper => {
        const select = selectWrapper.querySelector('select');
        
        if (!select) return;
        
        // Set initial placeholder
        const firstOption = select.querySelector('option[value=""]');
        if (firstOption) {
            selectWrapper.setAttribute('data-placeholder', firstOption.textContent);
        }
        
        // Update display when selection changes
        select.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            
            if (selectedOption.value === '') {
                // Show placeholder
                selectWrapper.setAttribute('data-placeholder', selectedOption.textContent);
                selectWrapper.classList.remove('has-value');
            } else {
                // Show selected value
                selectWrapper.setAttribute('data-placeholder', selectedOption.textContent);
                selectWrapper.classList.add('has-value');
            }
        });
        
        // Initialize display
        if (select.value !== '') {
            const selectedOption = select.options[select.selectedIndex];
            selectWrapper.setAttribute('data-placeholder', selectedOption.textContent);
            selectWrapper.classList.add('has-value');
        }
    });
}
