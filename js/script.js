// ========================================
// INTRA FITOUT - Custom JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // TOAST NOTIFICATION SYSTEM
    // ========================================
    function showToast(message, type = 'info', duration = 5000) {
        
        const container = document.getElementById('toast-container');
    

        if (!container) {
            console.error('Toast container not found!');
            return;
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        // Define icons for different types
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };

        // Define titles for different types
        const titles = {
            success: 'Success!',
            error: 'Error!',
            warning: 'Warning!',
            info: 'Information'
        };

        // Build toast HTML
        toast.innerHTML = `
            <i class="fas ${icons[type]} toast-icon"></i>
            <div class="toast-content">
                <div class="toast-title">${titles[type]}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" aria-label="Close">
                <i class="fas fa-times"></i>
            </button>
            <div class="toast-progress"></div>
        `;

        // Add to container
        container.appendChild(toast);
       

        // Close button functionality
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            removeToast(toast);
        });

        // Auto remove after duration
        const timeout = setTimeout(() => {
            removeToast(toast);
        }, duration);

        // Store timeout for manual close
        toast.dataset.timeout = timeout;
    }

    function removeToast(toast) {
        // Clear timeout if exists
        if (toast.dataset.timeout) {
            clearTimeout(parseInt(toast.dataset.timeout));
        }

        // Add hiding animation
        toast.classList.add('toast-hiding');

        // Remove from DOM after animation
        setTimeout(() => {
            if (toast.parentElement) {
                toast.parentElement.removeChild(toast);
            }
        }, 400);
    }

    // ========================================
    // NAVBAR SCROLL EFFECT
    // ========================================
    const navbar = document.getElementById('mainNav');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ========================================
    // SMOOTH SCROLL FOR NAVIGATION LINKS
    // ========================================
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Only handle internal links
            if (href.startsWith('#')) {
                e.preventDefault();

                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    // Remove active class from all links
                    navLinks.forEach(l => l.classList.remove('active'));

                    // Add active class to clicked link
                    this.classList.add('active');

                    // Smooth scroll to section
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const navbarCollapse = document.getElementById('navbarNav');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            }
        });
    });

    // ========================================
    // SCROLL INDICATOR
    // ========================================
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function () {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = aboutSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });

        // Hide scroll indicator when scrolling down
        window.addEventListener('scroll', function () {
            if (window.scrollY > 200) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }

    // ========================================
    // ACTIVE SECTION HIGHLIGHTING
    // ========================================
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function () {
        let current = '';
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

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
    });

    // ========================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation class (for future sections)
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // ========================================
    // FORM VALIDATION (for future contact form)
    // ========================================
    const forms = document.querySelectorAll('.needs-validation');

    forms.forEach(form => {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // ========================================
    // PARALLAX EFFECT FOR HERO (Optional)
    // ========================================
    const heroSection = document.querySelector('.hero-section');

    if (heroSection) {
        window.addEventListener('scroll', function () {
            const scrolled = window.scrollY;
            const parallaxSpeed = 0.5;

            if (scrolled < window.innerHeight) {
                heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }

    // ========================================
    // CONSULTATION POPUP MODAL
    // ========================================

    // Show popup after 20 seconds
    setTimeout(function () {
        const consultationModal = new bootstrap.Modal(document.getElementById('consultationModal'));
        consultationModal.show();
    }, 20000); // 20 seconds

    // Initialize international phone input
    const phoneInput = document.querySelector("#consultPhone");
    let iti;

    if (phoneInput) {
        iti = window.intlTelInput(phoneInput, {
            initialCountry: "ae", // Default to UAE
            preferredCountries: ["ae", "sa", "qa", "kw", "bh", "om"],
            separateDialCode: true,
            autoPlaceholder: "aggressive", // Show country-specific placeholder
            formatOnDisplay: true,
            nationalMode: false,
            countrySearch: true, // Enable search in country dropdown
            i18n: {
                searchPlaceholder: "Search countries..."
            },
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@23.0.0/build/js/utils.js"
        });

        // Update placeholder when country changes
        phoneInput.addEventListener('countrychange', function () {
            // The autoPlaceholder option handles this automatically in v23
            // But we can add custom logic here if needed
        });
    }

    // Test toast when modal is shown
    const modalElement = document.getElementById('consultationModal');
    if (modalElement) {
        modalElement.addEventListener('shown.bs.modal', function () {
            
            // Test toast to verify it's working
            // setTimeout(() => {
            //     showToast('Welcome! Please fill out the form below.', 'info', 3000);
            // }, 500);
        });
    }


    // Handle form submission
    const consultationForm = document.getElementById('consultationForm');

    if (consultationForm) {
        consultationForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validate phone number
            if (iti && !iti.isValidNumber()) {
                phoneInput.classList.add('is-invalid');
                showToast('Please enter a valid phone number for the selected country', 'error');
                return;
            } else {
                phoneInput.classList.remove('is-invalid');
            }

            // Get form data
            const formData = {
                name: document.getElementById('consultName').value,
                email: document.getElementById('consultEmail').value,
                phone: iti ? iti.getNumber() : phoneInput.value,
                message: document.getElementById('consultMessage').value
            };

            // Here you would typically send the data to your server
          

            // Show success message
            showToast('Thank you! We will contact you soon.', 'success');

            // Close modal
            const consultationModal = bootstrap.Modal.getInstance(document.getElementById('consultationModal'));
            consultationModal.hide();

            // Reset form
            consultationForm.reset();
            if (iti) {
                iti.setNumber('');
            }
        });
    }
});
