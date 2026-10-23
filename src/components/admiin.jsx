import AddEmployee from "./AddEmployee.jsx";
import UpdateUser from "./UpdateUser.jsx";
import image from "../image/image.jpg";
import { useState, useEffect } from "react";
import { UploadSiteImage, UploadUSerProfile } from "./Upload.jsx";

function Admin() {
    const token = localStorage.getItem("token");
    const [users, setUsers] = useState([]);
    
    /* Dynamic state tracker to manage the visible workspace panel */
    const [activeTab, setActiveTab] = useState("credentials");
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/v2/getAll`, {
                    method: "GET",
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error("Error: " + data.message);
                }
                const employee = data.users.filter(
                    (client) => client.role !== "client"
                );
                setUsers(employee);
            } catch (error) {
                console.log(error);
            }
        };
        getAllUsers();
    }, []);
    return (
        <div className="v2-admin-dashboard-root">
            
            {/* STICKY DASHBOARD NAVBAR WITH DYNAMIC CLICK ROUTING */}
            <header className="v2-admin-nav-wrapper">
                <div className="v2-admin-nav-inner">
                    <div className="v2-admin-nav-logo-group" onClick={() => setActiveTab("credentials")} style={{ cursor: "pointer" }}>
                        <span className="v2-admin-brand-main">JOANAH</span>
                        <span className="v2-admin-brand-sub">CONTROL PANEL</span>
                    </div>
                    <nav className="v2-admin-nav-links">
                        <button 
                            onClick={() => setActiveTab("credentials")} 
                            className={`v2-admin-tab-btn ${activeTab === "credentials" ? "v2-tab-active" : ""}`}
                        >
                            Active Credentials
                        </button>
                        <button 
                            onClick={() => setActiveTab("onboarding")} 
                            className={`v2-admin-tab-btn ${activeTab === "onboarding" ? "v2-tab-active" : ""}`}
                        >
                            Onboard Staff
                        </button>
                        <button 
                            onClick={() => setActiveTab("utilities")} 
                            className={`v2-admin-tab-btn ${activeTab === "utilities" ? "v2-tab-active" : ""}`}
                        >
                            Media Configurations
                        </button>
                    </nav>
                </div>
            </header>

            {/* DYNAMIC DASHBOARD INTERACTIVE CENTRAL WORKSPACE */}
            <main className="v2-admin-workspace-pane">
                
                {/* PANEL ONE: ACTIVE CREDENTIALS VIEW */}
                {activeTab === "credentials" && (
                    <section className="v2-admin-section animate-fade-in">
                        <div className="v2-admin-section-header">
                            <span className="v2-admin-mini-tag">CENTRAL ACCESS SYSTEM</span>
                            <h2 className="v2-admin-section-main-title">All Employee Credentials</h2>
                            <p className="v2-admin-section-subtitle">Manage system privilege tokens, specialist parameters, and direct reporting lines.</p>
                        </div>

                        <div className="v2-admin-grid-layout">
                            {users.map((employee) => (
                                <div className="v2-employee-card" key={employee._id}>
                                    <div className="v2-employee-card-top-row">
                                        <div className="v2-employee-avatar-wrapper">
                                            <img src={image} alt={employee.name} className="v2-employee-avatar-img" />
                                        </div>
                                        <span className={`v2-role-badge v2-role-${employee.role}`}>
                                            {employee.role}
                                        </span>
                                    </div>
                                    <div className="v2-employee-card-body">
                                        <h3 className="v2-employee-name-heading">{employee.name}</h3>
                                        <div className="v2-employee-details-matrix">
                                            <div className="v2-detail-metric-line">
                                                <span className="v2-metric-label-el">Email Contact:</span>
                                                <span className="v2-metric-value-el">{employee.email}</span>
                                            </div>
                                            <div className="v2-detail-metric-line">
                                                <span className="v2-metric-label-el">Age Variable:</span>
                                                <span className="v2-metric-value-el">{employee.age} Years Old</span>
                                            </div>
                                            <div className="v2-detail-metric-line">
                                                <span className="v2-metric-label-el">Country Origin:</span>
                                                <span className="v2-metric-value-el">{employee.country}</span>
                                            </div>
                                            <div className="v2-detail-metric-line">
                                                <span className="v2-metric-label-el">Phone Identity:</span>
                                                <span className="v2-metric-value-el">{employee.phone || "N/A"}</span>
                                            </div>
                                            <div className="v2-detail-metric-line">
                                                <span className="v2-metric-label-el">Speciality Line:</span>
                                                <span className="v2-metric-value-el v2-speciality-highlight">{employee.speciality || "Unassigned"}</span>
                                            </div>
                                            <div className="v2-detail-metric-line">
                                                <span className="v2-metric-label-el">Monthly Comp:</span>
                                                <span className="v2-metric-value-el v2-salary-highlight">{employee.salary} SAR</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="v2-employee-card-footer-supervisor">
                                        <span className="v2-supervisor-indicator-lbl">Direct Hierarchy:</span>
                                        {employee.supervisor ? (
                                            <span className="v2-supervisor-profile-active">
                                                {employee.supervisor.name} <span className="v2-supervisor-role-tag">({employee.supervisor.role})</span>
                                            </span>
                                        ) : (
                                            <span className="v2-supervisor-profile-none">Independent Specialist</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* PANEL TWO: REGISTER / ONBOARD NEW EMPLOYEE PROFILE */}
                {activeTab === "onboarding" && (
                    <section className="v2-admin-section animate-fade-in v2-section-alt">
                        <AddEmployee users={users} />
                    </section>
                )}

                {/* PANEL THREE: MEDIA CONFIGURATIONS & ASSET FILE MANAGEMENT */}
                {activeTab === "utilities" && (
                    <section className="v2-admin-section animate-fade-in" id="utilities">
                        <div className="v2-admin-section-header">
                            <span className="v2-admin-mini-tag">SYSTEM PARAMETERS</span>
                            <h2 className="v2-admin-section-main-title">Media & Profile Tuning</h2>
                            <p className="v2-admin-section-subtitle">Calibrate structural interface assets, override lookbook matrices, and sync active permission keys.</p>
                        </div>

                        <div className="v2-admin-utilities-wrapper">
                            <div className="v2-utility-card-block">
                                <UpdateUser />
                            </div>
                            <div className="v2-utility-card-block">
                                <UploadSiteImage />
                            </div>
                            <div className="v2-utility-card-block">
                                <UploadUSerProfile token={token} />
                            </div>
                        </div>
                    </section>
                )}

            </main>
        </div>
    );
}

export default Admin;
