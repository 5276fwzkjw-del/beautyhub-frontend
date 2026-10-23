import { useEffect, useState } from "react";
import Logo from "../asset/logo.jpg";
import joanah from "../asset/joanah.jpg";
import shaky from "../asset/shaky.jpg";
import joana from "../asset/joana.png";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
function MainPage() {
    const [image, setImage] = useState(null);
    const [logo, setLogo] = useState(null);
    const [services, setServices] = useState([]);
    const [scrolled, setScrolled] = useState(false);

    const handleImage = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/v2/getImage`, { method: "GET" });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setImage(data.image.avatar);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogo = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/v2/getLogo`, { method: "GET" });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setLogo(data.image.logo);
        } catch (error) {
            console.log(error);
        }
    };

    const getServices = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/v2/services`, { method: "GET" });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setServices(data.services);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const initializePageData = async () => {
            try {
                await handleImage();
                await handleLogo();
                await getServices();
            } catch (error) {
                console.log("initializing page data failed ", error.message);
            }
        };
        initializePageData();

        const handleScroll = () => {
            if (window.scrollY > 50) setScrolled(true);
            else setScrolled(false);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <div className="v2-parallax-wrapper">
            
            {/* FLOATING ULTRALUXE NAVIGATION SYSTEM */}
            <nav className={`v2-luxury-nav ${scrolled ? "v2-nav-glass" : ""}`}>
                <div className="v2-nav-inner">
                    <div className="v2-nav-left" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                        <div className="v2-logo-container">
                            <img 
                                src={logo ? `${BACKEND_URL}${logo}` : Logo} 
                                alt="JOANAH BEAUTY HUB Logo" 
                                className="v2-logo-img"
                            />
                        </div>
                        <span className="v2-brand-text">JOANAH <span className="v2-gold-dim">BEAUTY HUB</span></span>
                    </div>

                    <div className="v2-nav-center">
                        <a href="#about" className="v2-nav-anchor">Curator</a>
                        <a href="#services" className="v2-nav-anchor">The Menu</a>
                        <a href="#experience" className="v2-nav-anchor">Experience</a>
                        <a href="#lookbook" className="v2-nav-anchor">Lookbook</a>
                    </div>

                    <div className="v2-nav-right">
                        <a href="#booking" className="v2-nav-cta">Reserve Session</a>
                    </div>
                </div>
            </nav>

            {/* SPLIT CINEMATIC VISUAL HERO DISPLAY */}
            <header className="v2-hero-split" id="home">
                <div className="v2-hero-panel-left">
                    <div className="v2-hero-text-shield">
                        <span className="v2-pre-title">HAKEM & ARTISTRY — RY-01</span>
                        <h1 className="v2-main-title">Redefining <br />The Standards Of <br /><span className="v2-serif-italic">Haute Esthétique</span></h1>
                        <p className="v2-hero-narrative">
                            An immersive private studio environment blending high-fashion conceptual structural hair styling with masterfully calibrated skincare formulas.
                        </p>
                        <div className="v2-hero-action-deck">
                            <a href="#booking" className="v2-action-solid">Secure Entry Card</a>
                            <a href="#services" className="v2-action-outline">Browse Catalog</a>
                        </div>
                    </div>
                </div>
                <div className="v2-hero-panel-right">
                    <div className="v2-hero-image-mosaic">
                        <div className="v2-mosaic-cell v2-c-1" style={{backgroundImage: `url(${joanah})`}}  />
                        <div className="v2-mosaic-cell v2-c-2" style={{backgroundImage: `url(${joanah})`}} />
                    </div>
                </div>
            </header>
            {/* IMMERSIVE THREE-COLUMN BRAND STORY & EXPERIENCE */}
            <section className="v2-experience-immersive" id="experience">
                <div className="v2-immersive-header">
                    <span className="v2-tag-mini">THE ATMOSPHERE</span>
                    <h2 className="v2-immersive-heading">Uncompromising Excellence. Built For The Elite.</h2>
                </div>
                <div className="v2-immersive-row-grid">
                    <div className="v2-immersive-column">
                        <div className="v2-col-img-frame" style={{backgroundImage: `url(${joanah})`}}  />
                        <h3 className="v2-col-title">Private Lounge Suites</h3>
                        <p className="v2-col-paragraph">Our completely isolated treatment chambers prioritize ultimate discretion, personalized acoustics, and private refreshment counters designed around your tranquility.</p>
                    </div>
                    <div className="v2-immersive-column">
                        <div className="v2-col-img-frame" style={{backgroundImage: `url(${joanah})`}} />
                        <h3 className="v2-col-title">Avant-Garde Formulations</h3>
                        <p className="v2-col-paragraph">We utilize top-tier organic compounds layered alongside cutting-edge active scientific ingredients to achieve immediate visible results for all hair and skin matrices.</p>
                    </div>
                    <div className="v2-immersive-column">
                        <div className="v2-col-img-frame" style={{backgroundImage: `url(${shaky})`}} />
                        <h3 className="v2-col-title">Masterpiece Curation</h3>
                        <p className="v2-col-paragraph">Every technical movement is custom-mapped by hand to mirror your natural features, optimizing individual profiles into dynamic, self-confident expressions of art.</p>
                    </div>
                </div>
            </section>

            {/* HIGH-END OVERLAPPED FOUNDER BIOGRAPHY BLOCK */}
            <section id="about" className="v2-director-sanctum">
                <div className="v2-sanctum-wrapper">
                    <div className="v2-sanctum-split-grid">
                        <div className="v2-sanctum-imagery-deck">
                            <div className="v2-deck-main-container">
                                <img 
                                    src={image ? `${BACKEND_URL}${image}` : joanah} 
                                    alt="Joanah — Master Director" 
                                    className="v2-director-master-pic"
                                />
                            </div>
                            <div className="v2-deck-accent-mini-box" style={{backgroundImage: `url(${joana})`}} />
                        </div>
                        <div className="v2-sanctum-content-deck">
                            <span className="v2-luxury-badge">THE DIRECTOR'S PROFILE</span>
                            <h2 className="v2-sanctum-title">Visionary Curation By Joanah</h2>
                            <p className="v2-sanctum-bio-text">
                                Welcome to JOANAH BEAUTY HUB. Crafted under the singular direction of Master Stylist Joanah, this space serves as a high-end sanctuary where personal beauty is elevated to the level of classic editorial art.
                            </p>
                            <p className="v2-sanctum-bio-text">
                                Rejecting standard commercial approaches, our team customizes formulas and maps individual symmetry for a truly bespoke finish. Every structural trim and deep skincare curation is executed to deliver effortless elegance.
                            </p>
                            <blockquote className="v2-sanctum-master-quote">
                                "True luxury is not found simply in the outcome; it lives entirely inside the absolute precision of every single detail."
                            </blockquote>
                            <div className="v2-sanctum-signature">JOANAH</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HIGH-FASHION DYNAMIC SERVICES SYSTEM */}
            <section className="v2-catalog-showcase" id="services">
                <div className="v2-catalog-container">
                    <div className="v2-catalog-header-split">
                        <div>
                            <span className="v2-catalog-tag">THE MENU COLLECTION</span>
                            <h2 className="v2-catalog-heading">Bespoke Treatments</h2>
                        </div>
                        <p className="v2-catalog-header-narrative">
                            Select a structural option below to update your personalized session configuration. Each option features specialized technical execution.
                        </p>
                    </div>
                    
                    <div className="v2-services-asymmetric-grid">
                        {services && services.length > 0 ? (
                            services.map((service) => (
                                <div className="v2-luxury-card" key={service._id}>
                                    <div className="v2-card-media-shell">
                                        <img 
                                            src={service.image && service.image !== "https://unsplash.com" ? `${BACKEND_URL}${service.image}` : shaky} 
                                            alt={service.serviceName} 
                                            className="v2-card-parallax-img"
                                        />
                                        <div className="v2-card-premium-label">Signature Suite</div>
                                    </div>
                                    <div className="v2-card-content-shell">
                                        <div className="v2-card-title-row">
                                            <h3 className="v2-card-main-title">{service.serviceName}</h3>
                                            <span className="v2-card-price-tag">{service.price} SAR</span>
                                        </div>
                                        <div className="v2-card-duration-badge">
                                            <span>🕰️ {service.duration} Minutes of Dedicated Precision</span>
                                        </div>
                                        <p className="v2-card-body-description">{service.description}</p>
                                        
                                        <div className="v2-artisan-profile-block">
                                            <div className="v2-artisan-avatar-icon">👤</div>
                                            <div className="v2-artisan-info-meta">
                                                <div className="v2-artisan-full-name">{service.staffMember?.name || "Senior Specialist"}</div>
                                                <div className="v2-artisan-speciality-title">{service.staffMember?.speciality || "Artisan"}</div>
                                                <div className="v2-artisan-assignment-label">Assigned Specialist</div>
                                            </div>
                                        </div>
                                        
                                        <button className="v2-card-interaction-button">
                                            Select Treatment Line
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="v2-empty-state-card">
                                <p className="v2-empty-state-message">No treatment configurations are active in the system right now.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            {/* AMBIENT INTELLIGENT SCHEDULING CONSOLE */}
            <section id="booking" className="v2-console-section">
                <div className="v2-console-container">
                    <div className="v2-console-card">
                        <div className="v2-console-split-grid">
                            <div className="v2-console-visual-side">
                                <div className="v2-console-bg-image" style={{backgroundImage: `url(${joana})`}} />
                                <div className="v2-console-overlay-gradient" />
                                <div className="v2-console-visual-context">
                                    <span className="v2-console-mini-badge">RESERVATIONS V2</span>
                                    <h3 className="v2-console-visual-title">Private Session Mapping</h3>
                                    <p className="v2-console-visual-p">Securing your coordinate blocks updates our central calendar database instantly, matching you to your preferred aesthetic specialist line.</p>
                                </div>
                            </div>
                            
                            <div className="v2-console-form-side">
                                <div className="v2-form-context-header">
                                    <h2 className="v2-form-main-title">Secure Your Luxury Session</h2>
                                    <p className="v2-form-subtitle">Finalize coordinates to establish your entry profile within our daily schedule.</p>
                                </div>
                                
                                <div className="v2-form-stack">
                                    <div className="v2-form-field-group">
                                        <label className="v2-form-label-el">1. Selected Treatment Line</label>
                                        <input 
                                            type="text" 
                                            readOnly 
                                            placeholder="No selection made" 
                                            className="v2-form-input-readonly" 
                                        />
                                    </div>
                                    <div className="v2-form-field-group">
                                        <label className="v2-form-label-el">2. Pick Reservation Date & Hour</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. October 24th at 4:00 PM" 
                                            className="v2-form-input-text" 
                                        />
                                    </div>
                                    <div className="v2-form-action-trigger">
                                        <button className="v2-form-master-submit-btn">
                                            Confirm Appointment Booking
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HIGH-FASHION DYNAMIC SEVEN-IMAGE LOOKBOOK GRID */}
            <section className="v2-editorial-lookbook" id="lookbook">
                <div className="v2-lookbook-max-container">
                    <div className="v2-lookbook-intro-center">
                        <span className="v2-lookbook-tag-el">THE VISUAL REPERTOIRE</span>
                        <h2 className="v2-lookbook-heading-el">Client Look Book</h2>
                        <p className="v2-lookbook-subtitle-el">Inspiration curated by our Master Director to showcase standard structural transformations.</p>
                    </div>

                    <div className="v2-lookbook-masonry-grid">
                        {(() => {
                            const clientLookBook = [
                                { id: 1, img: shaky, tag: "Haute Couture Hair", size: "v2-cell-wide" },
                                { id: 2, img: shaky, tag: "Advanced Aesthetics", size: "v2-cell-normal" },
                                { id: 3, img: shaky, tag: "Bespoke Curation", size: "v2-cell-normal" },
                                { id: 4, img: shaky, tag: "Private Suites", size: "v2-cell-tall" },
                                { id: 5, img: shaky, tag: "Precision Styling", size: "v2-cell-normal" },
                                { id: 6, img: shaky, tag: "Skin Formulation", size: "v2-cell-normal" }
                            ];

                            return clientLookBook.map((item) => (
                                <div key={item.id} className={`v2-masonry-cell ${item.size}`}>
                                    <img src={item.img} alt={item.tag} className="v2-masonry-img" />
                                    <div className="v2-masonry-meta">
                                        <span className="v2-masonry-tag">{item.tag}</span>
                                    </div>
                                </div>
                            ));
                        })()}
                    </div>
                </div>
            </section>

            {/* HIGH-FASHION BRAND FOOTER */}
            <footer className="v2-brand-footer">
                <div className="v2-footer-max-container">
                    <div className="v2-footer-main-grid">
                        <div className="v2-footer-brand-column">
                            <h3 className="v2-footer-logo-title">JOANAH BEAUTY HUB</h3>
                            <p className="v2-footer-brand-philosophy">
                                Redefining the standards of premium personal curation and holistic luxury aesthetic wellness across an exclusive sanctuary environment.
                            </p>
                        </div>
                        <div className="v2-footer-links-column">
                            <h4 className="v2-footer-section-heading">Navigation</h4>
                            <div className="v2-footer-links-stack">
                                <a href="#home" className="v2-footer-link-el">Top Overview</a>
                                <a href="#about" className="v2-footer-link-el">The Curator</a>
                                <a href="#services" className="v2-footer-link-el">Treatment Menu</a>
                                <a href="#booking" className="v2-footer-link-el">Secure Session</a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="v2-footer-base-bar">
                        <p className="v2-footer-copyright-text">
                            &copy; {new Date().getFullYear()} JOANAH BEAUTY HUB. All Rights Reserved.
                        </p>
                        <div className="v2-footer-social-wrapper">
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="v2-footer-social-link">LinkedIn</a>
                            <a href="https://github.com" target="_blank" rel="noreferrer" className="v2-footer-social-link">GitHub</a>
                            <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="v2-footer-social-link">WhatsApp</a>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
}

export default MainPage;
