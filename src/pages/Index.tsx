
import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Twitter, Download, ExternalLink, Eye, Code, FileText, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const fullText = "FRONT END & APP DEVELOPER";

  // Particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.fill();

        // Draw connections
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Typing effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const skills = [
    { name: 'HTML', level: 95, icon: '🌐', description: 'Over a year of experience with HTML structure, tags, and attributes' },
    { name: 'CSS', level: 90, icon: '🎨', description: 'Strong interest in styling and enhancing visuals for engaging UI/UX' },
    { name: 'JavaScript', level: 75, icon: '⚡', description: 'Recently started learning with enthusiasm to expand programming skills' },
    { name: 'Android/Kotlin', level: 85, icon: '📱', description: 'Developing Android apps with Kotlin in Android Studio' },
    { name: 'Python', level: 88, icon: '🐍', description: '2 years of experience developing various projects' },
  ];

  const projects = [
    {
      title: 'Masat Al Nahar',
      description: 'A modern restaurant website with online ordering system and menu management',
      image: '/placeholder.svg',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Figma'],
      links: { design: '#', demo: '#' }
    },
    {
      title: 'Cybertronic Website',
      description: 'Full-stack e-commerce platform with user authentication and product management',
      image: '/placeholder.svg',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      links: { site: '#', code: '#' }
    },
    {
      title: 'TIME Magazine Clone',
      description: 'Responsive magazine website with dynamic content loading and modern layout',
      image: '/placeholder.svg',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'REST API'],
      links: { demo: '#', code: '#' }
    },
    {
      title: 'Fix My Ride',
      description: 'Mobile app for car service booking and maintenance tracking',
      image: '/placeholder.svg',
      tech: ['Kotlin', 'Android SDK', 'Firebase', 'Material UI'],
      links: { design: '#', code: '#' }
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'transparent' }}
      />

      {/* Mouse Follower */}
      <div
        className="fixed pointer-events-none z-10 w-6 h-6 bg-blue-500 rounded-full opacity-50 transition-all duration-75 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
        }}
      />

      {/* Content */}
      <div className="relative z-20">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-fade-in">
              <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
                ASIF YOUSAF
              </h1>
              <div className="h-16 flex items-center justify-center">
                <h2 className="text-2xl md:text-4xl text-white font-light">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </h2>
              </div>
              <p className="text-xl text-gray-300 mt-8 mb-12 max-w-2xl mx-auto leading-relaxed">
                Crafting beautiful digital experiences with modern technologies and innovative solutions
              </p>
              <div className="flex gap-4 justify-center">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
                  <Mail className="mr-2 h-4 w-4" />
                  Get in Touch
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-center text-white mb-16">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Expertise</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skill, index) => (
                <Card key={skill.name} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{skill.name}</h3>
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{skill.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-center text-white mb-16">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Projects</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <Card key={project.title} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl group overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white text-xs rounded-full border border-blue-400/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {Object.entries(project.links).map(([type, url]) => (
                        <Button
                          key={type}
                          size="sm"
                          variant="outline"
                          className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-all duration-300"
                        >
                          {type === 'demo' || type === 'site' ? <ExternalLink className="mr-1 h-3 w-3" /> : 
                           type === 'code' ? <Code className="mr-1 h-3 w-3" /> : 
                           <Eye className="mr-1 h-3 w-3" />}
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">In Touch</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Feel free to reach out to me for collaboration or any inquiries
            </p>
            
            <div className="flex justify-center gap-6 mb-12">
              {[
                { icon: Linkedin, label: 'LinkedIn', href: '#' },
                { icon: Github, label: 'GitHub', href: '#' },
                { icon: Twitter, label: 'Twitter', href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="w-16 h-16 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 hover:shadow-xl group"
                >
                  <Icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                </a>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6">Dev_Asif</h3>
              <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>asif@example.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+92 XXX XXXXXXX</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Pakistan</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-gray-400 border-t border-white/10">
          <p>&copy; 2024 Asif Yousaf. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
