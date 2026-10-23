import { useState } from "react";

function AddEmployee({ users }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        country: '',
        speciality: '',
        age: '',
        salary: '',
        phone: "",
        supervisor: '',
        role: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(prev => !prev);
        setTimeout(async () => {
            try {
                const res = await fetch(`${BACKEND_URL}/api/v2/createEmployee`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ...formData,
                        phone: Number(formData.phone),
                        age: parseInt(formData.age),
                        salary: parseInt(formData.salary)
                    })
                });
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.message);
                }
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    country: '',
                    speciality: '',
                    age: '',
                    salary: '',
                    phone: "",
                    supervisor: '',
                    role: ''
                });
                console.log(data.user);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }, 1500);
    };

    return (
        <div className="salon-admin-container">
            <div className="salon-admin-card">
                <div className="salon-admin-header">
                    <h1 className="salon-admin-title">Register New Salon Staff</h1>
                    <p className="salon-admin-subtitle">Establish official staff authorization coordinates within the central database.</p>
                </div>

                <form onSubmit={handleSubmit} className="salon-admin-form">
                    
                    {/* SECTION: IDENTITY CREDS */}
                    <div className="salon-form-section-title">Account Identity</div>
                    <div className="salon-form-row-grid">
                        <div className="salon-admin-group">
                            <label className="salon-admin-label">Full Name</label>
                            <input type="text" placeholder="e.g. Sarah Vance" name="name" value={formData.name} onChange={handleChange} className="salon-admin-input" required />
                        </div>
                        <div className="salon-admin-group">
                            <label className="salon-admin-label">Email Address</label>
                            <input type="email" placeholder="name@joanahbeauty.com" name="email" value={formData.email} onChange={handleChange} className="salon-admin-input" required />
                        </div>
                        <div className="salon-admin-group">
                            <label className="salon-admin-label">Temporary Password</label>
                            <input type="password" placeholder="••••••••" name="password" value={formData.password} onChange={handleChange} className="salon-admin-input" required />
                        </div>
                    </div>

                    {/* SECTION: GEOGRAPHY & CONTACT */}
                    <div className="salon-form-section-title">Demographics & Contact</div>
                    <div className="salon-form-row-grid split-2">
                        <div className="salon-admin-group">
                            <label className="salon-admin-label">Country Alignment</label>
                            <select name="country" value={formData.country} onChange={handleChange} className="salon-admin-select" required>
                                <option value="">-- Select Country --</option>
                                <option value="Saudi Arabia">Saudi Arabia</option>
                                <option value="Uganda">Uganda</option>
                                <option value="Kenya">Kenya</option>
                                <option value="Dubai">Dubai</option>
                                <option value="Kuwait">Kuwait</option>
                            </select>
                        </div>
                        <div className="salon-admin-group">
                            <label className="salon-admin-label">Contact Number (Phone)</label>
                            <input type="number" placeholder="Contact number digits" name="phone" value={formData.phone} onChange={handleChange} className="salon-admin-input" />
                        </div>
                    </div>

                    {/* SECTION: WORKING FIELD */}
                    <div className="salon-form-section-title">Professional Placement</div>
                    <div className="salon-form-row-grid split-2">
                        <div className="salon-admin-group">
                            <label className="salon-admin-label">Speciality Category</label>
                            <select name="speciality" value={formData.speciality} onChange={handleChange} className="salon-admin-select">
                                <option value="">-- Select Professional Line --</option>
                                <option value="Hair">Hair Styling</option>
                                <option value="Makeup">Makeup Artist</option>
                                <option value="Nail">Nails Styling</option>
                                <option value="Facial">Facial Expert</option>
                            </select>
                        </div>
                        <div className="salon-admin-group">
                            <label className="salon-admin-label">Age Matrix</label>
                            <input type="number" placeholder="Employee age" name="age" value={formData.age} onChange={handleChange} className="salon-admin-input" required />
                        </div>
                    </div>

                    {/* SECTION: FINANCIAL & PERMISSIONS */}
                    <div className="salon-form-section-title">Compensation & Authorities</div>
                    <div className="salon-form-row-grid split-3">
                        <div className="salon-admin-group">
                            <label className="salon-admin-label">Monthly Fixed Salary (SAR)</label>
                            <input type="number" placeholder="Salary value in SAR" min="0" name="salary" value={formData.salary} onChange={handleChange} className="salon-admin-input" required />
                        </div>
                        <div className="salon-admin-group">
                            <label className="salon-admin-label">System Security Role</label>
                            <select name="role" value={formData.role} onChange={handleChange} className="salon-admin-select" required>
                                <option value="">-- Select Access Role --</option>
                                <option value="staff">Regular Employee</option>
                                <option value="manager">Store Manager</option>
                                <option value="admin">System Admin</option>
                            </select>
                        </div>
                        <div className="salon-admin-group">
                            <label className="salon-admin-label">Direct Reporting Supervisor</label>
                            <select name="supervisor" value={formData.supervisor} onChange={handleChange} className="salon-admin-select">
                                <option value="">-- Select Supervisor Profile --</option>
                                {users && users.map((user) => (
                                    <option value={user._id} key={user._id}>
                                        {user.name} ({user.role})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* ACTION TRIGGER BUTTON */}
                    <div className="salon-admin-action-row">
                        <button type="submit" disabled={loading} className="salon-admin-submit-btn">
                            {loading ? (
                                <span className="salon-admin-loading-flex">
                                    <svg className="salon-admin-spinner" fill="none" viewBox="0 0 24 24">
                                        <circle className="salon-admin-spinner-bg" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="salon-admin-spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Provisioning Account...
                                </span>
                            ) : "Authorize New Staff Profile"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default AddEmployee;
