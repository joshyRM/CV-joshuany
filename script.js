/* ========================================
   PORTFOLIO PROFESIONAL - JAVASCRIPT
   ======================================== */

// ========================================
// TEMA OSCURO / CLARO
// ========================================

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Cargar preferencia de tema guardada
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon();
    }
}

// Actualizar icono del tema
function updateThemeIcon() {
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Cambiar tema
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
});

// Cargar tema al iniciar
loadTheme();

// ========================================
// MENÚ HAMBURGUESA RESPONSIVO
// ========================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Cerrar menú al hacer scroll
document.addEventListener('scroll', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
});

// ========================================
// BOTÓN VOLVER ARRIBA
// ========================================

const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// DESCARGAR CV
// ========================================

const downloadCVBtn = document.getElementById('downloadCV');

downloadCVBtn.addEventListener('click', () => {
    // Crear un archivo de texto simulado (en producción sería un PDF real)
    const cvContent = `
JOSH RIVAS
Desarrollador Full Stack

CONTACTO
Email: correo@ejemplo.com
Teléfono: +502 1234 5678
Ubicación: Guatemala
GitHub: github.com/joshyRM

OBJETIVO PROFESIONAL
Futuro Desarrollador Full Stack apasionado por crear soluciones digitales innovadoras. 
Comprometido con el aprendizaje continuo y el desarrollo de tecnologías web modernas.

SOBRE MÍ
Soy una persona responsable, creativa y comprometida con mis objetivos. 
Mi enfoque autodidacta me ha permitido adquirir conocimientos en programación web de manera independiente.
Tengo gran facilidad para trabajar en equipo, valorando la comunicación clara y la colaboración.

EDUCACIÓN
Bachillerato General Oficial "Carlos Camacho Espíritu" (2024 - Presente)
Aprendizaje Autodidacta en Desarrollo Web (2024 - Presente)

HABILIDADES TÉCNICAS
- HTML5 (90%)
- CSS3 (85%)
- JavaScript (75%)
- GitHub & Git (80%)
- Diseño Web Responsivo (85%)

HABILIDADES BLANDAS
- Creatividad
- Resolución de Problemas
- Trabajo en Equipo
- Comunicación
- Pensamiento Lógico
- Autodidacta

PROYECTOS DESTACADOS
1. Portal Profesional - HTML5, CSS3, JavaScript
2. Generador de Chistes - JavaScript, API REST
3. Dashboard del Clima - Weather API, JavaScript
4. Reloj Digital Multi-zona - JavaScript, HTML5, CSS3

OBJETIVOS PROFESIONALES
Corto Plazo: Dominar HTML, CSS y JavaScript, crear 5-10 proyectos, obtener certificaciones
Mediano Plazo: Aprender React.js, trabajar en proyectos colaborativos, dominar bases de datos
Largo Plazo: Convertirme en Desarrollador Full Stack profesional, obtener mi primer empleado
    `;
    
    // Crear blob y descargar
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CV-JoshRivas.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    // Mostrar notificación
    showNotification('CV descargado correctamente');
});

// ========================================
// FORMULARIO DE CONTACTO
// ========================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Validar campos
    if (!name || !email || !message) {
        showNotification('Por favor completa todos los campos', 'error');
        return;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Por favor ingresa un email válido', 'error');
        return;
    }
    
    // Simular envío de formulario
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    // Simular envío (en producción se enviaría a un servidor)
    setTimeout(() => {
        console.log('Mensaje enviado:', { name, email, message });
        showNotification('¡Mensaje enviado correctamente! Te responderé pronto.');
        
        // Limpiar formulario
        contactForm.reset();
        
        // Restaurar botón
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }, 1500);
});

// ========================================
// NOTIFICACIONES
// ========================================

function showNotification(message, type = 'success') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        animation: slideIn 0.3s ease;
        z-index: 2000;
        font-weight: 500;
        max-width: 300px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remover notificación después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// ANIMACIONES AL HACER SCROLL
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos
document.querySelectorAll('.section > div, .project-card, .skill-item').forEach(element => {
    observer.observe(element);
});

