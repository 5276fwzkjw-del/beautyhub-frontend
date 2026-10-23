import { useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
function UpdateUser() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: "",
        password: "",
        country: "",
        speciality: "",
        age: "",
        salary: "",
        phone: "",
        role: "staff"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpdate = async (e) => {
        const token = await localStorage.getItem('token');
        e.preventDefault();
        setLoading(true);
        setTimeout(async() => {    
            try {
                console.log(formData);
                const response = await fetch(`${BACKEND_URL}/api/v2/update`,{
                    method:'PUT',
                    headers:{
                        "Content-type":'application/json',
                        authorization:`Bearer ${token}`
                    },
                    body:JSON.stringify(formData),

                })
                console.log(response)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }, 1500);
    };

    return (
        <div className="salon-admin-modifier-card">
            <div className="salon-admin-header">
                <h1 className="salon-admin-title">Update Salon Staff</h1>
                <p className="salon-admin-subtitle">Modify existing credentials and privilege parameters within the master profile.</p>
            </div>

            <form onSubmit={handleUpdate} className="salon-admin-form">
                
                {/* SECTION: IDENTITY CREDS */}
                <div className="salon-form-section-title">Identity Overrides</div>
                <div className="salon-form-row-grid">
                    <div className="salon-admin-group">
                        <label className="salon-admin-label">Full Name</label>
                        <input type="text" placeholder="Update name" name="name" value={formData.name} onChange={handleChange} className="salon-admin-input" />
                    </div>
                    <div className="salon-admin-group">
                        <label className="salon-admin-label">Email Address</label>
                        <input type="email" placeholder="Update email" name="email" value={formData.email} onChange={handleChange} className="salon-admin-input" />
                    </div>
                    <div className="salon-admin-group">
                        <label className="salon-admin-label">Temporary Password</label>
                        <input type="password" placeholder="••••••••" name="password" value={formData.password} onChange={handleChange} className="salon-admin-input" />
                    </div>
                </div>

                {/* SECTION: GEOGRAPHY & CONTACT */}
                <div className="salon-form-section-title">Demographics & Address</div>
                <div className="salon-form-row-grid split-2">
                    <div className="salon-admin-group">
                        <label className="salon-admin-label">Select Country</label>
                        <select name="country" id="country" value={formData.country} onChange={handleChange} className="salon-admin-select">
                            <option value="">-- Leave Unchanged --</option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Uganda">Uganda</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Dubai">Dubai</option>
                            <option value="Kuwait">Kuwait</option>
                        </select>
                    </div>
                    <div className="salon-admin-group">
                        <label className="salon-admin-label">Contact Number (Phone)</label>
                        <input id="phone" type="number" placeholder="Phone Number" name="phone" value={formData.phone} onChange={handleChange} className="salon-admin-input" />
                    </div>
                </div>

                {/* SECTION: WORKING FIELD */}
                <div className="salon-form-section-title">Professional Parameters</div>
                <div className="salon-form-row-grid split-2">
                    <div className="salon-admin-group">
                        <label className="salon-admin-label">Speciality / Category</label>
                        <select name="speciality" id="speciality" value={formData.speciality} onChange={handleChange} className="salon-admin-select">
                            <option value="">-- Leave Unchanged --</option>
                            <option value="Hair">Hair Styling</option>
                            <option value="Makeup">Makeup Artist</option>
                            <option value="Nails">Nails Styling</option>
                            <option value="Facial">Facial Expert</option>
                        </select>
                    </div>
                    <div className="salon-admin-group">
                        <label className="salon-admin-label">Age Matrix</label>
                        <input type="number" placeholder="Age" id="age" name="age" value={formData.age} onChange={handleChange} className="salon-admin-input" />
                    </div>
                </div>

                {/* SECTION: COMP & PRIVILEGES */}
                <div className="salon-form-section-title">Compensation & Access Roles</div>
                <div className="salon-form-row-grid split-2">
                    <div className="salon-admin-group">
                        <label className="salon-admin-label">Monthly Salary (SAR)</label>
                        <input type="number" placeholder="Salary value in SAR" min="0" id="salary" name="salary" value={formData.salary} onChange={handleChange} className="salon-admin-input" />
                    </div>
                    <div className="salon-admin-group">
                        <label className="salon-admin-label">System Security Role</label>
                        <select name="role" id="role" value={formData.role} onChange={handleChange} className="salon-admin-select">
                            <option value="staff">Regular Employee</option>
                            <option value="manager">Store Manager</option>
                            <option value="admin">System Admin</option>
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
                                Committing Variations...
                            </span>
                        ) : "Commit Profile Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateUser;
