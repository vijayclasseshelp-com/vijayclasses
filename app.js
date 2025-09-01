// Enhanced Vijay Classes Website JavaScript - Updated for Google Form Integration
// Comprehensive functionality with animations, navigation, and interactive features

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Vijay Classes Website Loaded Successfully!');
    console.log('📋 Google Form integration active');
    
    // Initialize all functionality in correct order
    initializeBasicFunctionality();
    initializeNavigation();
    initializeGoogleFormEnhancements();
    initializeAnimations();
    initializeScrollEffects();
    initializeCounterAnimations();
    initializeMobileMenu();
    initializeFloatingButtons();
    
    // Start performance monitoring
    monitorPerformance();
});

// Initialize basic functionality
function initializeBasicFunctionality() {
    // Ensure smooth page interactions
    const interactiveElements = document.querySelectorAll('a, button, .btn');
    interactiveElements.forEach(element => {
        element.style.pointerEvents = 'auto';
        element.style.userSelect = 'text';
        
        // Ensure proper tabindex for accessibility
        if (!element.hasAttribute('tabindex') && !element.href) {
            element.setAttribute('tabindex', '0');
        }
    });
    
    console.log('✅ Basic functionality initialized');
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
                
                console.log(`📍 Navigated to: ${targetId}`);
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
    
    console.log('✅ Navigation system initialized');
}

// Google Form enhancements
function initializeGoogleFormEnhancements() {
    const googleFormIframe = document.querySelector('.google-form-iframe');
    const formContainer = document.querySelector('.google-form-container');
    
    if (googleFormIframe && formContainer) {
        // Add loading state
        const loadingIndicator = createLoadingIndicator();
        formContainer.appendChild(loadingIndicator);
        
        // Handle iframe load
        googleFormIframe.addEventListener('load', function() {
            console.log('📋 Google Form loaded successfully');
            
            // Remove loading indicator
            setTimeout(() => {
                if (loadingIndicator.parentElement) {
                    loadingIndicator.remove();
                }
            }, 500);
            
            // Add form interaction tracking
            trackFormInteraction();
        });
        
        // Handle iframe errors
        googleFormIframe.addEventListener('error', function() {
            console.error('❌ Google Form failed to load');
            handleGoogleFormError();
        });
        
        // Add form visibility optimization
        optimizeFormVisibility();
        
        console.log('✅ Google Form enhancements initialized');
    }
}

