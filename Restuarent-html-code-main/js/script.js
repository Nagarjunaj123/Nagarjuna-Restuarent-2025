// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Menu Tab Functionality
const tabButtons = document.querySelectorAll('.tab-button');
const menuCategories = document.querySelectorAll('.menu-category');

if (tabButtons.length > 0) {
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all buttons and categories
            tabButtons.forEach(btn => btn.classList.remove('active'));
            menuCategories.forEach(cat => cat.classList.remove('active'));
            
            // Add active class to clicked button and corresponding category
            this.classList.add('active');
            document.getElementById(category).classList.add('active');
        });
    });
}

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            showMessage('Thank you for your message! We will get back to you soon.', 'success');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Reservation Form Handler
const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateReservationForm(this)) {
            return;
        }
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Making Reservation...';
        submitButton.disabled = true;
        
        // Simulate reservation submission (replace with actual API call)
        setTimeout(() => {
            showMessage('Your reservation has been confirmed! We will send you a confirmation email shortly.', 'success');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });

    // Date validation - prevent past dates
    const dateInput = document.getElementById('resDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        
        dateInput.addEventListener('change', function() {
            updateAvailableTimes(this.value);
        });
    }
}

// Validate Reservation Form
function validateReservationForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            field.style.borderColor = '#e0e0e0';
        }
    });
    
    if (!isValid) {
        showMessage('Please fill in all required fields.', 'error');
    }
    
    return isValid;
}

// Update Available Times (simulated)
function updateAvailableTimes(selectedDate) {
    const availableTimesSection = document.getElementById('availableTimes');
    const selectedDateSpan = document.getElementById('selectedDate');
    const timeSlotsContainer = document.getElementById('timeSlots');
    
    if (!availableTimesSection || !selectedDateSpan || !timeSlotsContainer) {
        return;
    }
    
    // Show available times section
    availableTimesSection.style.display = 'block';
    selectedDateSpan.textContent = new Date(selectedDate).toLocaleDateString();
    
    // Generate time slots (this would typically come from an API)
    const timeSlots = [
        '17:00', '17:30', '18:00', '18:30', '19:00', 
        '19:30', '20:00', '20:30', '21:00', '21:30'
    ];
    
    timeSlotsContainer.innerHTML = '';
    
    timeSlots.forEach(time => {
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        timeSlot.textContent = formatTime(time);
        
        // Randomly mark some slots as unavailable (simulation)
        if (Math.random() < 0.3) {
            timeSlot.classList.add('unavailable');
        } else {
            timeSlot.addEventListener('click', function() {
                // Remove selected class from all slots
                document.querySelectorAll('.time-slot').forEach(slot => {
                    slot.classList.remove('selected');
                });
                
                // Add selected class to clicked slot
                this.classList.add('selected');
                
                // Update the time input
                const timeInput = document.getElementById('resTime');
                if (timeInput) {
                    timeInput.value = time;
                }
            });
        }
        
        timeSlotsContainer.appendChild(timeSlot);
    });
}

// Format time for display
function formatTime(time) {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Show success/error messages
function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `${type}-message show`;
    messageElement.textContent = message;
    
    // Find the form to insert the message
    const form = document.querySelector('.contact-form, .reservation-form');
    if (form) {
        form.insertBefore(messageElement, form.firstChild);
    }
    
    // Auto-hide message after 5 seconds
    setTimeout(() => {
        messageElement.classList.remove('show');
        setTimeout(() => {
            messageElement.remove();
        }, 300);
    }, 5000);
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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

// Intersection Observer for animations
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0s';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animatedElements = document.querySelectorAll('.feature-card, .menu-item, .testimonial-card, .value-card, .team-member, .award-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

// Form input enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add focus/blur effects to form inputs
    const formInputs = document.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value) {
                this.parentElement.classList.add('has-value');
            } else {
                this.parentElement.classList.remove('has-value');
            }
        });
        
        // Check if input already has value on page load
        if (input.value) {
            input.parentElement.classList.add('has-value');
        }
    });
});

// Party size change handler for reservation form
const partySizeSelect = document.getElementById('partySize');
if (partySizeSelect) {
    partySizeSelect.addEventListener('change', function() {
        const partySize = parseInt(this.value);
        
        // Show message for large parties
        if (partySize >= 8) {
            showMessage('For parties of 8 or more, please call us at (555) 123-4567 to ensure we can accommodate your group.', 'info');
        }
    });
}

// Newsletter subscription handler
const newsletterCheckbox = document.getElementById('newsletter');
if (newsletterCheckbox) {
    newsletterCheckbox.addEventListener('change', function() {
        if (this.checked) {
            console.log('User subscribed to newsletter');
        }
    });
}

// Initialize page-specific functionality
function initializePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'menu.html':
            initializeMenuPage();
            break;
        case 'reservation.html':
            initializeReservationPage();
            break;
        case 'contact.html':
            initializeContactPage();
            break;
        default:
            initializeHomePage();
    }
}

function initializeMenuPage() {
    // Menu page specific initialization
    console.log('Menu page initialized');
}

function initializeReservationPage() {
    // Set minimum date to today
    const dateInput = document.getElementById('resDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
}

function initializeContactPage() {
    // Contact page specific initialization
    console.log('Contact page initialized');
}

function initializeHomePage() {
    // Home page specific initialization
    console.log('Home page initialized');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        mobileMenu?.classList.remove('active');
        navMenu?.classList.remove('active');
    }
});