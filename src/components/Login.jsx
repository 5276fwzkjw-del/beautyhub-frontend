import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import joanah from "../asset/joanah.jpg"
function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const loginUser = () => {
        setLoading(prev => !prev);
        setTimeout(async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/v2/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message); // Fixed: Passed message directly to show clean error strings
                }
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role);
                localStorage.setItem("userEmail", data.user.email);
                if (!data.role) {
                    return navigate("/login");
                }
                if (data.role === "client") {
                    return navigate("/client");
                }
                if (data.role === "manager") {
                    localStorage.setItem("user", data.user.name);
                    return navigate("/manager");
                }
                if (data.role === "admin") {
                    return navigate("/admin");
                }
                if (data.role === "staff") {
                    return navigate("/userprofile");
                }
               
            } catch (error) {
                console.log(error);
                setError(error.message || "Invalid credentials. Please try again.");
            } finally {
                setEmail("");
                setPassword("");
                setLoading(false);
            }
        }, 1500);
    };

    return (
        <div className="salon-auth-wrapper">
            <div className="salon-auth-card">
                
                {/* LEFT SIDE: Premium Visual Panel */}
                <div className="salon-auth-visual">
                    <div className="salon-visual-overlay" />
                    <div className="salon-visual-content">
                        <div className="salon-brand-meta">
                            <span className="salon-brand-tagline">Welcome Back To</span>
                            <h2 className="salon-brand-title">JOANAH BEAUTY HUB</h2>
                        </div>
                        <div className="v2-col-img-frame" style={{backgroundImage: `url(${joanah})`}}  />
                        <div className="salon-quote-group">
                            <p className="salon-quote-text">
                                "Indulge in tailored styling curated specifically for you."
                            </p>
                            <div className="salon-quote-divider" />
                            <p className="salon-quote-sub">
                                Access your personalized profile, booking history, and elite care schedules.
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: Login Form Panel */}
                <div className="salon-auth-form-container">
                    <div className="salon-form-header">
                        <h1 className="salon-form-title">Login To Continue</h1>
                        <p className="salon-form-subtitle">Please enter your credentials to access your portal.</p>
                    </div>

                    {/* Premium Error Layout Banner */}
                    {error && (
                        <div className="salon-error-banner">
                            <span className="salon-error-dot" />
                            <span className="salon-error-text">{error}</span>
                        </div>
                    )}

                    <div className="salon-interactive-form">
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
                            <div className="salon-label-flex" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <label className="salon-input-label">Password</label>
                                <button type="button" className="salon-forgot-inline-btn" style={{ background: "none", border: "none", fontSizing: "11px", color: "var(--accent-gold)", cursor: "pointer", fontFamily: "var(--font-sans)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: "500" }}>
                                    Forgot?
                                </button>
                            </div>
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
                                onClick={() => loginUser()}
                                disabled={loading}
                                className="salon-submit-btn"
                            >
                                {loading ? (
                                    <span className="salon-loading-flex">
                                        <svg className="salon-spinner" fill="none" viewBox="0 0 24 24">
                                            <circle className="salon-spinner-bg" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="salon-spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Authenticating Profile...
                                    </span>
                                ) : "Sign In"}
                            </button>
                        </div>
                    </div>

                    {/* Navigation Footer */}
                    <div className="salon-form-footer">
                        <p className="salon-footer-text"> 
                            Don't have an elite profile?{" "}
                            <Link to={"/"} className="salon-footer-link">
                                SignUp Here
                            </Link>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default LoginPage;
