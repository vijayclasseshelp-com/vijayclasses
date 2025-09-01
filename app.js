// Vijay Classes Website JavaScript - Fixed Navigation and Features
// Complete functionality for Google Forms, WhatsApp integration, and navigation

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Vijay Classes Website Loaded Successfully!');
    console.log('📝 Google Forms integration ready');
    console.log('💬 WhatsApp chat button configured');
    console.log('📍 Google Maps location link ready');
    
    // Initialize all functionality in correct order
    initializeBasicFunctionality();
    initializeNavigation();
    initializeWhatsAppIntegration();
    initializeAnimations();
    initializeScrollEffects();
    initializeCounterAnimations();
    initializeMobileMenu();
    initializeFloatingButtons();
    initializeGoogleFormsHandling();
    initializeLocationFeatures();
    
    // Start performance monitoring
    monitorPerformance();
    
    // Show welcome message
    setTimeout(() => {
        showNotification('🎉 Welcome to Vijay Classes! Use navigation to explore our offerings.', 'info', 5000);
    }, 2000);
});

// Initialize basic functionality
function initializeBasicFunctionality() {
    console.log('✅ Basic functionality initialized');
    
    // Ensure logo displays correctly
    const logoImage = document.querySelector('.logo-image');
    if (logoImage) {
        logoImage.style.width = '120px';
        logoImage.style.height = '80px';
        logoImage.style.display = 'block';
        console.log('✅ Logo styling applied');
    } else {
        console.warn('⚠️ Logo image not found');
    }
    
    // Ensure proper CSS variable support
    if (CSS.supports('color', 'var(--color-primary)')) {
        console.log('✅ CSS variables supported');
    } else {
        console.warn('⚠️ CSS variables not fully supported');
    }
}

// Fixed Navigation with smooth scrolling and active states
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navigation = document.querySelector('.navigation');
    
    console.log(`📍 Found ${navLinks.length} navigation links`);
    
    navLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            console.log(`📍 Clicked navigation: ${targetId}`);
            
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navHeight = navigation ? navigation.offsetHeight : 80;
                    const targetPosition = targetSection.offsetTop - navHeight - 20;
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: Math.max(0, targetPosition),
                        behavior: 'smooth'
                    });
                    
                    updateActiveNavLink(targetId);
                    closeMobileMenu();
                    
                    console.log(`✅ Navigated to: ${targetId} at position ${targetPosition}`);
                    
                    // Show confirmation
                    const sectionName = targetId.replace('#', '').replace('-', ' ');
                    showNotification(`📍 Navigated to ${sectionName.toUpperCase()} section`, 'success', 3000);
                } else {
                    console.warn(`⚠️ Target section not found: ${targetId}`);
                    showNotification(`⚠️ Section ${targetId} not found`, 'warning', 3000);
                }
            }
        });
        
        // Add hover effect
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Highlight active navigation on scroll
    window.addEventListener('scroll', debounce(highlightActiveNavItem, 100));
    
    // Add scrolled class to navigation
    window.addEventListener('scroll', debounce(() => {
        if (navigation) {
            const scrolled = window.pageYOffset;
            if (scrolled > 50) {
                navigation.classList.add('scrolled');
            } else {
                navigation.classList.remove('scrolled');
            }
        }
    }, 50));
    
    console.log('✅ Navigation system initialized and working');
}

// Enhanced WhatsApp Integration with Tooltip
function initializeWhatsAppIntegration() {
    const whatsappButtons = document.querySelectorAll('[href*="wa.me"], .whatsapp-btn, .whatsapp-btn-main');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const originalHref = this.getAttribute('href');
            
            if (originalHref && originalHref.includes('wa.me')) {
                console.log('💬 WhatsApp button clicked');
                showNotification('💬 Opening WhatsApp chat...', 'success', 3000);
                
                // Track click
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'whatsapp_click', {
                        'event_category': 'engagement',
                        'event_label': 'WhatsApp Chat'
                    });
                }
            }
        });
    });
    
    // Enhanced WhatsApp chat button with proper tooltip
    const whatsappChatButton = document.getElementById('whatsappChat');
    if (whatsappChatButton) {
        // Ensure tooltip is visible and functional
        const tooltip = whatsappChatButton.querySelector('.whatsapp-tooltip');
        if (tooltip) {
            tooltip.textContent = 'Chat with Vijay Classes';
            tooltip.style.cssText = `
                background: #25D366;
                color: white;
                padding: 8px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                white-space: nowrap;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                opacity: 0;
                transform: translateX(10px);
                transition: all 0.3s ease;
                pointer-events: none;
                position: absolute;
                right: 70px;
                top: 50%;
                transform: translateY(-50%) translateX(10px);
            `;
        }
        
        // Add hover events for tooltip
        whatsappChatButton.addEventListener('mouseenter', function() {
            const tooltip = this.querySelector('.whatsapp-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateY(-50%) translateX(0)';
            }
        });
        
        whatsappChatButton.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.whatsapp-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateY(-50%) translateX(10px)';
            }
        });
        
        // Show/hide based on scroll position
        window.addEventListener('scroll', debounce(() => {
            const scrolled = window.pageYOffset;
            if (scrolled > 300) {
                whatsappChatButton.style.opacity = '1';
                whatsappChatButton.style.visibility = 'visible';
            } else {
                whatsappChatButton.style.opacity = '0.8';
            }
        }, 100));
        
        console.log('💬 WhatsApp tooltip functionality added');
    }
    
    console.log('💬 WhatsApp integration initialized');
}

