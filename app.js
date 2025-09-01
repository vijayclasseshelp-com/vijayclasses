// Fixed Vijay Classes Website JavaScript - Resolved Form Input Issues
// Fully functional contact form with FormSubmit integration

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Vijay Classes Website Loaded Successfully!');
    console.log('📧 Form configured to send to: vijayclasseshelp@gmail.com');
    
    // Initialize all functionality in correct order
    initializeBasicFunctionality();
    initializeNavigation();
    initializeFormFunctionality();
    initializeAnimations();
    initializeScrollEffects();
    initializeCounterAnimations();
    initializeMobileMenu();
    initializeFloatingButtons();
    
    // Start performance monitoring
    monitorPerformance();
});

// Initialize basic functionality first
function initializeBasicFunctionality() {
    // Ensure all form elements are properly initialized
    const formElements = document.querySelectorAll('input, select, textarea');
    formElements.forEach(element => {
        // Remove any interfering styles or attributes
        element.style.pointerEvents = 'auto';
        element.style.userSelect = 'text';
        element.disabled = false;
        element.readOnly = false;
        
        // Ensure proper tabindex
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
    });
}

// Enhanced Navigation with smooth scrolling and active states
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navigation = document.querySelector('.navigation');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = navigation.offsetHeight || 80;
                const targetPosition = targetSection.offsetTop - navHeight - 10;
                
                smoothScrollTo(Math.max(0, targetPosition), 800);
                updateActiveNavLink(targetId);
                closeMobileMenu();
            }
        });
    });
    
    // Highlight active navigation on scroll
    window.addEventListener('scroll', debounce(highlightActiveNavItem, 50));
    
    // Add scrolled class to navigation
    window.addEventListener('scroll', debounce(() => {
        const scrolled = window.pageYOffset;
        if (scrolled > 50) {
            navigation.classList.add('scrolled');
        } else {
            navigation.classList.remove('scrolled');
        }
    }, 10));
}

// Fixed Form Functionality - Removed interfering code
function initializeFormFunctionality() {
    const form = document.getElementById('enquiryForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if (!form || !submitBtn) {
        console.error('Form elements not found');
        return;
    }
    
    console.log('✅ Form elements found and initializing...');
    
    // Simple, non-interfering form field handling
    const formFields = form.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        // Only add blur validation, don't interfere with input
        field.addEventListener('blur', function() {
            validateFieldOnBlur(this);
        });
        
        // Simple phone formatting without interference
        if (field.type === 'tel') {
            field.addEventListener('input', function() {
                formatPhoneNumberSimple(this);
            });
        }
        
        // Clear errors on input without blocking input
        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                clearFieldError(this);
            }
        });
    });
    
    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('📝 Form submission initiated');
        
        // Validate form
        if (!validateFormSimple(form)) {
            showNotification('❌ Please fill all required fields correctly', 'error');
            return;
        }
        
        // Set loading state
        setSubmitButtonLoading(true);
        
        try {
            // Prepare form data
            const formData = new FormData(form);
            
            // Add metadata
            formData.append('Submitted_On', new Date().toLocaleString('en-IN', { 
                timeZone: 'Asia/Kolkata',
                dateStyle: 'full',
                timeStyle: 'long'
            }));
            formData.append('Form_Source', 'Vijay Classes Website');
            
            console.log('📤 Sending form data...');
            
            // Submit to FormSubmit
            const response = await fetch('https://formsubmit.co/vijayclasseshelp@gmail.com', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                console.log('✅ Form submitted successfully!');
                handleFormSuccess();
            } else {
                throw new Error(`HTTP ${response.status}`);
            }
            
        } catch (error) {
            console.error('❌ Form submission error:', error);
            handleFormError();
        } finally {
            setSubmitButtonLoading(false);
        }
    });
    
    console.log('✅ Form functionality initialized successfully');
}

// Simplified validation that doesn't interfere with input
function validateFieldOnBlur(field) {
    const value = field.value.trim();
    
    // Clear previous errors
    clearFieldError(field);
    
    // Check required fields
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Check email format
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    // Check phone format
    if (field.type === 'tel' && value && !isValidPhone(value)) {
        showFieldError(field, 'Please enter a valid 10-digit phone number');
        return false;
    }
    
    return true;
}

