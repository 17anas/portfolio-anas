// ==================== HEADER SCROLL EFFECT ====================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ==================== MOBILE MENU TOGGLE ====================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// ==================== ACTIVE NAV LINK ON SCROLL ====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

function updateActiveNavLink() {
    const scrollY = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
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

// ==================== ANIMATE ON SCROLL ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and feature cards
document.querySelectorAll('.card, .feature-card, .skill-card, .cert-card, .experience-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== PROGRESS BARS ANIMATION ====================
const progressBars = document.querySelectorAll('.progress-bar__fill');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const level = entry.target.getAttribute('data-level');
            if (level) {
                setTimeout(() => {
                    entry.target.style.width = `${level}%`;
                }, 200);
            } else {
                // For language bars that don't have data-level
                const computedWidth = entry.target.style.width || getComputedStyle(entry.target).width;
                if (!computedWidth || computedWidth === '0px') {
                    entry.target.style.width = entry.target.style.width || '0%';
                }
            }
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
    const originalWidth = bar.style.width || getComputedStyle(bar).width;
    bar.style.width = '0%';
    progressObserver.observe(bar);
});

// ==================== CONTACT FORM HANDLING ====================
const contactForm = document.getElementById('contact-form');

// Configuration EmailJS (désactivé par défaut - activez après configuration)
const EMAILJS_ENABLED = false; // Mettez à true après avoir configuré EmailJS
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // Remplacez par votre clé
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID"; // Remplacez par votre Service ID
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // Remplacez par votre Template ID

// Initialiser EmailJS seulement si configuré et si la bibliothèque est chargée
if (EMAILJS_ENABLED && typeof emailjs !== 'undefined') {
    try {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    } catch (error) {
        console.log('EmailJS non configuré, utilisation de mailto');
    }
}

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Button state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        
        // Si EmailJS est configuré, utiliser EmailJS
        if (EMAILJS_ENABLED && typeof emailjs !== 'undefined') {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            
            try {
                const response = await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    {
                        from_name: name,
                        from_email: email,
                        subject: subject,
                        message: message,
                        to_email: 'aelmouanid1@gmail.com'
                    }
                );
                
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé!';
                submitBtn.style.background = '#22c55e';
                showNotification('Message envoyé avec succès! Je vous répondrai dès que possible.', 'success');
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.background = '';
                }, 3000);
                
            } catch (error) {
                console.error('Erreur EmailJS:', error);
                submitBtn.innerHTML = '<i class="fas fa-times"></i> Erreur';
                submitBtn.style.background = '#ef4444';
                showNotification('Une erreur est survenue. Utilisation du client email...', 'error');
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.background = '';
                }, 2000);
                
                // Fallback vers mailto en cas d'erreur
                setTimeout(() => {
                    openMailClient(name, email, subject, message);
                }, 2000);
            }
        } else {
            // Solution mailto (fonctionne immédiatement sans configuration)
            submitBtn.innerHTML = '<i class="fas fa-envelope"></i> Préparation du message...';
            
            // Préparer un message professionnel
            const professionalMessage = `Bonjour Anas,

J'espère que ce message vous trouvera en bonne santé.

${message}

Je reste à votre disposition pour toute information complémentaire.

Cordialement,
${name}
${email}

---
Ce message a été envoyé depuis le formulaire de contact de votre portfolio professionnel.`;
            
            // Ouvrir le client email par défaut avec le message formaté
            const mailtoLink = `mailto:aelmouanid1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(professionalMessage)}`;
            window.location.href = mailtoLink;
            
            // Afficher un message professionnel
            showNotification('Votre client email s\'ouvre avec le message formaté. Il suffit de cliquer sur "Envoyer"!', 'success');
            
            // Reset form après un court délai
            setTimeout(() => {
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }, 3000);
        }
    });
}

// Fonction pour ouvrir le client email avec un message professionnel
function openMailClient(name, email, subject, message) {
    const emailBody = `Bonjour Anas,

J'espère que ce message vous trouvera en bonne santé.

${message}

Je reste à votre disposition pour toute information complémentaire.

Cordialement,
${name}
${email}

---
Ce message a été envoyé depuis le formulaire de contact de votre portfolio professionnel.`;
    
    const mailtoLink = `mailto:aelmouanid1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
}

// Fonction pour afficher des notifications
function showNotification(message, type = 'success') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Ajouter au body
    document.body.appendChild(notification);
    
    // Afficher avec animation
    setTimeout(() => {
        notification.classList.add('notification--show');
    }, 10);
    
    // Retirer après 5 secondes
    setTimeout(() => {
        notification.classList.remove('notification--show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// ==================== CURRENT YEAR ====================
const currentYearElement = document.getElementById('current-year');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// ==================== TYPING EFFECT (Optional) ====================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ==================== PARALLAX EFFECT (Optional) ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBlobs = document.querySelectorAll('.hero__blob');
    
    heroBlobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.5;
        blob.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==================== FADE IN ANIMATION ON LOAD ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== SKILL TAGS ANIMATION ====================
const tags = document.querySelectorAll('.tag, .hobby-tag');
tags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'scale(0)';
    tag.style.transition = `opacity 0.3s ease ${index * 0.1}s, transform 0.3s ease ${index * 0.1}s`;
    
    const tagObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
                tagObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    tagObserver.observe(tag);
});

// ==================== COPY TO CLIPBOARD (for email/phone) ====================
document.querySelectorAll('.contact-info-item').forEach(item => {
    item.addEventListener('click', (e) => {
        const text = item.querySelector('.contact-info-item__text').textContent;
        if (text.includes('@') || text.includes('+')) {
            navigator.clipboard.writeText(text.trim()).then(() => {
                // Show feedback
                const originalText = item.querySelector('.contact-info-item__text').textContent;
                item.querySelector('.contact-info-item__text').textContent = 'Copié!';
                setTimeout(() => {
                    item.querySelector('.contact-info-item__text').textContent = originalText;
                }, 2000);
            });
        }
    });
});

console.log('Portfolio loaded successfully! 🚀');

