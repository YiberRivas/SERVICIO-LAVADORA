import React, { useState, useEffect } from 'react';
import '../assets/Inicio.css';


const Inicio = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Función para redirigir al login
  const redirectToLogin = () => {
    window.location.href = '/login';
  };

  // Efecto para manejar el scroll del header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Animación de elementos al hacer scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeInOnScroll = () => {
      fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', fadeInOnScroll);
    
    // Ejecutar una vez al cargar la página
    fadeInOnScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', fadeInOnScroll);
    };
  }, []);

  // Datos de las lavadoras
  const washers = [
    {
      id: 1,
      name: "LG WashTower Premium",
      status: "available",
      description: "Lavadora de carga frontal de alta eficiencia con tecnología AI DD y control inteligente.",
      location: "Centro Comercial Santafé - Bogotá",
      capacity: "12 kg",
      price: "$3.000 / hora",
      image: "https://www.pngfind.com/pngs/m/464-4649661_lavadora-semiautomatica-12-kg-midea-hd-png-download.png"
      

    },
    {
      id: 2,
      name: "Samsung EcoBubble Max",
      status: "available",
      description: "Lavadora industrial con tecnología EcoBubble para una limpieza profunda y eficiente.",
      location: "Centro Comercial Titán Plaza - Bogotá",
      capacity: "15 kg",
      price: "$3.500 / hora",
      image: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Whirlpool Smart Load",
      status: "available",
      description: "Lavadora compacta ideal para apartamentos, con 12 programas de lavado automáticos.",
      location: "Centro Comercial Unicentro - Bogotá",
      capacity: "10 kg",
      price: "$2.500 / hora",
      image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Pasos del proceso
  const steps = [
    {
      number: 1,
      title: "Regístrate",
      description: "Crea tu cuenta en menos de 2 minutos y accede a todas nuestras lavadoras."
    },
    {
      number: 2,
      title: "Selecciona",
      description: "Elige la lavadora que necesitas y el tiempo de alquiler (hasta 4 horas)."
    },
    {
      number: 3,
      title: "Paga",
      description: "Realiza el pago seguro en línea ($3.000 por hora)."
    },
    {
      number: 4,
      title: "Disfruta",
      description: "Recoge tu lavadora en la ubicación seleccionada y disfruta de ropa limpia."
    }
  ];

  // Beneficios
  const benefits = [
    {
      icon: "fas fa-clock",
      title: "Ahorro de Tiempo",
      description: "No pierdas tiempo en lavanderías. Alquila una lavadora cuando la necesites."
    },
    {
      icon: "fas fa-dollar-sign",
      title: "Precios Accesibles",
      description: "Solo pagas por el tiempo que usas, sin costos ocultos ni contratos largos."
    },
    {
      icon: "fas fa-shield-alt",
      title: "Lavadoras de Calidad",
      description: "Todas nuestras lavadoras son de marcas reconocidas y están en perfecto estado."
    },
    {
      icon: "fas fa-map-marker-alt",
      title: "Múltiples Ubicaciones",
      description: "Encuentra lavadoras disponibles en diferentes puntos de la ciudad."
    }
  ];

  // Testimonios
  const testimonials = [
    {
      content: "Excelente servicio. La lavadora llegó a tiempo y funcionó perfectamente. Definitivamente volveré a usar Servilavadora.",
      name: "María González",
      role: "Cliente desde 2023",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      content: "Perfecto para cuando necesitas lavar mucha ropa de una vez. El proceso de alquiler es muy sencillo y rápido.",
      name: "Carlos Rodríguez",
      role: "Cliente desde 2024",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      content: "Me encanta la flexibilidad de poder alquilar por horas. Es mucho más económico que las lavanderías tradicionales.",
      name: "Ana Martínez",
      role: "Cliente desde 2023",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  return (
    <div className="Inicio">
      {/* Header */}
      <header id="header" className={isScrolled ? 'scrolled' : ''}>
        <div className="container">
          <nav className="navbar">
            <a href="/" className="logo">
              <div className="logo-icon">
                <i className="fas fa-tint"></i>
              </div>
              Servilavadora
            </a>
            <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
              <a href="/login">Iniciar Sesión</a>
              <a href="/registro" className="btn btn-primary">Registrarse</a>
            </div>
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="inicio">
        {/* Figuras decorativas */}
        <div className="shape circle" style={{width: '100px', height: '100px', background: 'rgba(255, 214, 102, 0.2)', top: '20%', left: '5%', animation: 'float 5s ease-in-out infinite'}}></div>
        <div className="shape triangle" style={{borderWidth: '0 50px 86.6px 50px', borderColor: 'transparent transparent rgba(255, 107, 107, 0.15) transparent', top: '70%', right: '10%', animation: 'float 7s ease-in-out infinite reverse'}}></div>
        <div className="shape square" style={{width: '80px', height: '80px', background: 'rgba(0, 198, 179, 0.1)', bottom: '10%', left: '15%', transform: 'rotate(45deg)', animation: 'pulse 4s ease-in-out infinite'}}></div>
        
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <i className="fas fa-star"></i>
              Servicio confiable de alquiler de lavadoras
            </div>
            <h1>Alquiler de Lavadoras <span className="gradient-text">Fácil y Rápido</span></h1>
            <p>Alquila lavadoras de alta calidad por horas. Perfecto para tu hogar, negocio o eventos especiales. Solo $3.000 por hora, máximo 4 horas.</p>
            <div className="hero-actions">
              <a href="#lavadoras" className="btn btn-primary">Explorar Lavadoras</a>
              <a href="/registro" className="btn btn-outline">Comenzar Ahora</a>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="Lavadoras modernas" 
            />
          </div>
        </div>
      </section>

      {/* Lavadoras Disponibles */}
      <section id="lavadoras" className="bg-light">
        {/* Figuras decorativas */}
        <div className="shape circle" style={{width: '150px', height: '150px', background: 'rgba(255, 107, 107, 0.1)', top: '10%', right: '5%', animation: 'float 8s ease-in-out infinite'}}></div>
        <div className="shape square" style={{width: '60px', height: '60px', background: 'rgba(255, 214, 102, 0.15)', bottom: '20%', left: '8%', transform: 'rotate(15deg)', animation: 'pulse 3s ease-in-out infinite'}}></div>
        
        <div className="container">
          <div className="section-title">
            <h2>Lavadoras Disponibles</h2>
            <p>Descubre nuestras lavadoras de alta calidad listas para alquilar</p>
          </div>
          <div className="washers-grid">
            {washers.map(washer => (
              <div key={washer.id} className="washer-card fade-in">
                <img src={washer.image} alt={washer.name} className="washer-image" />
                <div className="washer-content">
                  <div className="washer-header">
                    <h3 className="washer-name">{washer.name}</h3>
                    <span className={`washer-status status-${washer.status}`}>
                      {washer.status === 'available' ? 'Disponible' : 'No disponible'}
                    </span>
                  </div>
                  <p className="washer-description">{washer.description}</p>
                  <div className="washer-details">
                    <div className="detail-item">
                      <i className="fas fa-map-marker-alt"></i>
                      {washer.location}
                    </div>
                    <div className="detail-item">
                      <i className="fas fa-weight"></i>
                      Capacidad: {washer.capacity}
                    </div>
                    <div className="detail-item price">
                      <i className="fas fa-dollar-sign"></i>
                      {washer.price}
                    </div>
                  </div>
                  <button 
                    className="btn btn-primary" 
                    style={{width: '100%'}} 
                    onClick={redirectToLogin}
                  >
                    Iniciar Sesión para Alquilar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo Funciona */}
      <section id="como-funciona" className="bg-white">
        {/* Figuras decorativas */}
        <div className="shape circle" style={{width: '120px', height: '120px', background: 'rgba(0, 198, 179, 0.1)', top: '15%', left: '5%', animation: 'float 6s ease-in-out infinite reverse'}}></div>
        <div className="shape triangle" style={{borderWidth: '0 40px 69.3px 40px', borderColor: 'transparent transparent rgba(255, 214, 102, 0.15) transparent', bottom: '10%', right: '8%', animation: 'pulse 5s ease-in-out infinite'}}></div>
        
        <div className="container">
          <div className="section-title">
            <h2>¿Cómo Funciona?</h2>
            <p>Alquilar una lavadora nunca fue tan fácil</p>
          </div>
          <div className="steps-container">
            {steps.map(step => (
              <div key={step.number} className="step fade-in">
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section id="beneficios" className="benefits-section">
        <div className="container">
          <div className="section-title">
            <h2>Beneficios de Nuestro Servicio</h2>
            <p>Descubre por qué miles de clientes confían en nosotros</p>
          </div>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card fade-in">
                <div className="benefit-icon">
                  <i className={benefit.icon}></i>
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="testimonials">
        <div className="container">
          <div className="section-title">
            <h2>Lo que Dicen Nuestros Clientes</h2>
            <p>Experiencias reales de usuarios satisfechos</p>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card fade-in">
                <div className="testimonial-content">
                  "{testimonial.content}"
                </div>
                <div className="testimonial-author">
                  <img src={testimonial.avatar} alt={testimonial.name} className="testimonial-avatar" />
                  <div className="testimonial-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <i className="fas fa-tint"></i>
              Servilavadora
            </div>
            <p>Tu servicio confiable de alquiler de lavadoras</p>
            <div className="footer-links">
              <a href="#inicio">Inicio</a>
              <a href="#lavadoras">Lavadoras</a>
              <a href="#como-funciona">Cómo Funciona</a>
              <a href="#beneficios">Beneficios</a>
              <a href="/login">Iniciar Sesión</a>
              <a href="/registro">Registrarse</a>
            </div>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <div className="copyright">
              © 2025 Servilavadora. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Inicio;