// Create loading indicator for Google Form
function createLoadingIndicator() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'google-form-loading';
    loadingDiv.innerHTML = `
        <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            z-index: 10;
            background: var(--color-background);
            padding: var(--space-32);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-md);
        ">
            <div style="
                width: 40px;
                height: 40px;
                border: 4px solid var(--color-border);
                border-top: 4px solid var(--color-primary);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto var(--space-16);
            "></div>
            <h3 style="color: var(--color-text); margin-bottom: var(--space-8);">📋 Loading Registration Form</h3>
            <p style="color: var(--color-text-secondary); margin: 0;">Please wait while we prepare your form...</p>
        </div>
    `;
    
    loadingDiv.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(var(--color-background-rgb, 252, 252, 249), 0.9);
        z-index: 5;
    `;
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    return loadingDiv;
}

// Track Google Form interaction
function trackFormInteraction() {
    const googleFormWrapper = document.querySelector('.google-form-wrapper');
    
    if (googleFormWrapper) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('👀 User viewed the registration form');
                    
                    // Show helpful notification after viewing form
                    setTimeout(() => {
                        showNotification(
                            '📋 <strong>Registration Form Tips:</strong><br>• Fill all required fields<br>• Double-check your contact details<br>• Dr. Vijay Jawale will call you within 2 hours', 
                            'info', 
                            8000
                        );
                    }, 3000);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(googleFormWrapper);
    }
}

// Handle Google Form loading errors
function handleGoogleFormError() {
    const formWrapper = document.querySelector('.google-form-wrapper');
    
    if (formWrapper) {
        formWrapper.innerHTML = `
            <div style="
                padding: var(--space-32);
                text-align: center;
                background: var(--color-bg-4);
                border-radius: var(--radius-lg);
                border: 2px solid var(--color-error);
            ">
                <h3 style="color: var(--color-error); margin-bottom: var(--space-16);">⚠️ Form Loading Issue</h3>
                <p style="margin-bottom: var(--space-20); color: var(--color-text);">
                    The registration form is temporarily unavailable. Please use one of these alternatives:
                </p>
                <div style="display: flex; justify-content: center; gap: var(--space-16); flex-wrap: wrap;">
                    <a href="tel:8275706318" class="btn btn--primary" style="text-decoration: none;">
                        📞 Call Now: 8275706318
                    </a>
                    <a href="https://wa.me/918275706318" class="btn btn--secondary" style="text-decoration: none;" target="_blank">
                        💬 WhatsApp
                    </a>
                    <a href="mailto:vijayclasseshelp@gmail.com" class="btn btn--outline" style="text-decoration: none;">
                        📧 Email Us
                    </a>
                </div>
                <p style="margin-top: var(--space-20); font-size: var(--font-size-sm); color: var(--color-text-secondary);">
                    Or visit us at: Ganpati Chowk, Opp. Ramdev Dining Hall, Old Sanghvi, Pune
                </p>
            </div>
        `;
    }
}

// Optimize form visibility for better performance
function optimizeFormVisibility() {
    const formWrapper = document.querySelector('.google-form-wrapper');
    const enquirySection = document.querySelector('#enquiry');
    
    if (formWrapper && enquirySection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const iframe = entry.target.querySelector('.google-form-iframe');
                if (iframe) {
                    if (entry.isIntersecting) {
                        // Form is visible - ensure it's active
                        iframe.style.visibility = 'visible';
                        iframe.style.opacity = '1';
                    } else {
                        // Form is not visible - optimize performance
                        iframe.style.visibility = 'visible'; // Keep visible for better UX
                        iframe.style.opacity = '1';
                    }
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(enquirySection);
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
    console.log('✅ Counter animations initialized');
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
    
    console.log('✅ Scroll effects initialized');
}

function handleScrollAnimation(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}

// Initialize animations
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
        .google-form-container {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease-out;
        }
        .google-form-container.in-view {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Animate Google Form container when in view
    const formContainer = document.querySelector('.google-form-container');
    if (formContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(formContainer);
    }
    
    console.log('✅ Animations initialized');
}

// Mobile menu
function initializeMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const menu = document.querySelector('.nav-menu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', function() {
            menu.classList.toggle('mobile-active');
            this.classList.toggle('active');
            console.log('📱 Mobile menu toggled');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!toggle.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.remove('mobile-active');
                toggle.classList.remove('active');
            }
        });
    }
    
    console.log('✅ Mobile menu initialized');
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
        btn.addEventListener('click', function(e) {
            console.log(`🎯 Floating button clicked: ${this.title || this.textContent}`);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Track specific actions
            if (this.href && this.href.includes('tel:')) {
                console.log('📞 Call button clicked');
                showNotification('📞 Calling Dr. Vijay Jawale...', 'info', 3000);
            } else if (this.href && this.href.includes('wa.me')) {
                console.log('💬 WhatsApp button clicked');
                showNotification('💬 Opening WhatsApp...', 'info', 3000);
            } else if (this.href && this.href.includes('#enquiry')) {
                console.log('📝 Enquiry button clicked');
                showNotification('📝 Scrolling to registration form...', 'info', 3000);
            }
        });
    });
    
    console.log('✅ Floating buttons initialized');
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
        info: 'linear-gradient(135deg, #3b82f6, #1e40af)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)'
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
            
            if (loadTime > 3000) {
                console.warn('⚠️ Page load time is slower than expected');
            } else {
                console.log('✅ Page load time is optimal');
            }
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

// Quick contact helpers
function initializeQuickContactActions() {
    // Phone click tracking
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            console.log('📞 Phone link clicked:', this.href);
            showNotification('📞 Initiating call to Dr. Vijay Jawale...', 'info', 3000);
        });
    });
    
    // WhatsApp click tracking
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            console.log('💬 WhatsApp link clicked:', this.href);
            showNotification('💬 Opening WhatsApp chat...', 'info', 3000);
        });
    });
    
    // Email click tracking
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function() {
            console.log('📧 Email link clicked:', this.href);
            showNotification('📧 Opening email client...', 'info', 3000);
        });
    });
    
    // Maps click tracking
    document.querySelectorAll('a[href*="maps"]').forEach(link => {
        link.addEventListener('click', function() {
            console.log('📍 Maps link clicked:', this.href);
            showNotification('📍 Opening location in maps...', 'info', 3000);
        });
    });
}

// Initialize quick contact actions when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeQuickContactActions, 1000);
});

// Show welcome message after page loads
window.addEventListener('load', function() {
    setTimeout(() => {
        showNotification(
            '🎓 <strong>Welcome to Vijay Classes!</strong><br>Fill our registration form below for immediate response from Dr. Vijay Jawale.', 
            'info', 
            6000
        );
    }, 2000);
});

// Export for external use
window.VijayClasses = {
    showNotification,
    smoothScrollTo,
    version: '2.0.0',
    features: {
        googleForm: true,
        animations: true,
        mobileOptimized: true,
        contactTracking: true
    }
};

console.log('✅ Vijay Classes Enhanced JavaScript Loaded Successfully!');
console.log('📋 Google Form integration ready');
console.log('🎯 All interactive features initialized');
console.log('📱 Mobile optimization active');
console.log('🚀 Website ready for students!');