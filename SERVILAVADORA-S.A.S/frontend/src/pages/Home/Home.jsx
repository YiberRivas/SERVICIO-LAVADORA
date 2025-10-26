import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    useEffect(() => {
        // Animación para las tarjetas al hacer scroll
        const cards = document.querySelectorAll('.card');
        
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

        // Componente de Burbujas Flotantes
const FloatingBubbles = () => {
    return (
        <div className="floating-bubbles">
            <div className="bubble bubble-1"></div>
            <div className="bubble bubble-2"></div>
            <div className="bubble bubble-3"></div>
            <div className="bubble bubble-4"></div>
            <div className="bubble bubble-5"></div>
            <div className="bubble bubble-6"></div>
            <div className="bubble bubble-7"></div>
            <div className="bubble bubble-8"></div>
            <div className="bubble bubble-9"></div>
            <div className="bubble bubble-10"></div>
        </div>
    );
};


        return () => {
            observer.disconnect();
        };
    }, []);

    

    return (
        <div className="home">
            {/* HEADER */}
            <header className="header">
                <div className="logo-container">
                    {/* ESPACIO PARA TU LOGO PERSONAL - Reemplaza la ruta con tu logo */}
                    <img 
                        src="/src/assets/logo-servilavadora.png" 
                        alt="Servilavadora Logo" 
                        className="logo-image"
                    />
                </div>
                
                <nav className="nav-links">
                    <a href="/">Inicio</a>
                    
                    <div className="dropdown">
                      <a href="#servicios">Servicios <i className="fas fa-chevron-down" style={{fontSize: '0.8rem'}}></i></a>
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

                    {/* Menú desplegable para Tutoriales */}
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

                    {/* Menú desplegable para Login/Registro */}
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

                        {/* HERO SECTION - ACTUALIZADA */}
            <section className="hero-modern">
            <div className="hero-content-modern">
                <div className="hero-text">
                <h1>Tu Lavadora, Cuando la Necesites</h1>
                <p className="hero-subtitle">
                    Alquila lavadoras modernas con entrega directa a tu hogar.<br />
                    Sin compras, sin instalaciones complicadas, solo elige y disfruta.
                </p>

                {/* Botones de acción principales */}
                <div className="hero-buttons">
                    <Link to="/login" className="btn-hero-secondary">
                    <i className="fas fa-sign-in-alt"></i>
                    Iniciar sesión
                    </Link>
                    <Link to="/registro" className="btn-hero-primary">
                    <i className="fas fa-user-plus"></i>
                    Crea tu cuenta
                    </Link>
                </div>

                <div className="hero-feature">
                    <i className="fas fa-truck"></i>
                    <span>Entregas rápidas en tu ciudad</span>
                </div>
                </div>

                <div className="hero-visual">
                {/* Aquí puedes agregar tu imagen, ilustración o animación */}
                <img src="/images" alt="Lavadora moderna" /> 
                </div>
            </div>
            </section>


            {/* SECCIÓN QUIÉNES SOMOS - ACTUALIZADA */}
            <section className="about-section" id="quienes-somos">
                <div className="content">
                    <div className="about-grid">
                        <div className="about-image">
                            {/* ESPACIO PARA IMAGEN LOCAL - Reemplaza la ruta */}
                            <img 
                                src="/src/assets/about-image.jpg" 
                                alt="Servicio de entrega de lavadora" 
                            />
                        </div>
                        <div className="about-content">
                            <h2 className="section-title">Quiénes Somos</h2>
                            <p className="about-description">
                                En Servilavadora S.A.S ofrecemos un servicio práctico de alquiler de lavadoras con entrega a domicilio. 
                                Nuestra meta es facilitar tu día a día brindándote equipos modernos, eficientes y listos para usar, 
                                sin necesidad de comprar o instalar nada por tu cuenta.
                            </p>
                            
                            <div className="about-features">
                                <div className="about-feature-item">
                                    <i className="fas fa-calendar-alt"></i>
                                    <span>Alquiler flexible por días o semanas</span>
                                </div>
                                <div className="about-feature-item">
                                    <i className="fas fa-truck"></i>
                                    <span>Entrega rápida hasta tu hogar</span>
                                </div>
                                <div className="about-feature-item">
                                    <i className="fas fa-bolt"></i>
                                    <span>Tecnología moderna y confiable</span>
                                </div>
                                <div className="about-feature-item">
                                    <i className="fas fa-credit-card"></i>
                                    <span>Pagos seguros y fáciles</span>
                                </div>
                            </div>

                            <Link to="/servicios" className="btn-primary">
                                Ver lavadoras disponibles
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN CÓMO FUNCIONA (MANTENIDA) */}
            <section className="content" id="como-funciona">
                <h2 className="section-title">¿Cómo Funciona?</h2>
                <p className="section-subtitle">Alquilar una lavadora nunca fue tan fácil. Solo 3 simples pasos:</p>
                
                <div className="steps-container">
                    <div className="step-card">
                        <div className="step-icon">1</div>
                        <h4>Elige tu Lavadora</h4>
                        <p>Selecciona la lavadora perfecta según tus necesidades y capacidad requerida.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-icon">2</div>
                        <h4>Programa la Entrega</h4>
                        <p>Elige la fecha y hora que mejor te convenga para la instalación en tu hogar.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-icon">3</div>
                        <h4>Disfruta sin Preocupaciones</h4>
                        <p>Nos encargamos del mantenimiento y reparaciones. Tú solo preocúpate de usar.</p>
                    </div>
                </div>
            </section>

            {/* OFERTAS DESTACADAS - CON ESPACIOS PARA IMÁGENES LOCALES */}
            <section className="content" id="ofertas">
                <h2 className="section-title">Modelos Destacados</h2>
                <p className="section-subtitle">Las lavadoras más populares para alquiler inmediato</p>
                
                <div className="card-container">
                    {/* LAVADORA 1 */}
                    <div className="card">
                        <div className="card-image">
                            {/* ESPACIO PARA IMAGEN LOCAL */}
                            <img 
                                src="/src/assets/lavadora-familiar.jpg" 
                                alt="Lavadora Familiar" 
                            />
                            <div className="card-badge">MÁS POPULAR</div>
                        </div>
                        <div className="card-content">
                            <h4>Lavadora Familiar 10kg</h4>
                            <p>Ideal para familias de 4-5 personas. Tecnología inverter y 15 programas de lavado.</p>
                            <div className="card-features">
                                <span><i className="fas fa-users"></i> Hasta 5 personas</span>
                                <span><i className="fas fa-bolt"></i> A+++ eficiencia</span>
                                <span><i className="fas fa-tint"></i> 15 programas</span>
                            </div>
                            <div className="card-price">
                                <span className="current-price">$89/mes</span>
                                <span className="original-price">$109/mes</span>
                            </div>
                            <button className="btn-secondary">Alquilar Ahora</button>
                        </div>
                    </div>
                    
                    {/* LAVADORA 2 */}
                    <div className="card">
                        <div className="card-image">
                            {/* ESPACIO PARA IMAGEN LOCAL */}
                            <img 
                                src="/src/assets/lavadora-compacta.jpg" 
                                alt="Lavadora Compacta" 
                            />
                            <div className="card-badge">ECONÓMICA</div>
                        </div>
                        <div className="card-content">
                            <h4>Lavadora Compacta 8kg</h4>
                            <p>Perfecta para apartamentos pequeños o personas solas. Bajo consumo energético.</p>
                            <div className="card-features">
                                <span><i className="fas fa-user"></i> 1-2 personas</span>
                                <span><i className="fas fa-bolt"></i> A++ eficiencia</span>
                                <span><i className="fas fa-compress-arrows-alt"></i> Diseño compacto</span>
                            </div>
                            <div className="card-price">
                                <span className="current-price">$59/mes</span>
                                <span className="original-price">$79/mes</span>
                            </div>
                            <button className="btn-secondary">Alquilar Ahora</button>
                        </div>
                    </div>
                    
                    {/* LAVADORA 3 */}
                    <div className="card">
                        <div className="card-image">
                            {/* ESPACIO PARA IMAGEN LOCAL */}
                            <img 
                                src="/src/assets/lavadora-premium.jpg" 
                                alt="Lavadora Premium" 
                            />
                            <div className="card-badge">PREMIUM</div>
                        </div>
                        <div className="card-content">
                            <h4>Lavadora Premium 12kg</h4>
                            <p>Máxima tecnología con control inteligente y conexión WiFi. Lavado perfecto garantizado.</p>
                            <div className="card-features">
                                <span><i className="fas fa-wifi"></i> Control WiFi</span>
                                <span><i className="fas fa-robot"></i> Inteligente</span>
                                <span><i className="fas fa-crown"></i> Tecnología premium</span>
                            </div>
                            <div className="card-price">
                                <span className="current-price">$129/mes</span>
                                <span className="original-price">$159/mes</span>
                            </div>
                            <button className="btn-secondary">Alquilar Ahora</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN BENEFICIOS (MANTENIDA) */}
            <section className="features" id="beneficios">
                <div className="content">
                    <h2 className="section-title">¿Por Qué Alquilar con Nosotros?</h2>
                    <p className="section-subtitle">Ventajas exclusivas de nuestro servicio de alquiler</p>
                    
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-tools"></i>
                            </div>
                            <h4>Mantenimiento Incluido</h4>
                            <p>Reparaciones y mantenimiento gratuito durante todo el período de alquiler.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-truck-loading"></i>
                            </div>
                            <h4>Instalación Gratuita</h4>
                            <p>Entrega e instalación profesional sin coste adicional en tu domicilio.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-sync-alt"></i>
                            </div>
                            <h4>Flexibilidad Total</h4>
                            <p>Cambia de modelo o cancela cuando quieras sin penalizaciones.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-shield-alt"></i>
                            </div>
                            <h4>Garantía Completa</h4>
                            <p>Cobertura total de daños y averías. Tu tranquilidad es lo primero.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER MODERNO Y MEJORADO */}
            <footer className="modern-footer" id="contacto">
                <div className="footer-content">
                    <div className="footer-section">
                        <div className="footer-logo">
                            {/* ESPACIO PARA LOGO EN FOOTER */}
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
                            <li><a href="/">Inicio</a></li>
                            <li><a href="#quienes-somos">Quiénes Somos</a></li>
                            <li><a href="#ofertas">Ofertas</a></li>
                            <li><a href="#como-funciona">Cómo Funciona</a></li>
                            <li><a href="#beneficios">Beneficios</a></li>
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

export default Home;