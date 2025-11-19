import React, { useState, useEffect, useRef } from 'react';

// Bootstrap CSS via CDN
if (typeof document !== 'undefined') {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
  document.head.appendChild(link);
}

const Hero = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [activeSection, setActiveSection] = useState('home');
  
  const featuresRef = useRef(null);
  const feedbackRef = useRef(null);
  const contactRef = useRef(null);

  // Logo SVG Component
  const NetVisionLogo = ({ className = "" }) => (
    <svg 
      className={className}
      width="40" 
      height="40" 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#0284c7', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path 
        d="M50 10 C30 10 15 25 15 45 C15 55 20 64 28 70 L35 60 C30 56 27 51 27 45 C27 31 37 21 50 21 C63 21 73 31 73 45 C73 51 70 56 65 60 L72 70 C80 64 85 55 85 45 C85 25 70 10 50 10 Z" 
        fill="url(#logoGradient)"
      />
      <circle cx="50" cy="75" r="8" fill="#0284c7" />
      <path 
        d="M50 35 C43 35 37 41 37 48 C37 55 43 61 50 61 C57 61 63 55 63 48 C63 41 57 35 50 35 Z M50 43 C53 43 55 45 55 48 C55 51 53 53 50 53 C47 53 45 51 45 48 C45 45 47 43 50 43 Z" 
        fill="#0ea5e9"
      />
    </svg>
  );

  // Intersection Observer for animations
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set(prev).add(entry.target.id));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '-50px'
    });

    const sections = [featuresRef.current, feedbackRef.current, contactRef.current];
    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // Scroll spy for active navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      if (featuresRef.current && scrollPosition >= featuresRef.current.offsetTop) {
        setActiveSection('features');
      } else if (feedbackRef.current && scrollPosition >= feedbackRef.current.offsetTop) {
        setActiveSection('feedback');
      } else if (contactRef.current && scrollPosition >= contactRef.current.offsetTop) {
        setActiveSection('contact');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: 'Hybrid Signal Analysis',
      description: 'Analyze network signals across multiple protocols and frequencies in real-time',
      icon: '📊',
      color: '#0ea5e9'
    },
    {
      title: 'Compass Navigation',
      description: 'Navigate complex network topologies with intelligent routing suggestions',
      icon: '🧭',
      color: '#10b981'
    },
    {
      title: 'Smart Suggestions',
      description: 'AI-powered recommendations for network optimization and troubleshooting',
      icon: '💡',
      color: '#f59e0b'
    },
    {
      title: 'Offline Mode',
      description: 'Continue working with cached data and sync when connection is restored',
      icon: '📱',
      color: '#8b5cf6'
    }
  ];

  const styles = `
    @keyframes fadeInScale {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(100px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }

    .logo-animate {
      animation: fadeInScale 0.8s ease-out;
    }

    .hero-image-animate {
      animation: slideInRight 1s ease-out 0.3s both;
    }

    .hero-content-animate {
      animation: slideUp 0.8s ease-out 0.1s both;
    }

    .feature-card-animate {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s ease-out;
    }

    .feature-card-visible {
      opacity: 1;
      transform: translateY(0);
    }

    .nav-link-custom {
      position: relative;
      color: #475569 !important;
      transition: all 0.3s ease;
      padding: 0.5rem 1rem !important;
    }

    .nav-link-custom:hover {
      color: #0ea5e9 !important;
      transform: translateY(-2px);
    }

    .nav-link-custom.active {
      color: #0ea5e9 !important;
    }

    .nav-link-custom.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 30px;
      height: 2px;
      background: #0ea5e9;
    }

    .btn-primary-custom {
      background: linear-gradient(135deg, #0ea5e9, #0284c7);
      border: none;
      padding: 12px 30px;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
    }

    .btn-primary-custom:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 6px 25px rgba(14, 165, 233, 0.4);
      background: linear-gradient(135deg, #0284c7, #0ea5e9);
    }

    .btn-outline-custom {
      border: 2px solid #0ea5e9;
      color: #0ea5e9;
      padding: 12px 30px;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .btn-outline-custom:hover {
      background: #0ea5e9;
      color: white;
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 6px 25px rgba(14, 165, 233, 0.3);
    }

    .feature-card {
      border: none;
      border-radius: 16px;
      padding: 30px;
      height: 100%;
      transition: all 0.3s ease;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      background: white;
    }

    .feature-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    }

    .feature-icon {
      width: 80px;
      height: 80px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      margin-bottom: 20px;
      transition: all 0.3s ease;
    }

    .feature-card:hover .feature-icon {
      transform: rotate(5deg) scale(1.1);
    }

    .modal-backdrop-custom {
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(5px);
    }

    .modal-content-custom {
      border-radius: 20px;
      border: none;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      animation: slideUp 0.3s ease-out;
    }

    .section-animate {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.8s ease-out;
    }

    .section-visible {
      opacity: 1;
      transform: translateY(0);
    }

    .navbar-custom {
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
    }

    .hero-section {
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      min-height: 100vh;
      position: relative;
      overflow: hidden;
    }

    .hero-section::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -10%;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%);
      border-radius: 50%;
      animation: pulse 4s ease-in-out infinite;
    }

    @media (max-width: 768px) {
      .hero-section::before {
        width: 400px;
        height: 400px;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white navbar-custom sticky-top">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <NetVisionLogo className="logo-animate me-2" />
            <span className="fw-bold fs-4" style={{ color: '#1e293b' }}>NetVision</span>
          </a>
          
          <button 
            className="navbar-toggler border-0"
            type="button"
            onClick={() => setIsNavbarOpen(!isNavbarOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a 
                  className={`nav-link nav-link-custom ${activeSection === 'features' ? 'active' : ''}`}
                  href="#features"
                >
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link nav-link-custom ${activeSection === 'feedback' ? 'active' : ''}`}
                  href="#feedback"
                >
                  Feedback
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link nav-link-custom ${activeSection === 'contact' ? 'active' : ''}`}
                  href="#contact"
                >
                  Contact
                </a>
              </li>
              <li className="nav-item ms-lg-3">
                <a className="btn btn-outline-custom btn-sm px-4" href="/signup">
                  Sign Up
                </a>
              </li>
              <li className="nav-item ms-2">
                <a className="btn btn-primary-custom btn-sm px-4" href="/login">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 hero-content-animate">
              <h1 className="display-4 fw-bold mb-4" style={{ color: '#1e293b' }}>
                NetVision - Network Analysis & Optimization Platform
              </h1>
              <p className="lead mb-5" style={{ color: '#475569' }}>
                Visualize, analyze, and optimize your network connectivity with real-time insights and actionable recommendations.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <a href="/signup" className="btn btn-primary-custom btn-lg">
                  Get Started
                </a>
                <button 
                  className="btn btn-outline-custom btn-lg"
                  onClick={() => setShowDemoModal(true)}
                >
                  Play Demo
                </button>
              </div>
            </div>
            <div className="col-lg-6 hero-image-animate">
              <div className="position-relative">
                <div 
                  className="bg-light rounded-4 p-5 shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #e0f2fe, #f0f9ff)',
                    minHeight: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div className="text-center">
                    <NetVisionLogo className="mb-4" style={{ width: '120px', height: '120px' }} />
                    <h3 className="text-muted">Network Dashboard</h3>
                    <p className="text-muted small">Real-time network visualization</p>
                    <div className="mt-4 d-flex justify-content-center gap-2">
                      <div className="bg-success rounded-circle" style={{ width: '12px', height: '12px' }}></div>
                      <div className="bg-warning rounded-circle" style={{ width: '12px', height: '12px' }}></div>
                      <div className="bg-danger rounded-circle" style={{ width: '12px', height: '12px' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features" 
        ref={featuresRef}
        className={`py-5 ${visibleSections.has('features') ? 'section-visible' : 'section-animate'}`}
        style={{ background: '#f8fafc' }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3" style={{ color: '#1e293b' }}>
              Core Platform Features
            </h2>
            <p className="lead" style={{ color: '#475569' }}>
              Everything you need to monitor and optimize your network infrastructure
            </p>
          </div>
          
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div 
                  className={`feature-card ${visibleSections.has('features') ? 'feature-card-visible' : 'feature-card-animate'}`}
                  style={{ 
                    transitionDelay: `${index * 0.1}s`
                  }}
                >
                  <div 
                    className="feature-icon"
                    style={{ background: `${feature.color}20` }}
                  >
                    <span>{feature.icon}</span>
                  </div>
                  <h4 className="mb-3" style={{ color: '#1e293b' }}>
                    {feature.title}
                  </h4>
                  <p className="text-muted">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section 
        id="feedback" 
        ref={feedbackRef}
        className={`py-5 ${visibleSections.has('feedback') ? 'section-visible' : 'section-animate'}`}
      >
        <div className="container">
          <div className="text-center">
            <h2 className="display-5 fw-bold mb-3" style={{ color: '#1e293b' }}>
              Customer Feedback
            </h2>
            <p className="lead" style={{ color: '#475569' }}>
              See what our users are saying about NetVision
            </p>
            <div className="row mt-5">
              <div className="col-md-8 mx-auto">
                <div className="card border-0 shadow-lg rounded-4 p-4">
                  <div className="card-body">
                    <p className="fs-5 mb-4" style={{ color: '#475569' }}>
                      "NetVision has revolutionized how we monitor and optimize our network infrastructure. The real-time insights are invaluable."
                    </p>
                    <div className="d-flex align-items-center justify-content-center">
                      <div className="bg-primary rounded-circle me-3" style={{ width: '50px', height: '50px' }}></div>
                      <div className="text-start">
                        <h6 className="mb-0">John Doe</h6>
                        <small className="text-muted">Network Administrator</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        ref={contactRef}
        className={`py-5 ${visibleSections.has('contact') ? 'section-visible' : 'section-animate'}`}
        style={{ background: '#f8fafc' }}
      >
        <div className="container">
          <div className="text-center">
            <h2 className="display-5 fw-bold mb-3" style={{ color: '#1e293b' }}>
              Get In Touch
            </h2>
            <p className="lead mb-5" style={{ color: '#475569' }}>
              Have questions? We'd love to hear from you.
            </p>
            <button className="btn btn-primary-custom btn-lg">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Demo Modal */}
      {showDemoModal && (
        <>
          <div 
            className="modal-backdrop-custom position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ zIndex: 1050 }}
            onClick={() => setShowDemoModal(false)}
          >
            <div 
              className="modal-content-custom bg-white p-5 rounded-4"
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '600px', width: '90%' }}
            >
              <div className="text-center">
                <NetVisionLogo className="mb-4" style={{ width: '80px', height: '80px' }} />
                <h3 className="mb-3">Interactive Demo</h3>
                <p className="text-muted mb-4">
                  Experience the power of NetVision with our interactive demo. Explore real-time network monitoring, analysis tools, and optimization features.
                </p>
                <div className="bg-light rounded-3 p-5 mb-4">
                  <div className="spinner-border text-primary mb-3" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="text-muted small mb-0">Demo loading...</p>
                </div>
                <button 
                  className="btn btn-secondary"
                  onClick={() => setShowDemoModal(false)}
                >
                  Close Demo
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Hero;