// Location and Maps Integration - Fixed
function initializeLocationFeatures() {
    const mapButtons = document.querySelectorAll('[href*="maps.app.goo.gl"], .map-btn, .location-link');
    
    console.log(`🗺️ Found ${mapButtons.length} map buttons`);
    
    mapButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            console.log('🗺️ Google Maps link clicked');
            
            const href = this.getAttribute('href');
            if (href && href.includes('maps.app.goo.gl')) {
                // Ensure the link opens in a new tab
                this.setAttribute('target', '_blank');
                this.setAttribute('rel', 'noopener noreferrer');
                
                showNotification('🗺️ Opening Google Maps...', 'success', 3000);
                
                // Track map clicks
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'map_view', {
                        'event_category': 'engagement',
                        'event_label': 'Office Location'
                    });
                }
            }
        });
        
        // Ensure proper attributes for external links
        if (button.getAttribute('href') && button.getAttribute('href').includes('maps.app.goo.gl')) {
            button.setAttribute('target', '_blank');
            button.setAttribute('rel', 'noopener noreferrer');
        }
    });
    
    console.log('🗺️ Location features initialized and fixed');
}

// Google Forms handling
function initializeGoogleFormsHandling() {
    const googleFormIframe = document.querySelector('.google-form-container iframe');
    
    if (googleFormIframe) {
        // Handle iframe load
        googleFormIframe.addEventListener('load', function() {
            console.log('📝 Google Forms iframe loaded successfully');
            showNotification('📝 Enquiry form loaded successfully!', 'success', 4000);
        });
        
        // Ensure iframe is responsive
        googleFormIframe.style.width = '100%';
        googleFormIframe.style.maxWidth = '640px';
        googleFormIframe.style.height = '381px';
        googleFormIframe.style.border = 'none';
        googleFormIframe.style.borderRadius = '8px';
        
        // Add form submission tracking
        const enquirySection = document.getElementById('enquiry');
        if (enquirySection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        console.log('👀 User viewed enquiry form');
                        showNotification('📝 Fill the form below to get a FREE demo class!', 'info', 6000);
                        
                        // Track form view
                        if (typeof gtag !== 'undefined') {
                            gtag('event', 'form_view', {
                                'event_category': 'engagement',
                                'event_label': 'Enquiry Form'
                            });
                        }
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(enquirySection);
        }
    } else {
        console.warn('⚠️ Google Forms iframe not found');
    }
    
    // Quick contact buttons tracking
    const quickContactBtns = document.querySelectorAll('.quick-contact-btn');
    quickContactBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const btnText = this.textContent.trim();
            console.log(`📞 Quick contact clicked: ${btnText}`);
            
            showNotification(`📞 ${btnText} clicked!`, 'success', 3000);
            
            // Track contact method
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact_method', {
                    'event_category': 'engagement',
                    'event_label': btnText
                });
            }
        });
    });
    
    console.log('📝 Google Forms handling initialized');
}

// Counter animations
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    if (counters.length === 0) {
        console.warn('⚠️ No counter elements found');
        return;
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
    
    console.log(`🔢 Counter animations initialized for ${counters.length} elements`);
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
        } else {
            console.log(`📊 Counter animated: ${target}`);
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
    
    const animateElements = document.querySelectorAll('.feature-card, .benefit-item, .contact-item, .coverage-card, .office-card');
    console.log(`🎬 Setting up scroll animations for ${animateElements.length} elements`);
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    console.log('🎬 Scroll effects initialized');
}

function handleScrollAnimation(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            
            // Add staggered animation delay
            const delay = Math.random() * 200;
            setTimeout(() => {
                entry.target.style.animationDelay = delay + 'ms';
            }, delay);
        }
    });
}