// Simple form validation
function validateFormSimple(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        const value = field.value.trim();
        if (!value) {
            showFieldError(field, 'This field is required');
            isValid = false;
        }
    });
    
    // Check email format if provided
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value.trim() && !isValidEmail(emailField.value.trim())) {
        showFieldError(emailField, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Check phone format
    const phoneField = form.querySelector('input[type="tel"]');
    if (phoneField && phoneField.value.trim() && !isValidPhone(phoneField.value.trim())) {
        showFieldError(phoneField, 'Please enter a valid 10-digit phone number');
        isValid = false;
    }
    
    return isValid;
}

// Simple phone formatting without blocking input
function formatPhoneNumberSimple(field) {
    setTimeout(() => {
        let value = field.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.substring(0, 10);
        }
        if (field.value !== value) {
            field.value = value;
        }
    }, 0);
}

// Handle successful form submission
function handleFormSuccess() {
    document.getElementById('enquiryForm').reset();
    showNotification('🎉 Enquiry Submitted Successfully! Dr. Vijay Jawale will contact you within 2 hours.', 'success', 8000);
    
    const enquirySection = document.getElementById('enquiry');
    if (enquirySection) {
        smoothScrollTo(enquirySection.offsetTop - 100, 600);
    }
    
    console.log('🎯 Form submitted successfully');
    
    setTimeout(showFollowUpOptions, 3000);
}

// Handle form submission error
function handleFormError() {
    const formData = new FormData(document.getElementById('enquiryForm'));
    const emailSubject = encodeURIComponent('🎓 Student Enquiry - Vijay Classes');
    const emailBody = encodeURIComponent(createEmailBody(formData));
    const mailtoLink = `mailto:vijayclasseshelp@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    
    const errorMessage = `
        <div style="text-align: center;">
            <h4>⚠️ Submission Error</h4>
            <p>Please use one of these alternatives:</p>
            <div style="margin: 15px 0;">
                <a href="${mailtoLink}" style="display: inline-block; margin: 5px; padding: 10px 15px; background: #3b82f6; color: white; text-decoration: none; border-radius: 5px;">📧 Send Email</a>
                <a href="tel:8275706318" style="display: inline-block; margin: 5px; padding: 10px 15px; background: #10b981; color: white; text-decoration: none; border-radius: 5px;">📞 Call Now</a>
                <a href="https://wa.me/918275706318" style="display: inline-block; margin: 5px; padding: 10px 15px; background: #25d366; color: white; text-decoration: none; border-radius: 5px;" target="_blank">💬 WhatsApp</a>
            </div>
        </div>
    `;
    
    showNotification(errorMessage, 'error', 12000);
}

// Create email body for fallback
function createEmailBody(formData) {
    return `
🎓 NEW STUDENT ENQUIRY - VIJAY CLASSES

Student Information:
Name: ${formData.get('Student_Name') || 'Not provided'}
Class: ${formData.get('Student_Class') || 'Not selected'}
Board: ${formData.get('Education_Board') || 'Not selected'}
Subjects: ${formData.get('Subjects_Required') || 'Not specified'}
Learning Mode: ${formData.get('Learning_Mode') || 'Not selected'}

Contact Information:
Parent Name: ${formData.get('Parent_Name') || 'Not provided'}
Phone: ${formData.get('Phone_Number') || 'Not provided'}
Email: ${formData.get('Email_Address') || 'Not provided'}
Address: ${formData.get('Student_Address') || 'Not provided'}

Message: ${formData.get('Additional_Message') || 'No additional message'}

Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
    `;
}

// Show follow-up options
function showFollowUpOptions() {
    const followUpHtml = `
        <div style="text-align: center;">
            <h4>🚀 What's Next?</h4>
            <p>While you wait for our call:</p>
            <div style="margin: 15px 0;">
                <a href="tel:8275706318" style="display: inline-block; margin: 5px; padding: 10px 15px; background: #10b981; color: white; text-decoration: none; border-radius: 5px;">📞 Call Now</a>
                <a href="https://wa.me/918275706318" style="display: inline-block; margin: 5px; padding: 10px 15px; background: #25d366; color: white; text-decoration: none; border-radius: 5px;" target="_blank">💬 WhatsApp</a>
            </div>
            <p style="font-size: 14px; color: #666;">⏱️ Response time: Under 2 hours</p>
        </div>
    `;
    
    showNotification(followUpHtml, 'info', 10000);
}

// Error handling functions
function clearFieldError(field) {
    field.classList.remove('error');
    const errorMsg = field.parentElement.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}

function showFieldError(field, message) {
    field.classList.add('error');
    clearFieldError(field);
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: var(--color-error);
        font-size: var(--font-size-sm);
        margin-top: var(--space-4);
    `;
    
    field.parentElement.appendChild(errorElement);
}

