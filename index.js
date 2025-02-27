document.addEventListener('DOMContentLoaded', function() {
    // Set event dates
    const eventStartDate = new Date('2025-03-01T00:00:00');
    const eventEndDate = new Date('2025-03-04T00:00:00');

    // Navbar scroll effect
    function handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);

    // Event status check
    function isEventActive() {
        const now = new Date();
        return now >= eventStartDate && now <= eventEndDate;
    }

    // Format numbers with leading zeros
    function formatNumber(number) {
        return String(number).padStart(2, '0');
    }

    // Countdown timer
    function updateCountdown() {
        const now = new Date().getTime();
        const targetDate = isEventActive() ? eventEndDate : eventStartDate;
        const distance = targetDate - now;

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update DOM elements
        const countdownElements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };

        if (distance < 0) {
            // Event has ended
            const eventStatus = document.getElementById('eventStatus');
            eventStatus.textContent = 'Event has Ended';
            eventStatus.classList.add('ended');
            document.querySelector('.countdown').style.display = 'none';
            return;
        }

        // Update countdown numbers with animation
        Object.entries(countdownElements).forEach(([unit, element]) => {
            const currentValue = element.textContent;
            const newValue = formatNumber(eval(unit));
            
            if (currentValue !== newValue) {
                element.classList.add('flip');
                element.textContent = newValue;
                
                setTimeout(() => {
                    element.classList.remove('flip');
                }, 500);
            }
        });

        // Update event status
        const eventStatus = document.getElementById('eventStatus');
        if (isEventActive()) {
            eventStatus.textContent = '🎉 Event is Live! 🎉';
            eventStatus.classList.add('live');
            eventStatus.classList.remove('upcoming');
        } else {
            eventStatus.textContent = '🔜 Coming Soon';
            eventStatus.classList.add('upcoming');
            eventStatus.classList.remove('live');
        }
    }

    // Update countdown every second
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    // Smooth scrolling for all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Scroll indicator functionality with enhanced animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const eventsSection = document.querySelector('#events');
            if (eventsSection) {
                eventsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });

        // Hide scroll indicator when user scrolls past hero section
        window.addEventListener('scroll', function() {
            if (window.scrollY > window.innerHeight * 0.5) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }

    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    // Add hover effect to event cards
    document.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Form validation for registration links
    document.querySelectorAll('a[href^="https://forms.gle"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const confirmed = confirm('You will be redirected to the registration form. Continue?');
            if (!confirmed) {
                e.preventDefault();
            }
        });
    });
});