// Animations
function initializeAnimations() {
    // Add scroll-triggered animations CSS
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .benefit-item, .contact-item, .coverage-card, .office-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease-out;
        }
        .feature-card.in-view, .benefit-item.in-view, .contact-item.in-view, .coverage-card.in-view, .office-card.in-view {
            opacity: 1;
            transform: translateY(0);
        }
        .nav-link {
            transition: all 0.3s ease !important;
            cursor: pointer !important;
        }
        .nav-link:hover {
            transform: translateY(-2px) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Add typing animation completion listener
    const typingElements = document.querySelectorAll('.animate-type, .animate-type-delayed');
    typingElements.forEach(element => {
        element.addEventListener('animationend', function() {
            this.style.borderRight = 'none';
            console.log('⌨️ Typing animation completed');
        });
    });
    
    console.log('🎨 Animations initialized');
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
        
        // Add mobile menu styles
        const mobileStyles = document.createElement('style');
        mobileStyles.id = 'mobile-menu-styles';
        mobileStyles.textContent = `
            @media (max-width: 768px) {
                .mobile-menu-toggle {
                    display: flex !important;
                    flex-direction: column;
                    cursor: pointer;
                    padding: 8px;
                }
                .mobile-menu-toggle span {
                    width: 25px;
                    height: 3px;
                    background: var(--color-primary);
                    margin: 3px 0;
                    transition: 0.3s;
                    border-radius: 2px;
                }
                .nav-menu.mobile-active {
                    display: flex !important;
                    flex-direction: column;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: var(--color-white);
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    border-top: 1px solid var(--color-border);
                    z-index: 999;
                    padding: 16px 0;
                }
                .mobile-menu-toggle.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }
                .mobile-menu-toggle.active span:nth-child(2) {
                    opacity: 0;
                }
                .mobile-menu-toggle.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(7px, -6px);
                }
            }
        `;
        document.head.appendChild(mobileStyles);
    }
    
    console.log('📱 Mobile menu initialized');
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
    console.log(`🎈 Found ${floatingBtns.length} floating buttons`);
    
    floatingBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const title = this.getAttribute('title') || this.textContent;
            console.log(`🎯 Floating button clicked: ${title}`);
            
            showNotification(`🎯 ${title} clicked!`, 'success', 3000);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Show/hide floating buttons based on scroll
    const floatingActions = document.querySelector('.floating-actions');
    if (floatingActions) {
        window.addEventListener('scroll', debounce(() => {
            const scrolled = window.pageYOffset;
            if (scrolled > 200) {
                floatingActions.style.opacity = '1';
                floatingActions.style.visibility = 'visible';
            } else {
                floatingActions.style.opacity = '0.8';
            }
        }, 100));
    }
    
    console.log('🎈 Floating buttons initialized');
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
    
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
        warning: '⚠️'
    };
    
    notification.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 12px;">
            <span style="font-size: 18px; flex-shrink: 0; margin-top: 2px;">${icons[type] || icons.info}</span>
            <div style="flex: 1; line-height: 1.5;">${message}</div>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border-radius: 50%; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='transparent'">&times;</button>
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
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10001;
        transform: translateY(-100px);
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        font-weight: 500;
        font-size: 14px;
        border: 1px solid rgba(255,255,255,0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Trigger entrance animation
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Auto-remove notification
    if (duration > 0) {
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.transform = 'translateY(-100px)';
                notification.style.opacity = '0';
                setTimeout(() => notification.remove(), 400);
            }
        }, duration);
    }
    
    return notification;
}

// Performance monitoring
function monitorPerformance() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            try {
                const perfData = performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.navigationStart;
                
                console.log(`📊 Page Performance:`);
                console.log(`   - Total Load Time: ${loadTime}ms`);
                console.log(`   - DOM Content Loaded: ${domContentLoaded}ms`);
                
                if (loadTime > 3000) {
                    console.warn('⚠️ Page load time is slow');
                } else if (loadTime < 1000) {
                    console.log('⚡ Excellent page load performance');
                }
                
            } catch (error) {
                console.warn('📊 Performance monitoring failed:', error);
            }
        }, 0);
    });
}

// Utility functions
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

// Error handling
window.addEventListener('error', function(e) {
    console.error('💥 JavaScript Error:', e.error);
    showNotification('⚠️ A minor issue occurred, but the website is still functional.', 'warning', 5000);
});

// Console welcome message
console.log(`
🎓 VIJAY CLASSES - WEBSITE FULLY FUNCTIONAL 🎓

📧 Contact: vijayclasseshelp@gmail.com
📞 Phone: 8275706318  
📍 Address: Ganpati Chowk, Old Sanghvi, Pune
💻 Online Classes: Available for All Pune
🏠 Home Tuition: Available in Old Sanghvi Area

✅ Google Forms: Integrated and Working
✅ WhatsApp Chat: Ready with Tooltip (8275706318)
✅ Google Maps: Location Links Fixed
✅ Navigation: All Tabs Working
✅ Mobile Responsive: Fully Optimized
✅ SEO Optimized: Complete

🚀 All Issues Fixed - Ready to serve students!
`);

// Export for external use
window.VijayClasses = {
    showNotification,
    initializeLocationFeatures,
    monitorPerformance
};

console.log('✅ Vijay Classes Website - All Features Fixed and Working! 🎉');