import { useState, useEffect, useRef } from 'react';
import profilePic from './assets/images/Untitled design (3).jpg';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(null); // 'success', 'error', etc.

  // Handle active navigation item based on page scroll
  useEffect(() => {
    const handleScroll = () => {
      // Scroll state for header styling toggle
      setIsScrolled(window.scrollY > 50);

      // Section tracking logic
      const sections = ['hero', 'about', 'education', 'skills', 'projects', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle tilt and mouse tracking inside card elements (3D glow effect)
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleFormChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setFormStatus('error');
      return;
    }
    // Simulate successful form dispatch
    setFormStatus('success');
    setFormState({ name: '', email: '', message: '' });

    // Clear display status after 4 seconds
    setTimeout(() => {
      setFormStatus(null);
    }, 4000);
  };

  // Smooth scroll helper
  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Navigation Header */}
      <header className={isScrolled ? 'scrolled' : ''}>
        <div className="container nav-container">
          <a href="#hero" className="logo-text" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
            Raza.Dev
          </a>

          {/* Navigation Links */}
          <nav className={mobileMenuOpen ? 'open' : ''}>
            <ul>
              <li>
                <a
                  href="#hero"
                  className={activeSection === 'hero' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className={activeSection === 'about' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); scrollTo('about'); }}
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#education"
                  className={activeSection === 'education' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); scrollTo('education'); }}
                >
                  Education
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className={activeSection === 'skills' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); scrollTo('skills'); }}
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className={activeSection === 'projects' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); scrollTo('projects'); }}
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className={activeSection === 'contact' ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Toggle Menu Button for Mobile View */}
          <button
            className="menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero">
        <div className="container hero-wrapper">
          <div className="hero-content">
            <div className="hero-tag">
              <span></span> Available for exciting project collabs
            </div>

            <h1 className="hero-title">
              Hi, I'm <span>Raza Ullah</span>
            </h1>

            <h2 className="hero-subtitle">
              Frontend Developer | React Learner | BS Computer Science Student
            </h2>

            <p className="hero-desc">
              I am a passionate Computer Science student studying at the University of Peshawar.
              I design and build responsive, user-friendly web interfaces and continuously challenge
              myself with modern frontend frameworks and clean coding patterns.
            </p>

            <div className="hero-buttons">
              <button onClick={() => scrollTo('projects')} className="btn btn-primary">
                View My Projects
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
              <button onClick={() => scrollTo('contact')} className="btn btn-secondary">
                Let's Talk
              </button>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <div className="hero-circle-accent"></div>
            <div className="hero-ring-orbit"></div>
            <div className="hero-avatar-frame">
              <img
                src={profilePic}
                alt="Raza Ullah"
                className="hero-photo"
              />
            </div>

            {/* Floating Tech Badges */}
            <div className="floating-badge badge-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#61dbfb' }}>
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                <path d="M12 2a15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1 4-10 15.3 15.3 0 0 1-4-10z" transform="rotate(60 12 12)"></path>
                <path d="M12 2a15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1 4-10 15.3 15.3 0 0 1-4-10z" transform="rotate(120 12 12)"></path>
              </svg>
              <span>React</span>
            </div>

            <div className="floating-badge badge-2">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f0db4f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 4V2M15 22v-2M8 15h8M8 9h8"></path>
                <rect x="5" y="4" width="14" height="14" rx="2"></rect>
              </svg>
              <span>JS</span>
            </div>

            <div className="floating-badge badge-3">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5"></path>
              </svg>
              <span>BSCS</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="container">
          <div className="section-head">
            <span className="section-subtitle">Get to know me</span>
            <h2 className="section-title">About Me</h2>
          </div>

          <div className="about-grid">
            <div className="about-left">
              <div
                className="glass-card about-summary-card"
                onMouseMove={handleMouseMove}
              >
                <h3 className="about-title">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-purple)' }}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  My Journey & Goal
                </h3>
                <p className="about-text">
                  I am currently pursuing a Bachelor of Science in Computer Science at the University of Peshawar.
                  My fascination with how code turns ideas into functional, interactive visual layouts led me to frontend web development.
                </p>
                <p className="about-text">
                  My ultimate goal is to evolve into a proficient React and Full Stack Developer.
                  I thrive on solving logic problems, optimization, shaping user interfaces, and turning design mockups into pixel-perfect reality.
                </p>
              </div>
            </div>

            <div className="about-stats-wrapper">
              <div className="about-stats">
                <div className="stat-item glass-card" onMouseMove={handleMouseMove}>
                  <div className="stat-number">3rd</div>
                  <div className="stat-label">Semester (BSCS)</div>
                </div>
                <div className="stat-item glass-card" onMouseMove={handleMouseMove}>
                  <div className="stat-number">8+</div>
                  <div className="stat-label">Skills Acquired</div>
                </div>
                <div className="stat-item glass-card" onMouseMove={handleMouseMove}>
                  <div className="stat-number">3+</div>
                  <div className="stat-label">Completed Projects</div>
                </div>
                <div className="stat-item glass-card" onMouseMove={handleMouseMove}>
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Responsive Designs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Hobbies Section */}
      <section id="education">
        <div className="container">
          <div className="section-head">
            <span className="section-subtitle">Studies & Interests</span>
            <h2 className="section-title">Education & Hobbies</h2>
          </div>

          <div className="edu-hobby-grid">
            {/* Education Sub-Section */}
            <div className="glass-card" onMouseMove={handleMouseMove}>
              <h3 className="about-title" style={{ marginBottom: '2rem' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-purple)' }}>
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                </svg>
                Academic Background
              </h3>

              <div className="edu-timeline">
                <div className="edu-item">
                  <div className="edu-dot"></div>
                  <span className="edu-year">2024 - Present</span>
                  <h4 className="edu-degree">Bachelor of Science in Computer Science</h4>
                  <p className="edu-univ">University of Peshawar, Pakistan</p>
                  <span className="edu-status">Current Semester: 3rd</span>
                </div>
              </div>
            </div>

            {/* Hobbies Sub-Section */}
            <div className="glass-card" onMouseMove={handleMouseMove}>
              <h3 className="about-title" style={{ marginBottom: '1.5rem' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-purple)' }}>
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                </svg>
                My Core Hobbies
              </h3>

              <p className="about-text" style={{ fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Beyond studying, engaging with different hobbies keeps my mind active and creative.
              </p>

              <div className="hobby-grid">
                <div className="hobby-card">
                  <div className="hobby-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                  </div>
                  <span className="hobby-name">Coding</span>
                </div>

                <div className="hobby-card">
                  <div className="hobby-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </div>
                  <span className="hobby-name">New Tech</span>
                </div>

                <div className="hobby-card">
                  <div className="hobby-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      <path d="M2 12h20"></path>
                    </svg>
                  </div>
                  <span className="hobby-name">Design</span>
                </div>

                <div className="hobby-card">
                  <div className="hobby-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M6 12c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6-6-2.7-6-6z"></path>
                    </svg>
                  </div>
                  <span className="hobby-name">Cricket</span>
                </div>

                <div className="hobby-card">
                  <div className="hobby-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a10 10 0 0 0-3.5 19.38V14c0-.83.67-1.5 1.5-1.5h4c.83 0 1.5.67 1.5 1.5v7.38A10 10 0 0 0 12 2z"></path>
                      <path d="M12 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path>
                    </svg>
                  </div>
                  <span className="hobby-name">Gardening</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills">
        <div className="container">
          <div className="section-head">
            <span className="section-subtitle">What I build with</span>
            <h2 className="section-title">My Skillset</h2>
          </div>

          <div className="skills-grid">
            {/* HTML5 */}
            <div className="glass-card skill-card" onMouseMove={handleMouseMove}>
              <div className="skill-info">
                <div className="skill-icon-wrapper" style={{ color: '#f06529' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                </div>
                <div className="skill-name">HTML5</div>
              </div>
              <div className="skill-bar-container">
                <div className="skill-bar-header">
                  <span>Proficiency</span>
                  <span>95%</span>
                </div>
                <div className="skill-progress-bar">
                  <div className="skill-progress-fill" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>

            {/* CSS3 */}
            <div className="glass-card skill-card" onMouseMove={handleMouseMove}>
              <div className="skill-info">
                <div className="skill-icon-wrapper" style={{ color: '#2965f1' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>
                <div className="skill-name">CSS3</div>
              </div>
              <div className="skill-bar-container">
                <div className="skill-bar-header">
                  <span>Proficiency</span>
                  <span>90%</span>
                </div>
                <div className="skill-progress-bar">
                  <div className="skill-progress-fill" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>

            {/* JavaScript */}
            <div className="glass-card skill-card" onMouseMove={handleMouseMove}>
              <div className="skill-info">
                <div className="skill-icon-wrapper" style={{ color: '#f0db4f' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 4V2M15 22v-2M8 15h8M8 9h8"></path>
                    <rect x="5" y="4" width="14" height="14" rx="2"></rect>
                  </svg>
                </div>
                <div className="skill-name">JavaScript</div>
              </div>
              <div className="skill-bar-container">
                <div className="skill-bar-header">
                  <span>Proficiency</span>
                  <span>85%</span>
                </div>
                <div className="skill-progress-bar">
                  <div className="skill-progress-fill" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>

            {/* React.js */}
            <div className="glass-card skill-card" onMouseMove={handleMouseMove}>
              <div className="skill-info">
                <div className="skill-icon-wrapper" style={{ color: '#61dbfb' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    <path d="M12 2a15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1 4-10 15.3 15.3 0 0 1-4-10z" transform="rotate(60 12 12)"></path>
                    <path d="M12 2a15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1 4-10 15.3 15.3 0 0 1-4-10z" transform="rotate(120 12 12)"></path>
                  </svg>
                </div>
                <div className="skill-name">React.js</div>
              </div>
              <div className="skill-bar-container">
                <div className="skill-bar-header">
                  <span>Proficiency</span>
                  <span>75%</span>
                </div>
                <div className="skill-progress-bar">
                  <div className="skill-progress-fill" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>

            {/* Git */}
            <div className="glass-card skill-card" onMouseMove={handleMouseMove}>
              <div className="skill-info">
                <div className="skill-icon-wrapper" style={{ color: '#f1502f' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="18" r="3"></circle>
                    <circle cx="6" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <line x1="6" y1="9" x2="6" y2="15"></line>
                    <path d="M18 15V9a4 4 0 0 0-4-4h-5"></path>
                  </svg>
                </div>
                <div className="skill-name">Git</div>
              </div>
              <div className="skill-bar-container">
                <div className="skill-bar-header">
                  <span>Proficiency</span>
                  <span>80%</span>
                </div>
                <div className="skill-progress-bar">
                  <div className="skill-progress-fill" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>

            {/* GitHub */}
            <div className="glass-card skill-card" onMouseMove={handleMouseMove}>
              <div className="skill-info">
                <div className="skill-icon-wrapper" style={{ color: '#fff' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </div>
                <div className="skill-name">GitHub</div>
              </div>
              <div className="skill-bar-container">
                <div className="skill-bar-header">
                  <span>Proficiency</span>
                  <span>85%</span>
                </div>
                <div className="skill-progress-bar">
                  <div className="skill-progress-fill" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>

            {/* Responsive Design */}
            <div className="glass-card skill-card" onMouseMove={handleMouseMove}>
              <div className="skill-info">
                <div className="skill-icon-wrapper" style={{ color: '#a855f7' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                  </svg>
                </div>
                <div className="skill-name">Responsive Design</div>
              </div>
              <div className="skill-bar-container">
                <div className="skill-bar-header">
                  <span>Proficiency</span>
                  <span>90%</span>
                </div>
                <div className="skill-progress-bar">
                  <div className="skill-progress-fill" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>

            {/* Graphic Designing */}
            <div className="glass-card skill-card" onMouseMove={handleMouseMove}>
              <div className="skill-info">
                <div className="skill-icon-wrapper" style={{ color: '#d946ef' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path>
                    <path d="M12 8C14.2091 8 16 6.20914 16 4C16 1.79086 14.2091 0 12 0C9.79086 0 8 1.79086 8 4C8 6.20914 9.79086 8 12 8Z" transform="translate(0 6)"></path>
                  </svg>
                </div>
                <div className="skill-name">Graphic Designing</div>
              </div>
              <div className="skill-bar-container">
                <div className="skill-bar-header">
                  <span>Proficiency</span>
                  <span>80%</span>
                </div>
                <div className="skill-progress-bar">
                  <div className="skill-progress-fill" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <div className="container">
          <div className="section-head">
            <span className="section-subtitle">Showcasing my work</span>
            <h2 className="section-title">My Top Projects</h2>
          </div>

          <div className="projects-grid">
            {/* Project 1: Personal Portfolio Website */}
            <div className="glass-card project-card" onMouseMove={handleMouseMove}>
              <div className="project-preview">
                <div className="project-icon-top">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div className="project-preview-mock">
                  <div className="mock-header">
                    <div className="mock-dot" style={{ backgroundColor: '#ef4444' }}></div>
                    <div className="mock-dot" style={{ backgroundColor: '#eab308' }}></div>
                    <div className="mock-dot" style={{ backgroundColor: '#22c55e' }}></div>
                  </div>
                  <div className="mock-content" style={{ textShadow: '0 0 8px rgba(139,92,246, 0.4)' }}>
                    Raza.Dev Portfolio Demo
                  </div>
                </div>
              </div>

              <div className="project-details">
                <h3 className="project-title">Personal Portfolio Website</h3>
                <p className="project-desc">
                  A high-end, responsive portfolio website illustrating my background details,
                  education, skill levels, and projects. Optimized with glassmorphism sheets, CSS glow spotlights,
                  and interactive client states.
                </p>
                <div className="project-links">
                  <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    Code
                  </a>
                  <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Live Demo
                  </a>
                </div>
              </div>
            </div>

            {/* Project 2: Restaurant Website */}
            <div className="glass-card project-card" onMouseMove={handleMouseMove}>
              <div className="project-preview">
                <div className="project-icon-top">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div className="project-preview-mock">
                  <div className="mock-header">
                    <div className="mock-dot" style={{ backgroundColor: '#ef4444' }}></div>
                    <div className="mock-dot" style={{ backgroundColor: '#eab308' }}></div>
                    <div className="mock-dot" style={{ backgroundColor: '#22c55e' }}></div>
                  </div>
                  <div className="mock-content" style={{ textShadow: '0 0 8px rgba(59,130,246, 0.4)' }}>
                    🍕 Restaurant Menu & Booking
                  </div>
                </div>
              </div>

              <div className="project-details">
                <h3 className="project-title">Restaurant Website</h3>
                <p className="project-desc">
                  A modern restaurant landing page featuring dynamic menu filters, reservations booking,
                  and contact options. Programmed using semantic web layout practices with HTML5, CSS3, and JavaScript HMR.
                </p>
                <div className="project-links">
                  <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    Code
                  </a>
                  <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Live Demo
                  </a>
                </div>
              </div>
            </div>

            {/* Project 3: Student Dashboard */}
            <div className="glass-card project-card" onMouseMove={handleMouseMove}>
              <div className="project-preview">
                <div className="project-icon-top">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div className="project-preview-mock">
                  <div className="mock-header">
                    <div className="mock-dot" style={{ backgroundColor: '#ef4444' }}></div>
                    <div className="mock-dot" style={{ backgroundColor: '#eab308' }}></div>
                    <div className="mock-dot" style={{ backgroundColor: '#22c55e' }}></div>
                  </div>
                  <div className="mock-content" style={{ textShadow: '0 0 8px rgba(217,70,239, 0.4)' }}>
                    📊 GPA & Course Analytics
                  </div>
                </div>
              </div>

              <div className="project-details">
                <h3 className="project-title">Student Dashboard</h3>
                <p className="project-desc">
                  An adaptive administrator and student dashboard application interface.
                  Developed in React using component-driven structures to render schedules, GPA analytics, and exam updates.
                </p>
                <div className="project-links">
                  <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    Code
                  </a>
                  <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Live Demo
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="container">
          <div className="section-head">
            <span className="section-subtitle">Reach out</span>
            <h2 className="section-title">Contact Me</h2>
          </div>

          <div className="contact-grid">
            {/* Direct Contact details */}
            <div className="contact-info-listColor">
              <div style={{ marginBottom: '2rem' }}>
                <h3 className="about-title" style={{ marginBottom: '1rem' }}>Get In Touch</h3>
                <p className="about-text" style={{ fontSize: '0.95rem' }}>
                  I am always open to discussing new school projects, coding opportunities, frontend designs, or full-stack pathways. Feel free to contact me!
                </p>
              </div>

              <div className="contact-info-list" style={{ marginBottom: '2.5rem' }}>
                {/* Phone */}
                <div className="contact-item-card">
                  <div className="contact-icon-wrapper">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <div className="contact-label">Phone</div>
                    <div className="contact-value">+92 300 0000000</div>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-item-card">
                  <div className="contact-icon-wrapper">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <div className="contact-label">Email</div>
                    <div className="contact-value">your-email@example.com</div>
                  </div>
                </div>

                {/* Location */}
                <div className="contact-item-card">
                  <div className="contact-icon-wrapper">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <div className="contact-label">Location</div>
                    <div className="contact-value">Peshawar, Pakistan</div>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div>
                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontWeight: 600 }}>
                  Find Me On
                </h4>
                <div className="social-strip">
                  <a href="https://github.com/yourusername" className="social-circle-btn" target="_blank" rel="noreferrer" aria-label="GitHub">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                  <a href="https://linkedin.com/in/yourusername" className="social-circle-btn" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a href="https://facebook.com/yourusername" className="social-circle-btn" target="_blank" rel="noreferrer" aria-label="Facebook">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-card" onMouseMove={handleMouseMove}>
              <h3 className="about-title" style={{ marginBottom: '2rem' }}>Send A Message</h3>
              <form className="contact-form" onSubmit={handleFormSubmit}>
                <div className="form-group-row">
                  <div className="form-field">
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleFormChange}
                      placeholder="Your Name"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleFormChange}
                      placeholder="Your Email"
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleFormChange}
                    placeholder="Describe your project, ideas, or questions..."
                    className="form-textarea"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary form-submit-btn">
                  Send Message
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>

                {formStatus === 'success' && (
                  <div className="form-status-msg form-status-success">
                    ✓ Thank you! Your mock message was logged successfully.
                  </div>
                )}
                {formStatus === 'error' && (
                  <div className="form-status-msg" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#f87171' }}>
                    ✗ Please fill in all fields before sending.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container footer-wrapper">
          <div className="footer-logo-wrap">
            <div className="footer-title">Raza Ullah</div>
            <div className="footer-copyright">
              © {new Date().getFullYear()} Raza.Dev. All rights reserved.
            </div>
          </div>

          <button onClick={() => scrollTo('hero')} className="back-to-top" aria-label="Back to top">
            Back to top
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>
        </div>
      </footer>
    </>
  );
}

export default App;
