
// Global variables
let scene, camera, renderer, particles;
let mouseX = 0, mouseY = 0;
let currentTheme = 'cyber';
let currentSection = 'home';

// Project data
const projectData = {
    masat: {
        title: 'Masat Al Nahar',
        description: 'A comprehensive restaurant website featuring an intuitive online ordering system, dynamic menu management, and seamless payment integration.',
        details: 'Built with modern web technologies to provide an exceptional user experience. Features responsive design, interactive menu, and secure payment processing.',
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCursor();
    initThreejs();
    initNavigation();
    initMagneticElements();
    initProjectModals();
    initThemeSwitcher();
    
    // Start loading sequence
    setTimeout(() => {
        hideLoader();
    }, 3000);
});

// Loader functions
function initLoader() {
    const progressBar = document.querySelector('.progress-bar');
    const percentage = document.querySelector('.loader-percentage');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = progress + '%';
        percentage.textContent = Math.floor(progress) + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 100);
}

function hideLoader() {
    const loader = document.getElementById('loader');
    const mainContainer = document.getElementById('main-container');
    
    loader.classList.add('fade-out');
    mainContainer.classList.remove('hidden');
    
    setTimeout(() => {
        loader.style.display = 'none';
        document.body.style.overflow = 'hidden';
        animateHeroText();
    }, 800);
}

// Custom cursor
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Cursor interactions
    document.addEventListener('mousedown', () => {
        cursor.classList.add('active');
        cursorFollower.classList.add('active');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('active');
        cursorFollower.classList.remove('active');
    });
}

// Three.js background
function initThreejs() {
    const canvas = document.getElementById('background-canvas');
    
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Create particles
    createParticles();
    
    // Camera position
    camera.position.z = 5;
    
    // Animation loop
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    
    for (let i = 0; i < 1000; i++) {
        vertices.push(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
        );
        
        colors.push(
            Math.random(),
            Math.random() * 0.5 + 0.5,
            1
        );
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotate particles
    if (particles) {
        particles.rotation.x += 0.001;
        particles.rotation.y += 0.002;
        
        // Mouse interaction
        const targetX = (mouseX / window.innerWidth) * 2 - 1;
        const targetY = -(mouseY / window.innerHeight) * 2 + 1;
        
        particles.rotation.x += (targetY * 0.1 - particles.rotation.x) * 0.05;
        particles.rotation.y += (targetX * 0.1 - particles.rotation.y) * 0.05;
    }
    
    renderer.render(scene, camera);
}

// Navigation
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = item.getAttribute('data-section');
            switchSection(targetSection);
        });
    });
    
    // Button navigation
    const buttons = document.querySelectorAll('[data-section]');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.getAttribute('data-section');
            if (targetSection) {
                switchSection(targetSection);
            }
        });
    });
}

function switchSection(targetSection) {
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Hide current section
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Update navigation
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === targetSection) {
            item.classList.add('active');
        }
    });
    
    // Show target section with delay
    setTimeout(() => {
        const targetElement = document.getElementById(targetSection);
        if (targetElement) {
            targetElement.classList.add('active');
            
            // Animate text elements
            if (targetSection === 'about') {
                animateRevealText();
            }
        }
    }, 300);
    
    currentSection = targetSection;
}

// Magnetic elements
function initMagneticElements() {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(element, {
                duration: 0.3,
                scale: 1.1,
                ease: "power2.out"
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                duration: 0.3,
                scale: 1,
                x: 0,
                y: 0,
                ease: "power2.out"
            });
        });
        
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(element, {
                duration: 0.3,
                x: x * 0.1,
                y: y * 0.1,
                ease: "power2.out"
            });
        });
    });
}

// Project modals
function initProjectModals() {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.querySelector('.modal-close');
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectKey = card.getAttribute('data-project');
            const project = projectData[projectKey];
            
            if (project) {
                modalBody.innerHTML = `
                    <div class="project-detail">
                        <h2 style="font-size: 2.5rem; margin-bottom: 20px; color: var(--primary);">${project.title}</h2>
                        <span style="color: var(--secondary); font-family: 'JetBrains Mono', monospace;">${project.year}</span>
                        <p style="font-size: 1.2rem; margin: 30px 0; line-height: 1.7;">${project.description}</p>
                        <p style="margin-bottom: 40px; line-height: 1.6; color: var(--secondary);">${project.details}</p>
                        <div>
                            <h3 style="margin-bottom: 20px; color: var(--primary);">Technologies</h3>
                            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                                ${project.technologies.map(tech => `
                                    <span style="background: rgba(255,255,255,0.1); padding: 8px 16px; border-radius: 20px; font-size: 0.9rem; border: 1px solid var(--primary);">${tech}</span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
                
                modal.classList.add('active');
            }
        });
    });
    
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Theme switcher
function initThemeSwitcher() {
    const themeOptions = document.querySelectorAll('.theme-option');
    
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            switchTheme(theme);
        });
    });
}

function switchTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    currentTheme = theme;
    
    // Update particle colors based on theme
    if (particles) {
        const colors = particles.geometry.attributes.color.array;
        for (let i = 0; i < colors.length; i += 3) {
            switch (theme) {
                case 'cyber':
                    colors[i] = 0;     // R
                    colors[i + 1] = 1; // G
                    colors[i + 2] = 0.5; // B
                    break;
                case 'vapor':
                    colors[i] = 1;     // R
                    colors[i + 1] = 0.4; // G
                    colors[i + 2] = 0.6; // B
                    break;
                case 'minimal':
                    colors[i] = 1;     // R
                    colors[i + 1] = 1; // G
                    colors[i + 2] = 1; // B
                    break;
            }
        }
        particles.geometry.attributes.color.needsUpdate = true;
    }
}

// Text animations
function animateHeroText() {
    const letters = document.querySelectorAll('.main-title .glitch-text');
    
    gsap.fromTo(letters, 
        { 
            y: 100, 
            opacity: 0,
            rotationX: -90
        },
        { 
            y: 0, 
            opacity: 1,
            rotationX: 0,
            duration: 1,
            stagger: 0.2,
            ease: "back.out(1.7)"
        }
    );
    
    // Animate subtitle
    gsap.fromTo('.hero-subtitle', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.5 }
    );
    
    // Animate buttons
    gsap.fromTo('.hero-actions .cta-button', 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.8, stagger: 0.2 }
    );
}

function animateRevealText() {
    const revealTexts = document.querySelectorAll('.reveal-text');
    
    revealTexts.forEach((text, index) => {
        gsap.fromTo(text,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, delay: index * 0.2 }
        );
    });
}

// Typing effect for hero subtitle
function initTypingEffect() {
    const text = "Frontend & App Developer";
    const typingElement = document.querySelector('.typing-text');
    let index = 0;
    
    function type() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }
    
    // Clear text and start typing
    typingElement.textContent = '';
    setTimeout(type, 1000);
}

// Initialize typing effect after hero animation
setTimeout(() => {
    initTypingEffect();
}, 2000);
