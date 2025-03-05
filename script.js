// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
const navItems = document.querySelectorAll('.nav-links li a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Basic form validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // In a real application, you would send this data to a server
        // For now, we'll just show a success message
        alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
        contactForm.reset();
    });
}

// Skill bars animation on scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level');
    
    skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (barPosition < screenPosition && !bar.dataset.animated) {
            const width = bar.getAttribute('style') ? bar.style.width : bar.parentElement.querySelector('.skill-level').style.width;
            bar.style.transition = 'none';
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.transition = 'width 1s ease';
                bar.style.width = width;
                bar.dataset.animated = 'true';
            }, 50);
        }
    });
}

// Project cards animation on scroll
function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (cardPosition < screenPosition) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}

// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to animate sections on scroll
function animateSections() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionPosition = section.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition) {
            section.classList.add('animated');
        }
    });
}

// Add scroll event listeners
window.addEventListener('load', () => {
    animateSkillBars();
    animateProjectCards();
    animateSections();
});

window.addEventListener('scroll', () => {
    animateSkillBars();
    animateProjectCards();
    animateSections();
});

// Set animation delays for project cards
function setProjectCardDelays() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
        card.style.setProperty('--card-index', index);
    });
}

// Set animation delays for timeline items
function setTimelineDelays() {
    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });
}

// Add parallax scrolling effect
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.section-title, .hero-content, .about-image');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Enhance project cards animation
function enhanceProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Initialize enhanced animations
window.addEventListener('load', () => {
    setProjectCardDelays();
    setTimelineDelays();
    animateSections();
    animateSkillBars();
    animateProjectCards();
    addParallaxEffect();
    enhanceProjectCards();
});

// Run animations on scroll
window.addEventListener('scroll', () => {
    animateSections();
    animateSkillBars();
    animateProjectCards();
});

// Add smooth hover effect to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--x', `${x}px`);
        button.style.setProperty('--y', `${y}px`);
    });
});

// Add active class to navigation links based on scroll position
function highlightNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
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

// Run highlight function on scroll
window.addEventListener('scroll', highlightNavLink);

// Create a folder for images if it doesn't exist
// Note: This would typically be done server-side, not in client-side JavaScript
// For a local project, you'll need to manually create an 'images' folder and add your images