// ========================================
// ANIMACIÓN DE BARRAS DE PROGRESO
// ========================================

const skillBars = document.querySelectorAll('.skill-progress');
let animated = false;

const animateSkillBars = () => {
    if (animated) return;
    
    const skillsSection = document.getElementById('habilidades');
    if (!skillsSection) return;
    
    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.animation = `fillBar 1s ease forwards`;
        });
        animated = true;
    }
};

window.addEventListener('scroll', animateSkillBars);
animateSkillBars();

// ========================================
// EFECTO HOVER EN TARJETAS
// ========================================

const cards = document.querySelectorAll('.project-card, .objective-card, .certification-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ========================================
// ACTIVA LINK DEL MENÚ SEGÚN SCROLL
// ========================================

window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
            link.style.color = 'var(--primary)';
        } else {
            link.style.color = '';
        }
    });
});

// ========================================
// TRANSICIONES SUAVES ENTRE SECCIONES
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ========================================
// EFECTO PARALLAX (OPCIONAL)
// ========================================

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `0px ${scrollPosition * 0.5}px`;
    }
});

// ========================================
// FUNCIONES AUXILIARES
// ========================================

// Función para detectar si un elemento está en vista
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ========================================
// INICIALIZACIÓN
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio cargado correctamente');
    
    // Agregar clase active al menú inicial
    const activeLink = document.querySelector('a[href="#inicio"]');
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Animar elementos en viewport
    document.querySelectorAll('.fade-in').forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('show');
        }
    });
});

// ========================================
// FUNCIONES PARA EDITAR CONTENIDO
// ========================================

// Función para actualizar enlace de GitHub
function updateGitHubLinks(username) {
    const githubLinks = document.querySelectorAll('a[href="#"]');
    githubLinks.forEach(link => {
        if (link.getAttribute('title') === 'GitHub') {
            link.setAttribute('href', `https://github.com/${username}`);
        }
    });
}

// Función para actualizar enlace de LinkedIn
function updateLinkedInLink(profileUrl) {
    const linkedinLinks = document.querySelectorAll('a[href="#"]');
    linkedinLinks.forEach(link => {
        if (link.getAttribute('title') === 'LinkedIn') {
            link.setAttribute('href', profileUrl);
        }
    });
}

// Funci��n para actualizar email
function updateEmail(email) {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.setAttribute('href', `mailto:${email}`);
        link.textContent = email;
    });
}

// ========================================
// MANEJO DE ERRORES
// ========================================

window.addEventListener('error', (event) => {
    console.error('Error:', event.error);
});

// Prevenir errores de console
if (!window.console) {
    window.console = {
        log: function() {},
        error: function() {},
        warn: function() {}
    };
}

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Lazy loading de imágenes (si las hubiera)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
}

// ========================================
// EVENTOS PERSONALIZADOS
// ========================================

// Evento personalizado para cuando se completa la carga
const portfolioReadyEvent = new CustomEvent('portfolioReady', {
    detail: { timestamp: new Date() }
});

document.addEventListener('DOMContentLoaded', () => {
    document.dispatchEvent(portfolioReadyEvent);
});

// ========================================
// FUNCIONES DE UTILIDAD
// ========================================

// Obtener parámetro de URL
function getUrlParameter(name) {
    const url = new URL(window.location);
    return url.searchParams.get(name);
}

// Guardar en localStorage
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Obtener de localStorage
function getFromLocalStorage(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

// ========================================
// MODO ACCESIBILIDAD
// ========================================

// Agregar atributos ARIA
document.querySelectorAll('button').forEach(button => {
    if (!button.hasAttribute('aria-label')) {
        button.setAttribute('aria-label', button.textContent.trim());
    }
});

// Teclado navegación
document.addEventListener('keydown', (e) => {
    // Atajo: Presionar 'T' para cambiar tema
    if (e.key === 't' || e.key === 'T') {
        if (e.ctrlKey) {
            themeToggle.click();
        }
    }
});

console.log('✅ Portfolio completamente cargado y funcional');
