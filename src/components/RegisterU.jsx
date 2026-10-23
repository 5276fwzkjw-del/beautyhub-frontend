import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import joanah from "../asset/joanah.jpg";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
function RegisterUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const registerUser = () => {
        setLoading(prev => !prev);
        setTimeout(async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/v2/create`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                });
                const data = await response.json();
                console.log(data);
                if (!response.ok) {
                    throw new Error(data.message);
                }
                navigate("/login");
            } catch (error) {
                console.log(error);
                setError(error.message || "Something went wrong. Please try again.");
            } finally {
                setLoading(false);
                setEmail("");
                setName("");
                setPassword("");
            }
        }, 2000);
    };

    return (
        <div className="salon-auth-wrapper">
            <div className="salon-auth-card">
                
                {/* LEFT SIDE: Premium Visual Panel */}
                <div className="salon-auth-visual">
                    <div className="salon-visual-overlay" />
                    <div className="salon-visual-content">
                        <div className="salon-brand-meta">
                            <span className="salon-brand-tagline">Welcome To</span>
                            <h2 className="salon-brand-title">JOANAH BEAUTY HUB</h2>
                        </div>
                        <div className="v2-col-img-frame" style={{backgroundImage: `url(${joanah})`}}  />
                        <div className="salon-quote-group">
                            <p className="salon-quote-text">
                                "Elevate your natural glow, embrace timeless elegance."
                            </p>
                            <div className="salon-quote-divider" />
                            <p className="salon-quote-sub">
                                Experience premier hair styling, tailored aesthetics, and elite self-care.
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: Dedicated Registration Form */}
                <div className="salon-auth-form-container">
                    <div className="salon-form-header">
                        <h1 className="salon-form-title">Create An Account</h1>
                        <p className="salon-form-subtitle">Begin your ultimate luxury beauty experience.</p>
                    </div>

                    {/* Premium Error Layout Banner */}
                    {error && (
                        <div className="salon-error-banner">
                            <span className="salon-error-dot" />
                            <span className="salon-error-text">{error}</span>
                        </div>
                    )}

                    <div className="salon-interactive-form">
                        {/* Name Input */}
                        <div className="salon-input-group">
                            <label className="salon-input-label">Full Name</label>
                            <input 
                                type="text" 
                                placeholder="Enter your name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                                className="salon-form-input"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="salon-input-group">
                            <label className="salon-input-label">Email Address</label>
                            <input 
                                type="email" 
                                placeholder="name@domain.com" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required
                                className="salon-form-input"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="salon-input-group">
                            <label className="salon-input-label">Password</label>
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required
                                className="salon-form-input"
                            />
                        </div>

                        {/* Action Button */}
                        <div className="salon-action-wrapper">
                            <button 
                                onClick={() => registerUser()}
                                disabled={loading}
                                className="salon-submit-btn"
                            >
                                {loading ? (
                                    <span className="salon-loading-flex">
                                        <svg className="salon-spinner" fill="none" viewBox="0 0 24 24">
                                            <circle className="salon-spinner-bg" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="salon-spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Securing Profile...
                                    </span>
                                ) : "Create Account"}
                            </button>
                        </div>
                    </div>

                    {/* Navigation Footer */}
                    <div className="salon-form-footer">
                        <p className="salon-footer-text"> 
                            Already have an account?{" "}
                            <Link to={"/login"} className="salon-footer-link">
                                Login Here
                            </Link>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default RegisterUser;
