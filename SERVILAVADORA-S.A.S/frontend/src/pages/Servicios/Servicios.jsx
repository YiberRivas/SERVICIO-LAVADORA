import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import "../Home/Home.css";
import "./Servicios.css";

const Servicios = () => {
    useEffect(() => {
        // Animación para las tarjetas al hacer scroll
        const cards = document.querySelectorAll('.service-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    const services = [
        {
            id: 1,
            name: "Lavadora Familiar 10kg",
            description: "Ideal para familias de 4-5 personas. Tecnología inverter y 15 programas de lavado.",
            price: "$89/mes",
            originalPrice: "$109/mes",
            features: ["Hasta 5 personas", "A+++ eficiencia", "15 programas"],
            image: "/src/assets/lavadora-familiar.jpg",
            badge: "MÁS POPULAR",
            type: "standard"
        },
        {
            id: 2,
            name: "Lavadora Compacta 8kg",
            description: "Perfecta para apartamentos pequeños o personas solas. Bajo consumo energético.",
            price: "$59/mes",
            originalPrice: "$79/mes",
            features: ["1-2 personas", "A++ eficiencia", "Diseño compacto"],
            image: "/src/assets/lavadora-compacta.jpg",
            badge: "ECONÓMICA",
            type: "compact"
        },
        {
            id: 3,
            name: "Lavadora Premium 12kg",
            description: "Máxima tecnología con control inteligente y conexión WiFi. Lavado perfecto garantizado.",
            price: "$129/mes",
            originalPrice: "$159/mes",
            features: ["Control WiFi", "Inteligente", "Tecnología premium"],
            image: "/src/assets/lavadora-premium.jpg",
            badge: "PREMIUM",
            type: "premium"
        },
        {
            id: 4,
            name: "Lavadora Industrial 15kg",
            description: "Para grandes volúmenes de ropa. Ideal para negocios o familias numerosas.",
            price: "$199/mes",
            originalPrice: "$249/mes",
            features: ["Capacidad industrial", "Alta durabilidad", "Uso intensivo"],
            image: "/src/assets/lavadora-industrial.jpg",
            badge: "PROFESIONAL",
            type: "industrial"
        },
        {
            id: 5,
            name: "Lavadora Ecológica 9kg",
            description: "Máximo ahorro de agua y energía. Tecnología eco-friendly y materiales sostenibles.",
            price: "$99/mes",
            originalPrice: "$119/mes",
            features: ["Eco-friendly", "Bajo consumo", "Materiales sostenibles"],
            image: "/src/assets/lavadora-ecologica.jpg",
            badge: "ECOLÓGICA",
            type: "eco"
        },
        {
            id: 6,
            name: "Lavadora Inteligente 11kg",
            description: "Control por voz y app móvil. Programas automáticos y diagnóstico inteligente.",
            price: "$149/mes",
            originalPrice: "$179/mes",
            features: ["Control por voz", "App móvil", "Diagnóstico inteligente"],
            image: "/src/assets/lavadora-inteligente.jpg",
            badge: "TECNOLOGÍA",
            type: "smart"
        }
    ];

    const serviceTypes = [
        { id: "all", name: "Todos", icon: "fas fa-th", count: services.length },
        { id: "standard", name: "Familiares", icon: "fas fa-users", count: services.filter(s => s.type === "standard").length },
        { id: "compact", name: "Compactas", icon: "fas fa-compress-arrows-alt", count: services.filter(s => s.type === "compact").length },
        { id: "premium", name: "Premium", icon: "fas fa-crown", count: services.filter(s => s.type === "premium").length },
        { id: "industrial", name: "Industriales", icon: "fas fa-industry", count: services.filter(s => s.type === "industrial").length },
        { id: "eco", name: "Ecológicas", icon: "fas fa-leaf", count: services.filter(s => s.type === "eco").length },
        { id: "smart", name: "Inteligentes", icon: "fas fa-robot", count: services.filter(s => s.type === "smart").length }
    ];

    const [selectedType, setSelectedType] = React.useState("all");
    const [filteredServices, setFilteredServices] = React.useState(services);

    useEffect(() => {
        if (selectedType === "all") {
            setFilteredServices(services);
        } else {
            setFilteredServices(services.filter(service => service.type === selectedType));
        }
    }, [selectedType]);

    return (
        <div className="home">
            {/* HEADER - Mismo que el Home */}
            <header className="header">
                <div className="logo-container">
                    {/* ESPACIO PARA TU LOGO PERSONAL */}
                    <img 
                        src="/src/assets/logo-servilavadora.png" 
                        alt="Servilavadora Logo" 
                        className="logo-image"
                    />
                </div>
                
                <nav className="nav-links">
                    <Link to="/">Inicio/</Link>                    
                    <div className="dropdown">
                      <a href="#servicios" className="active">Lavadoras <i className="fas fa-chevron-down" style={{fontSize: '0.8rem'}}></i></a>
                      <div className="dropdown-content">
                        <a href="/servicios"><i className="fas fa-tshirt"></i> Lavadora Familiar</a>
                        <a href="/servicios"><i className="fas fa-compress-arrows-alt"></i> Lavadora Compacta</a>
                        <a href="/servicios"><i className="fas fa-crown"></i> Lavadora Premium</a>
                        <a href="/servicios"><i className="fas fa-industry"></i> Lavadora Industrial</a>
                        <a href="/servicios"><i className="fas fa-truck"></i> Instalación Incluida</a>
                      </div>
                    </div>

                    <div className="dropdown">
                        <a href="#admin">Admin <i className="fas fa-chevron-down"></i></a>
                        <div className="dropdown-content">
                            <Link to="/Dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
                            <Link to="/Dashboard/usuarios"><i className="fas fa-users"></i> Usuarios</Link>
                            <Link to="/Dashboard/servicios"><i className="fas fa-concierge-bell"></i> Servicios</Link>
                        </div>
                    </div>

                    <div className="dropdown">
                      <a href="#tutoriales">Tutoriales <i className="fas fa-chevron-down" style={{fontSize: '0.8rem'}}></i></a>
                      <div className="dropdown-content">
                        <a href="/tutoriales"><i className="fas fa-play-circle"></i> Video Tutoriales</a>
                        <a href="/tutoriales"><i className="fas fa-book"></i> Guías de Uso</a>
                        <a href="/tutoriales"><i className="fas fa-cogs"></i> Mantenimiento</a>
                        <a href="/tutoriales"><i className="fas fa-exclamation-triangle"></i> Solución de Problemas</a>
                        <a href="/tutoriales"><i className="fas fa-question-circle"></i> Preguntas Frecuentes</a>
                      </div>
                    </div>

                    <div className="dropdown">
                      <a href="#cuenta">Mi Cuenta <i className="fas fa-chevron-down" style={{fontSize: '0.8rem'}}></i></a>
                      <div className="dropdown-content">
                        <a href="/login"><i className="fas fa-sign-in-alt"></i> Iniciar Sesión</a>
                        <a href="/Registro"><i className="fas fa-user-plus"></i> Registrarse</a>
                        <a href="/perfil"><i className="fas fa-user"></i> Mi Perfil</a>
                        <a href="/mis-alquileres"><i className="fas fa-list"></i> Mis Alquileres</a>
                        <a href="/ayuda"><i className="fas fa-headset"></i> Soporte</a>
                      </div>
                    </div>
                                      
                    <a href="#ofertas">Ofertas</a>
                    <a href="#quienes-somos">Quiénes Somos</a>
                  
                </nav>
            </header>

            {/* HERO SECTION PARA SERVICIOS */}
            <section className="hero-modern services-hero">
                <div className="hero-content-modern">
                    <div className="hero-text">
                        <h1>Nuestras Lavadoras en Alquiler</h1>
                        <p className="hero-subtitle">
                            Descubre nuestra amplia gama de lavadoras modernas disponibles para alquiler.<br />
                            Tecnología de punta, entrega gratuita y mantenimiento incluido.
                        </p>
                        
                        <div className="hero-stats">
                            <div className="stat">
                                <div className="stat-number">6+</div>
                                <div className="stat-label">Modelos</div>
                            </div>
                            <div className="stat">
                                <div className="stat-number">24/7</div>
                                <div className="stat-label">Soporte</div>
                            </div>
                            <div className="stat">
                                <div className="stat-number">100%</div>
                                <div className="stat-label">Garantía</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="hero-visual">
                        {/* ESPACIO PARA IMAGEN DE SERVICIOS */}
                        <img 
                            src="/src/assets/services-hero.png" 
                            alt="Variedad de lavadoras" 
                            className="hero-image"
                        />
                    </div>
                </div>
            </section>

            {/* FILTROS DE SERVICIOS */}
            <section className="services-filters">
                <div className="content">
                    <h2 className="section-title">Encuentra tu Lavadora Ideal</h2>
                    <p className="section-subtitle">Filtra por tipo de lavadora que mejor se adapte a tus necesidades</p>
                    
                    <div className="filter-buttons">
                        {serviceTypes.map(type => (
                            <button
                                key={type.id}
                                className={`filter-btn ${selectedType === type.id ? 'active' : ''}`}
                                onClick={() => setSelectedType(type.id)}
                            >
                                <i className={type.icon}></i>
                                <span>{type.name}</span>
                                <span className="filter-count">{type.count}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* LISTA DE SERVICIOS */}
            <section className="services-list">
                <div className="content">
                    <div className="services-grid">
                        {filteredServices.map(service => (
                            <div key={service.id} className="service-card">
                                <div className="service-image">
                                    {/* ESPACIO PARA IMAGEN LOCAL DEL SERVICIO */}
                                    <img 
                                        src={service.image} 
                                        alt={service.name} 
                                    />
                                    <div className="service-badge">{service.badge}</div>
                                    <button className="service-wishlist">
                                        <i className="far fa-heart"></i>
                                    </button>
                                </div>
                                
                                <div className="service-content">
                                    <h3>{service.name}</h3>
                                    <p>{service.description}</p>
                                    
                                    <div className="service-features">
                                        {service.features.map((feature, index) => (
                                            <span key={index} className="service-feature">
                                                <i className="fas fa-check"></i>
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    <div className="service-price">
                                        <span className="current-price">{service.price}</span>
                                        <span className="original-price">{service.originalPrice}</span>
                                        <span className="price-period">/mes</span>
                                    </div>
                                    
                                    <div className="service-actions">
                                        <button className="btn-primary">
                                            <i className="fas fa-shopping-cart"></i>
                                            Alquilar Ahora
                                        </button>
                                        <button className="btn-outline">
                                            <i className="fas fa-info-circle"></i>
                                            Detalles
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECCIÓN DE BENEFICIOS */}
            <section className="services-benefits">
                <div className="content">
                    <h2 className="section-title">Beneficios Exclusivos</h2>
                    <p className="section-subtitle">Todo incluido en tu alquiler mensual</p>
                    
                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <i className="fas fa-truck"></i>
                            </div>
                            <h4>Entrega e Instalación Gratuita</h4>
                            <p>Instalamos la lavadora en tu hogar sin coste adicional</p>
                        </div>
                        
                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <i className="fas fa-tools"></i>
                            </div>
                            <h4>Mantenimiento Incluido</h4>
                            <p>Reparaciones y mantenimiento gratuito durante el alquiler</p>
                        </div>
                        
                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <i className="fas fa-sync-alt"></i>
                            </div>
                            <h4>Cambio Gratuito</h4>
                            <p>Cambia de modelo cuando quieras sin costes adicionales</p>
                        </div>
                        
                        <div className="benefit-card">
                            <div className="benefit-icon">
                                <i className="fas fa-shield-alt"></i>
                            </div>
                            <h4>Garantía Total</h4>
                            <p>Cobertura completa de daños y averías técnicas</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="services-cta">
                <div className="content">
                    <div className="cta-content">
                        <h2>¿No encuentras lo que buscas?</h2>
                        <p>Contáctanos y te ayudaremos a encontrar la lavadora perfecta para ti</p>
                        <div className="cta-buttons">
                            <button className="btn-primary btn-large">
                                <i className="fas fa-phone"></i>
                                Contactar Asesor
                            </button>
                            <button className="btn-secondary btn-large">
                                <i className="fas fa-whatsapp"></i>
                                WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER MODERNO - Mismo que el Home */}
            <footer className="modern-footer" id="contacto">
                <div className="footer-content">
                    <div className="footer-section">
                        <div className="footer-logo">
                            <img 
                                src="/src/assets/logo-servilavadora.png" 
                                alt="Servilavadora Logo" 
                                className="footer-logo-image"
                            />
                            <span>Servilavadora S.A.S</span>
                        </div>
                        <p>Tu solución de alquiler de lavadoras a domicilio. Tecnología, comodidad y ahorro en un solo servicio.</p>
                        <div className="social-links">
                            <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    
                    <div className="footer-section">
                        <h3>Contacto</h3>
                        <ul className="footer-links">
                            <li><i className="fas fa-phone"></i> +1 234 567 890</li>
                            <li><i className="fas fa-envelope"></i> info@servilavadora.com</li>
                            <li><i className="fas fa-map-marker-alt"></i> Ciudad, País</li>
                        </ul>
                    </div>
                    
                    <div className="footer-section">
                        <h3>Enlaces Rápidos</h3>
                        <ul className="footer-links">
                            <li><Link to="/">Inicio</Link></li>
                            <li><a href="#quienes-somos">Quiénes Somos</a></li>
                            <li><a href="#ofertas">Ofertas</a></li>
                            <li><a href="#como-funciona">Cómo Funciona</a></li>
                        </ul>
                    </div>
                    
                    <div className="footer-section">
                        <h3>Legal</h3>
                        <ul className="footer-links">
                            <li><a href="#">Términos y Condiciones</a></li>
                            <li><a href="#">Política de Privacidad</a></li>
                            <li><a href="#">Cookies</a></li>
                        </ul>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <p>&copy; 2024 Servilavadora S.A.S. Todos los derechos reservados.</p>
                        <div className="footer-payments">
                            <i className="fab fa-cc-visa"></i>
                            <i className="fab fa-cc-mastercard"></i>
                            <i className="fab fa-cc-paypal"></i>
                            <i className="fab fa-cc-apple-pay"></i>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Servicios;