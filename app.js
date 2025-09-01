// Vijay Classes Website JavaScript - Fixed Version

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality when DOM is loaded
    initializeNavigation();
    initializeForm();
    initializeScrollEffects();
    initializeHeroButtons();
});

// Navigation functionality - Fixed
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate offset for fixed navigation
                const navHeight = document.querySelector('.navigation').offsetHeight || 80;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                // Smooth scroll to target section
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
                
                // Update active state immediately
                updateActiveNavLink(targetId);
            }
        });
    });
    
    // Highlight active navigation item based on scroll position
    window.addEventListener('scroll', debounce(highlightActiveNavItem, 100));
}

// Update active navigation link
function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// Highlight active navigation item - Fixed
function highlightActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navHeight = document.querySelector('.navigation').offsetHeight || 80;
    
    let currentSection = '';
    const scrollPosition = window.scrollY + navHeight + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // If no section is active, default to the first visible section
    if (!currentSection && sections.length > 0) {
        const firstSection = sections[0];
        if (window.scrollY < firstSection.offsetTop + firstSection.offsetHeight) {
            currentSection = firstSection.getAttribute('id');
        }
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Initialize hero buttons - Fixed
function initializeHeroButtons() {
    const enrollButton = document.querySelector('.hero-buttons .btn--primary');
    const contactButton = document.querySelector('.hero-buttons .btn--outline');
    
    if (enrollButton) {
        enrollButton.addEventListener('click', function(e) {
            e.preventDefault();
            const enquirySection = document.querySelector('#enquiry');
            if (enquirySection) {
                const navHeight = document.querySelector('.navigation').offsetHeight || 80;
                const targetPosition = enquirySection.offsetTop - navHeight - 20;
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    }
    
    if (contactButton) {
        contactButton.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const navHeight = document.querySelector('.navigation').offsetHeight || 80;
                const targetPosition = contactSection.offsetTop - navHeight - 20;
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Form functionality - Fixed
function initializeForm() {
    const form = document.getElementById('enquiryForm');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmission);
        
        // Add real-time validation
        const requiredFields = form.querySelectorAll('input[required], select[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            field.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
        
        // Phone number validation
        const phoneField = document.getElementById('phone');
        if (phoneField) {
            phoneField.addEventListener('input', function(e) {
                validatePhoneNumber(e);
            });
        }
        
        // Email validation
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.addEventListener('blur', function(e) {
                validateEmail(e);
            });
        }
    }
}

// Handle form submission - Fixed
function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    
    // Clear any existing errors
    clearAllErrors(form);
    
    // Validate all fields
    if (!validateAllFields(form)) {
        showNotification('Please fill in all required fields correctly.', 'error');
        
        // Focus on first error field
        const firstErrorField = form.querySelector('.form-control.error');
        if (firstErrorField) {
            firstErrorField.focus();
        }
        return;
    }
    
    // Collect form data
    const enquiryData = {
        studentName: document.getElementById('studentName').value.trim(),
        studentClass: document.getElementById('studentClass').value,
        board: document.getElementById('board').value,
        subjects: document.getElementById('subjects').value.trim() || 'Not specified',
        mode: document.getElementById('mode').value,
        parentName: document.getElementById('parentName').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        email: document.getElementById('email').value.trim() || 'Not provided',
        address: document.getElementById('address').value.trim() || 'Not provided',
        message: document.getElementById('message').value.trim() || 'No additional message'
    };
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.innerHTML = '<span>Submitting...</span>';
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';
    
    // Simulate form submission
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
        
        // Show success message
        showNotification('Thank you for your enquiry! Dr. Vijay Jawale will contact you soon.', 'success');
        
        // Log enquiry data
        console.log('Enquiry Submitted Successfully:', enquiryData);
        
        // Scroll to top of form
        const enquirySection = document.getElementById('enquiry');
        if (enquirySection) {
            const navHeight = document.querySelector('.navigation').offsetHeight || 80;
            const targetPosition = enquirySection.offsetTop - navHeight - 20;
            window.scrollTo({
                top: Math.max(0, targetPosition),
                behavior: 'smooth'
            });
        }
        
    }, 1000);
}

// Validate individual field - Fixed
function validateField(field) {
    const value = field.value.trim();
    
    clearFieldError(field);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required.');
        return false;
    }
    
    // Additional validation based on field type
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address.');
        return false;
    }
    
    if (field.type === 'tel' && value && !isValidPhoneNumber(value)) {
        showFieldError(field, 'Please enter a valid 10-digit phone number.');
        return false;
    }
    
    return true;
}

