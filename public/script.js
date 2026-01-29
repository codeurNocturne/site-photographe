// Variables globales
const whatsappNumber = '+237689034220'; // Remplacez par votre numéro
const whatsappMessage = 'Bonjour, je suis intéressé par vos services de photographie.';

// Portfolio data
const portfolioItems = [
    { 
        id: 1, 
        category: 'mariage',
        title: 'Mariage à Paris',
        description: 'Cérémonie traditionnelle',
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    { 
        id: 2, 
        category: 'portrait',
        title: 'Portrait en studio',
        description: 'Séance portrait professionnelle',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    { 
        id: 3, 
        category: 'evenement',
        title: 'Événement corporate',
        description: 'Conférence annuelle',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    { 
        id: 4, 
        category: 'mariage',
        title: 'Mariage champêtre',
        description: 'Cérémonie en pleine nature',
        image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    { 
        id: 5, 
        category: 'portrait',
        title: 'Portrait famille',
        description: 'Séance en extérieur',
        image: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    { 
        id: 6, 
        category: 'evenement',
        title: 'Soirée de gala',
        description: 'Événement caritatif',
        image: 'https://images.unsplash.com/photo-1492684223066-dd23140edf6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
];

// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const contactBtn = document.getElementById('contactBtn');
const portfolioGrid = document.getElementById('portfolioGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contactForm');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

// Navigation
function initNavigation() {
    // Menu toggle
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close menu on link click (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active nav link on scroll
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
}

// Portfolio
function initPortfolio() {
    // Render portfolio items
    function renderPortfolio(filter = 'all') {
        portfolioGrid.innerHTML = '';
        
        const filteredItems = filter === 'all' 
            ? portfolioItems 
            : portfolioItems.filter(item => item.category === filter);
        
        filteredItems.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';
            portfolioItem.dataset.category = item.category;
            
            portfolioItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="portfolio-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            
            portfolioGrid.appendChild(portfolioItem);
        });
    }

    // Filter portfolio items
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            renderPortfolio(filter);
        });
    });

    // Initialize portfolio
    renderPortfolio();
}

// Contact Form
function initContact() {
    // WhatsApp contact button
    contactBtn.addEventListener('click', () => {
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
    });

    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    alert('Message envoyé avec succès! Je vous répondrai dans les plus brefs délais.');
                    contactForm.reset();
                    
                    // Rediriger vers WhatsApp
                    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                        `Bonjour, je m'appelle ${formData.name}. J'ai soumis une demande pour ${formData.service}. ${formData.message}`
                    )}`;
                    window.open(whatsappUrl, '_blank');
                } else {
                    alert('Une erreur est survenue. Veuillez réessayer.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Une erreur est survenue. Veuillez réessayer.');
            }
        });
    }
}

// Animations on scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .portfolio-item, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initPortfolio();
    initContact();
    initAnimations();
    
    // Initial active nav link
    setTimeout(() => {
        document.querySelectorAll('.nav-link')[0].classList.add('active');
    }, 100);
});

// Handle page load animations
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});
// Fonction pour charger le portfolio depuis l'API
async function loadPortfolioFromAPI(filter = 'all') {
    try {
        const response = await fetch(`/api/portfolio?category=${filter}`);
        const portfolioItems = await response.json();
        renderPortfolio(portfolioItems);
    } catch (error) {
        console.error('Erreur lors du chargement du portfolio:', error);
        // Fallback aux données locales
        renderPortfolio(portfolioItems.filter(item => 
            filter === 'all' || item.category === filter
        ));
    }
}

// Mettre à jour la fonction initPortfolio pour utiliser l'API
function initPortfolio() {
    // Render portfolio items
    function renderPortfolio(items) {
        portfolioGrid.innerHTML = '';
        
        items.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';
            portfolioItem.dataset.category = item.category;
            
            portfolioItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="portfolio-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <span class="portfolio-category">${getCategoryLabel(item.category)}</span>
                </div>
            `;
            
            portfolioGrid.appendChild(portfolioItem);
        });
    }

    function getCategoryLabel(category) {
        const labels = {
            'mariage': 'Mariage',
            'portrait': 'Portrait',
            'evenement': 'Événement'
        };
        return labels[category] || category;
    }

    // Filter portfolio items
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            loadPortfolioFromAPI(filter);
        });
    });

    // Initialize portfolio avec l'API
    loadPortfolioFromAPI();
}

// Mettre à jour la fonction initContact pour mieux gérer l'API
function initContact() {
    // WhatsApp contact button
    contactBtn.addEventListener('click', () => {
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
    });

    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Désactiver le bouton pendant l'envoi
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                service: document.getElementById('service').value,
                message: document.getElementById('message').value.trim()
            };

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (result.success) {
                    // Afficher un message de succès
                    showNotification('Message envoyé avec succès!', 'success');
                    
                    // Réinitialiser le formulaire
                    contactForm.reset();
                    
                    // Rediriger vers WhatsApp avec le message formaté
                    if (result.whatsappUrl) {
                        setTimeout(() => {
                            window.open(result.whatsappUrl, '_blank');
                        }, 1000);
                    }
                } else {
                    showNotification(result.message || 'Une erreur est survenue', 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showNotification('Erreur de connexion au serveur', 'error');
            } finally {
                // Réactiver le bouton
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }
}

// Fonction pour afficher des notifications
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Ajouter au body
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Fermer au clic
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Fermer automatiquement après 5 secondes
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}