// Utility functions
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^[6-9]\d{9}$/.test(phone);
}

// Button state management
function setSubmitButtonLoading(isLoading) {
    const submitBtn = document.getElementById('submitBtn');
    if (isLoading) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="btn-loading">📤 Sending...</span>';
    } else {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="btn-text">🚀 Submit Enquiry - Get Free Demo Class</span>';
    }
}

// Counter animations
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const start = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * easeOut);
        
        element.textContent = current + (target === 95 ? '%' : target === 15 ? '+' : target === 500 ? '+' : '');
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Scroll effects
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(handleScrollAnimation, observerOptions);
    
    const animateElements = document.querySelectorAll('.feature-card, .benefit-item, .contact-item, .coverage-card');
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

function handleScrollAnimation(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}

// Animations
function initializeAnimations() {
    // Add scroll-triggered animations CSS
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .benefit-item, .contact-item, .coverage-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease-out;
        }
        .feature-card.in-view, .benefit-item.in-view, .contact-item.in-view, .coverage-card.in-view {
            opacity: 1;
            transform: translateY(0);
        }
        .error-message {
            animation: slideInUp 0.3s ease;
        }
        @keyframes slideInUp {
            from { transform: translateY(10px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Mobile menu
function initializeMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const menu = document.querySelector('.nav-menu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', function() {
            menu.classList.toggle('mobile-active');
            this.classList.toggle('active');
        });
    }
}

function closeMobileMenu() {
    const menu = document.querySelector('.nav-menu');
    const toggle = document.getElementById('mobileMenuToggle');
    
    if (menu && toggle) {
        menu.classList.remove('mobile-active');
        toggle.classList.remove('active');
    }
}

// Floating buttons
function initializeFloatingButtons() {
    const floatingBtns = document.querySelectorAll('.floating-btn');
    floatingBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log(`Floating button clicked: ${this.title || this.textContent}`);
        });
    });
}

// Enhanced notification system
function showNotification(message, type = 'info', duration = 6000) {
    // Remove existing notifications
    const existing = document.querySelectorAll('.notification');
    existing.forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    const bgColors = {
        success: 'linear-gradient(135deg, #10b981, #065f46)',
        error: 'linear-gradient(135deg, #ef4444, #991b1b)',
        info: 'linear-gradient(135deg, #3b82f6, #1e40af)'
    };
    
    notification.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 15px;">
            <div style="flex: 1;">${message}</div>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">&times;</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        left: 20px;
        max-width: 600px;
        margin: 0 auto;
        background: ${bgColors[type] || bgColors.info};
        color: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10001;
        transform: translateY(-100px);
        transition: all 0.4s ease;
        font-weight: 500;
        line-height: 1.5;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    if (duration > 0) {
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.transform = 'translateY(-100px)';
                setTimeout(() => notification.remove(), 300);
            }
        }, duration);
    }
    
    return notification;
}

// Performance monitoring
function monitorPerformance() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`📊 Page load time: ${loadTime}ms`);
        }, 0);
    });
}

// Utility functions
function smoothScrollTo(targetY, duration = 800) {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    const startTime = performance.now();
    
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
    
    function animateScroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, startY + distance * ease);
        
        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        }
    }
    
    requestAnimationFrame(animateScroll);
}

function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

function highlightActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

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

// Export for external use
window.VijayClasses = {
    showNotification,
    smoothScrollTo
};

console.log('✅ Vijay Classes Fixed JavaScript Loaded Successfully!');
console.log('📧 Form ready to send enquiries to: vijayclasseshelp@gmail.com');
console.log('🔧 Form input issues have been resolved!');