// Validate all fields - Fixed
function validateAllFields(form) {
    const requiredFields = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Validate optional email if provided
    const emailField = document.getElementById('email');
    if (emailField && emailField.value.trim() && !isValidEmail(emailField.value.trim())) {
        showFieldError(emailField, 'Please enter a valid email address.');
        isValid = false;
    }
    
    // Validate phone number format
    const phoneField = document.getElementById('phone');
    if (phoneField && phoneField.value.trim() && !isValidPhoneNumber(phoneField.value.trim())) {
        showFieldError(phoneField, 'Please enter a valid 10-digit phone number.');
        isValid = false;
    }
    
    return isValid;
}

// Clear all errors
function clearAllErrors(form) {
    const errorFields = form.querySelectorAll('.form-control.error');
    errorFields.forEach(field => {
        clearFieldError(field);
    });
}

// Clear field error - Fixed
function clearFieldError(field) {
    field.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Show field error - Fixed
function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    clearFieldError(field);
    
    // Add new error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: var(--color-error);
        font-size: var(--font-size-sm);
        margin-top: var(--space-4);
        animation: fadeInError 0.3s ease-in-out;
    `;
    
    field.parentNode.appendChild(errorElement);
}

// Phone number validation - Fixed
function validatePhoneNumber(e) {
    const field = e.target;
    let value = field.value.replace(/\D/g, ''); // Remove non-digits
    
    // Limit to 10 digits
    if (value.length > 10) {
        value = value.substring(0, 10);
    }
    
    field.value = value;
    
    // Clear error if field becomes valid
    if (value.length === 10) {
        clearFieldError(field);
    }
}

// Email validation - Fixed
function validateEmail(e) {
    const field = e.target;
    const value = field.value.trim();
    
    if (value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address.');
    } else {
        clearFieldError(field);
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Phone validation helper
function isValidPhoneNumber(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
}

// Show notification - Fixed
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Style notification
    const bgColor = type === 'success' ? 'var(--color-success)' : 
                   type === 'error' ? 'var(--color-error)' : 'var(--color-info)';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        left: 20px;
        max-width: 400px;
        margin: 0 auto;
        background-color: ${bgColor};
        color: white;
        padding: var(--space-16) var(--space-20);
        border-radius: var(--radius-base);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        font-size: var(--font-size-md);
        font-weight: var(--font-weight-medium);
        transform: translateY(-100px);
        transition: transform var(--duration-normal) var(--ease-standard);
        opacity: 0.95;
        text-align: center;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateY(-100px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Initialize scroll effects
function initializeScrollEffects() {
    // Add scroll event listener
    window.addEventListener('scroll', debounce(handleScrollEffects, 50));
    
    // Initialize intersection observer for animations
    initializeIntersectionObserver();
}

// Handle scroll effects
function handleScrollEffects() {
    const scrolled = window.pageYOffset;
    
    // Add scroll class to navigation for styling
    const navigation = document.querySelector('.navigation');
    if (navigation) {
        if (scrolled > 50) {
            navigation.classList.add('scrolled');
        } else {
            navigation.classList.remove('scrolled');
        }
    }
}

// Initialize intersection observer for animations
function initializeIntersectionObserver() {
    // Check if IntersectionObserver is supported
    if (!window.IntersectionObserver) {
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .benefit-item, .contact-item, .area-item');
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Handle intersection for animations
function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}

// Utility function - Debounce
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

// Add dynamic styles for animations and states
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .form-control.error {
            border-color: var(--color-error) !important;
            box-shadow: 0 0 0 3px rgba(var(--color-error-rgb), 0.1) !important;
        }
        
        @keyframes fadeInError {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .navigation.scrolled {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            box-shadow: var(--shadow-md);
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .nav-link.active {
            color: var(--color-primary) !important;
            background: var(--color-secondary);
        }
        
        .nav-link:hover {
            color: var(--color-primary) !important;
            background: var(--color-secondary);
        }
        
        /* Mobile responsive notification */
        @media (max-width: 768px) {
            .notification {
                left: 10px !important;
                right: 10px !important;
                max-width: none !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize dynamic styles
addDynamicStyles();

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        if (e.target.classList.contains('nav-link')) {
            e.preventDefault();
            e.target.click();
        }
    }
});

// Prevent form submission on Enter in input fields (except textarea)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT' && e.target.type !== 'submit') {
        e.preventDefault();
        // Move to next form field
        const formElements = Array.from(document.querySelectorAll('input, select, textarea, button'));
        const currentIndex = formElements.indexOf(e.target);
        const nextElement = formElements[currentIndex + 1];
        if (nextElement) {
            nextElement.focus();
        }
    }
});

// Export functions for potential external use
window.VijayClasses = {
    showNotification,
    validateEmail: isValidEmail,
    validatePhone: isValidPhoneNumber,
    initializeNavigation,
    initializeForm
};

console.log('Vijay Classes website JavaScript loaded successfully!');