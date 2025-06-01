// Navigation functionality
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

// Mobile navigation toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

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
        
        // Close mobile menu if open
        navMenu.classList.remove('active');
        
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

// Hero Canvas Animation
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');

let animationId;
let particles = [];
let mouse = { x: 0, y: 0 };

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
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = `hsla(${Math.random() * 60 + 15}, 70%, 60%, ${this.opacity})`;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
            const force = (100 - distance) / 100;
            this.vx += (dx / distance) * force * 0.01;
            this.vy += (dy / distance) * force * 0.01;
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
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function createParticles() {
    particles = [];
    const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 8000));
    
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
                ctx.strokeStyle = `hsla(25, 70%, 60%, ${0.1 * (1 - distance / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'rgba(10, 10, 10, 1)');
    gradient.addColorStop(0.5, 'rgba(0, 78, 137, 0.1)');
    gradient.addColorStop(1, 'rgba(255, 107, 53, 0.1)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    connectParticles();
    animationId = requestAnimationFrame(animate);
}

// Mouse tracking
canvas.addEventListener('mousemove', (e) => {
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

// Skill progress animation
const observerOptions = {
    threshold: 0.7,
    rootMargin: '0px 0px -100px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 200);
            });
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// Project modal functionality
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');
const projectCards = document.querySelectorAll('.project-card');

const projectData = {
    masat: {
        title: 'Masat Al Nahar',
        description: 'A comprehensive restaurant website featuring an intuitive online ordering system, dynamic menu management, and seamless payment integration. Built with modern web technologies to provide an exceptional user experience.',
        features: [
            'Responsive design optimized for all devices',
            'Interactive menu with real-time updates',
            'Secure online ordering system',
            'Customer review and rating system',
            'Admin dashboard for menu management',
            'Integration with payment gateways'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Figma'],
        challenges: 'Implementing a real-time order tracking system and ensuring cross-browser compatibility.',
        outcome: 'Increased online orders by 40% and improved customer satisfaction ratings.',
        links: {
            demo: '#',
            design: '#'
        }
    },
    cybertronic: {
        title: 'Cybertronic Website',
        description: 'A full-stack e-commerce platform with robust user authentication, comprehensive product management, and seamless shopping experience. Features include inventory management, order processing, and customer analytics.',
        features: [
            'User authentication and authorization',
            'Product catalog with search and filters',
            'Shopping cart and checkout process',
            'Order management system',
            'Customer dashboard and order history',
            'Admin panel for inventory management'
        ],
        technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
        challenges: 'Implementing secure payment processing and optimizing database queries for better performance.',
        outcome: 'Successfully processed over 1000 transactions with 99.9% uptime.',
        links: {
            demo: '#',
            code: '#'
        }
    },
    time: {
        title: 'TIME Magazine Clone',
        description: 'A responsive magazine website that replicates the TIME Magazine experience with dynamic content loading, interactive articles, and modern layout design. Features real-time news updates and social sharing capabilities.',
        features: [
            'Dynamic article loading and pagination',
            'Responsive grid layout for articles',
            'Search functionality across articles',
            'Social media sharing integration',
            'Comment system for reader engagement',
            'Newsletter subscription feature'
        ],
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'REST API'],
        challenges: 'Creating a flexible layout system that adapts to various article formats and ensuring fast loading times.',
        outcome: 'Achieved 95% PageSpeed score and received positive feedback for user experience.',
        links: {
            demo: '#',
            code: '#'
        }
    },
    fixmyride: {
        title: 'Fix My Ride',
        description: 'A comprehensive mobile application for car service booking and maintenance tracking. Users can schedule appointments, track service history, receive maintenance reminders, and connect with trusted mechanics.',
        features: [
            'Service appointment scheduling',
            'Maintenance history tracking',
            'Push notifications for reminders',
            'Mechanic finder with ratings',
            'Cost estimation for services',
            'Digital service receipts'
        ],
        technologies: ['Kotlin', 'Android SDK', 'Firebase', 'Material UI'],
        challenges: 'Implementing real-time location tracking and ensuring data synchronization across devices.',
        outcome: 'Downloaded by 5000+ users with 4.5-star average rating on Google Play Store.',
        links: {
            design: '#',
            code: '#'
        }
    }
};

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectKey = card.getAttribute('data-project');
        const project = projectData[projectKey];
        
        if (project) {
            modalBody.innerHTML = `
                <div class="project-detail">
                    <h2 class="project-detail-title">${project.title}</h2>
                    <p class="project-detail-description">${project.description}</p>
                    
                    <div class="project-section">
                        <h3>Key Features</h3>
                        <ul class="project-features">
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="project-section">
                        <h3>Technologies Used</h3>
                        <div class="project-tech-tags">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="project-section">
                        <h3>Challenges & Solutions</h3>
                        <p>${project.challenges}</p>
                    </div>
                    
                    <div class="project-section">
                        <h3>Results</h3>
                        <p>${project.outcome}</p>
                    </div>
                    
                    <div class="project-links">
                        ${Object.entries(project.links).map(([type, url]) => 
                            `<a href="${url}" class="project-link-btn">${type.charAt(0).toUpperCase() + type.slice(1)}</a>`
                        ).join('')}
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

// CTA button scroll to projects
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('click', () => {
    document.getElementById('projects').scrollIntoView({
        behavior: 'smooth'
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add CSS for modal content
const modalStyles = `
    .project-detail {
        color: var(--text-light);
    }
    
    .project-detail-title {
        font-size: 2.5rem;
        margin-bottom: 20px;
        background: var(--gradient-1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .project-detail-description {
        font-size: 1.2rem;
        color: var(--text-gray);
        margin-bottom: 40px;
        line-height: 1.8;
    }
    
    .project-section {
        margin-bottom: 40px;
    }
    
    .project-section h3 {
        font-size: 1.5rem;
        margin-bottom: 20px;
        color: var(--primary-color);
    }
    
    .project-features {
        list-style: none;
        padding: 0;
    }
    
    .project-features li {
        padding: 10px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        color: var(--text-gray);
    }
    
    .project-features li:last-child {
        border-bottom: none;
    }
    
    .project-tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    
    .tech-tag {
        background: rgba(255, 107, 53, 0.2);
        color: var(--primary-color);
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 500;
    }
    
    .project-links {
        display: flex;
        gap: 15px;
        margin-top: 40px;
    }
    
    .project-link-btn {
        background: var(--gradient-1);
        color: var(--text-light);
        padding: 12px 25px;
        border-radius: 25px;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    
    .project-link-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(255, 107, 53, 0.3);
    }
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);
