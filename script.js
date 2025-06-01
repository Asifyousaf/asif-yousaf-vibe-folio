// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        mainContent.classList.remove('hidden');
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800);
    }, 3000); // 3 second loading time
});

// Navigation functionality
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Scroll spy for navigation
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Enhanced Background Canvas Animation
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let animationId;
let particles = [];
let mouse = { x: 0, y: 0 };
let mouseRadius = 100;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.originalSize = this.size;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRadius) {
            const force = (mouseRadius - distance) / mouseRadius;
            const directionX = dx / distance;
            const directionY = dy / distance;
            
            this.x -= directionX * force * 2;
            this.y -= directionY * force * 2;
            this.size = this.originalSize * (1 + force);
            this.opacity = Math.min(0.8, this.opacity + force * 0.3);
        } else {
            this.size += (this.originalSize - this.size) * 0.1;
            this.opacity += (this.originalSize * 0.3 - this.opacity) * 0.1;
        }

        // Boundary check
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Keep particles in bounds
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }
}

function createParticles() {
    particles = [];
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000));
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    connectParticles();
    animationId = requestAnimationFrame(animate);
}

// Mouse tracking
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// Initialize canvas
resizeCanvas();
createParticles();
animate();

// Handle resize
window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
});

// Hero name letter animation
document.addEventListener('DOMContentLoaded', () => {
    const letters = document.querySelectorAll('.letter');
    letters.forEach((letter, index) => {
        letter.style.animationDelay = `${index * 0.1}s`;
        letter.addEventListener('mouseenter', () => {
            letter.style.transform = 'translateY(-10px) rotate(5deg)';
        });
        letter.addEventListener('mouseleave', () => {
            letter.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
});

// Project modal functionality
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');
const projectCards = document.querySelectorAll('.project-card');

const projectData = {
    masat: {
        title: 'Masat Al Nahar',
        description: 'A comprehensive restaurant website featuring an intuitive online ordering system, dynamic menu management, and seamless payment integration.',
        details: 'Built with modern web technologies to provide an exceptional user experience. The project includes responsive design, interactive menu, and secure payment processing.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Figma'],
        year: '2024'
    },
    cybertronic: {
        title: 'Cybertronic Website',
        description: 'A full-stack e-commerce platform with robust user authentication, comprehensive product management, and seamless shopping experience.',
        details: 'Features include inventory management, order processing, customer analytics, and a modern admin dashboard for complete business management.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
        year: '2024'
    },
    time: {
        title: 'TIME Magazine Clone',
        description: 'A responsive magazine website that replicates the TIME Magazine experience with dynamic content loading and modern layout design.',
        details: 'Features real-time news updates, social sharing capabilities, search functionality, and an adaptive layout system for various article formats.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'REST API'],
        year: '2024'
    },
    fixmyride: {
        title: 'Fix My Ride',
        description: 'A comprehensive mobile application for car service booking and maintenance tracking with real-time updates.',
        details: 'Users can schedule appointments, track service history, receive maintenance reminders, and connect with trusted mechanics through an intuitive interface.',
        technologies: ['Kotlin', 'Android SDK', 'Firebase', 'Material UI'],
        year: '2024'
    }
};

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectKey = card.getAttribute('data-project');
        const project = projectData[projectKey];
        
        if (project) {
            modalBody.innerHTML = `
                <div class="project-detail">
                    <div class="project-header">
                        <h2>${project.title}</h2>
                        <span class="project-year">${project.year}</span>
                    </div>
                    <p class="project-description">${project.description}</p>
                    <p class="project-details">${project.details}</p>
                    <div class="project-tech">
                        <h3>Technologies</h3>
                        <div class="tech-list">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Add CSS for modal content
const modalStyles = `
    .project-detail {
        color: var(--text-primary);
    }
    
    .project-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 30px;
        border-bottom: 1px solid var(--border);
        padding-bottom: 20px;
    }
    
    .project-header h2 {
        font-size: 2.5rem;
        font-weight: 300;
        color: var(--text-primary);
    }
    
    .project-year {
        color: var(--text-secondary);
        font-size: 1rem;
        letter-spacing: 1px;
    }
    
    .project-description {
        font-size: 1.2rem;
        color: var(--text-secondary);
        margin-bottom: 30px;
        line-height: 1.7;
    }
    
    .project-details {
        font-size: 1rem;
        color: var(--text-secondary);
        margin-bottom: 40px;
        line-height: 1.6;
    }
    
    .project-tech h3 {
        font-size: 1.1rem;
        margin-bottom: 20px;
        color: var(--text-primary);
        font-weight: 500;
    }
    
    .tech-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    
    .tech-tag {
        background: rgba(255, 255, 255, 0.1);
        color: var(--text-primary);
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 500;
        border: 1px solid var(--border);
    }
    
    @media (max-width: 768px) {
        .project-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
        }
        
        .project-header h2 {
            font-size: 2rem;
        }
    }
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);
