// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'white';
            navMenu.style.padding = '1rem';
            navMenu.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });
    }

    // Events Page Functionality
    if (document.getElementById('events-container')) {
        loadEvents();
        setupFilters();
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
});

// Simulated Events Data (Backend would provide this)
const eventsData = [
    {
        id: 1,
        title: 'Tech Talk: Web Development Trends',
        date: '2024-12-15',
        day: '15',
        month: 'DEC',
        location: 'Computer Science Building',
        time: '2:00 PM',
        description: 'Join us for an insightful session on the latest web development technologies and best practices.',
        category: 'academic'
    },
    {
        id: 2,
        title: 'Career Fair 2024',
        date: '2024-12-18',
        day: '18',
        month: 'DEC',
        location: 'Main Auditorium',
        time: '10:00 AM',
        description: 'Meet recruiters from top companies and explore internship opportunities.',
        category: 'academic'
    },
    {
        id: 3,
        title: 'Winter Festival',
        date: '2024-12-22',
        day: '22',
        month: 'DEC',
        location: 'Campus Grounds',
        time: '5:00 PM',
        description: 'Celebrate the season with food, music, and fun activities for all students.',
        category: 'social'
    },
    {
        id: 4,
        title: 'Basketball Tournament Finals',
        date: '2024-12-20',
        day: '20',
        month: 'DEC',
        location: 'Sports Complex',
        time: '6:00 PM',
        description: 'Cheer for your favorite team in the championship game of the semester.',
        category: 'sports'
    },
    {
        id: 5,
        title: 'Photography Workshop',
        date: '2024-12-16',
        day: '16',
        month: 'DEC',
        location: 'Art Building',
        time: '3:00 PM',
        description: 'Learn professional photography techniques from industry experts.',
        category: 'workshop'
    },
    {
        id: 6,
        title: 'Coding Bootcamp: Python Basics',
        date: '2024-12-19',
        day: '19',
        month: 'DEC',
        location: 'Lab 301',
        time: '1:00 PM',
        description: 'Hands-on workshop for beginners to learn Python programming fundamentals.',
        category: 'workshop'
    },
    {
        id: 7,
        title: 'Student Council Meeting',
        date: '2024-12-17',
        day: '17',
        month: 'DEC',
        location: 'Student Center',
        time: '4:00 PM',
        description: 'Monthly meeting to discuss campus initiatives and student concerns.',
        category: 'academic'
    },
    {
        id: 8,
        title: 'Open Mic Night',
        date: '2024-12-21',
        day: '21',
        month: 'DEC',
        location: 'Campus Cafe',
        time: '7:00 PM',
        description: 'Showcase your talent! Poetry, music, comedy - all welcome.',
        category: 'social'
    }
];

// Load and Display Events
function loadEvents(filter = 'all') {
    const container = document.getElementById('events-container');
    if (!container) return;

    // Filter events
    const filteredEvents = filter === 'all'
        ? eventsData
        : eventsData.filter(event => event.category === filter);

    // Clear container
    container.innerHTML = '';

    // Check if there are events
    if (filteredEvents.length === 0) {
        container.innerHTML = '<p class="loading">No events found in this category.</p>';
        return;
    }

    // Create event cards
    filteredEvents.forEach(event => {
        const eventCard = createEventCard(event);
        container.appendChild(eventCard);
    });
}

// Create Event Card Element
function createEventCard(event) {
    const article = document.createElement('article');
    article.className = 'event-card';

    article.innerHTML = `
        <div class="event-date">
            <span class="date-day">${event.day}</span>
            <span class="date-month">${event.month}</span>
        </div>
        <div class="event-content">
            <h3>${event.title}</h3>
            <p class="event-meta">📍 ${event.location} | ⏰ ${event.time}</p>
            <p class="event-description">${event.description}</p>
            <span class="event-category">${getCategoryLabel(event.category)}</span>
        </div>
    `;

    return article;
}

// Get Category Label
function getCategoryLabel(category) {
    const labels = {
        'academic': 'Academic',
        'social': 'Social',
        'sports': 'Sports',
        'workshop': 'Workshop'
    };
    return labels[category] || category;
}

// Setup Filter Buttons
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Get filter category
            const category = button.getAttribute('data-category');

            // Load filtered events
            loadEvents(category);
        });
    });
}

// Handle Contact Form Submission
function handleContactSubmit(e) {
    e.preventDefault();

    const formMessage = document.getElementById('formMessage');
    const form = e.target;

    // Get form data
    const formData = {
        name: form.name.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value
    };

    // Simulate form submission (in real app, this would send to backend)
    setTimeout(() => {
        formMessage.className = 'form-message success';
        formMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
        form.reset();

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.className = 'form-message';
            formMessage.textContent = '';
        }, 5000);
    }, 500);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});
