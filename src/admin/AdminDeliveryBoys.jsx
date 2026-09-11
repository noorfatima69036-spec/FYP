import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";

const API_BASE = "http://localhost/dastr-khwan-backend";

function AdminDeliveryBoys() {
    const [boys, setBoys] = useState([]);
    const [form, setForm] = useState({ name: "", phone: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        const admin = localStorage.getItem("admin");
        if (!admin) {
            navigate("/admin/login");
            return;
        }
        fetchBoys();
    }, []);

    const fetchBoys = () => {
        fetch(`${API_BASE}/admin/get_delivery_boys.php`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) setBoys(data.delivery_boys);
            });
    };

        const handleChange = (e) => {
        // Phone field ke liye: sirf digits allow karo, aur 11 numbers tak limit karo
        if (e.target.name === "phone") {
            const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 11);
            setForm({ ...form, phone: digitsOnly });
            return;
        }
        // Name field ke liye: sirf letters aur space allow karo
        if (e.target.name === "name") {
            const lettersOnly = e.target.value.replace(/[^a-zA-Z\s]/g, "");
            setForm({ ...form, name: lettersOnly });
            return;
        }
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        // Submit se pehle phone number ki length check kar lo
                // Submit se pehle sab fields validate kar lo
        if (form.name.trim().length < 3) {
            setMessage("Please enter a valid full name.");
            return;
        }
        if (form.phone.length !== 11) {
            setMessage("Phone number must be 11 digits long (e.g., 03001234567).");
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(form.email)) {
            setMessage("Please enter a valid email address.");
            return;
        }
        if (form.password.length < 6) {
            setMessage("Password must be at least 6 characters long.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/admin/add_delivery_boy.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            setMessage(data.message);
            if (data.success) {
                setForm({ name: "", phone: "", email: "", password: "" });
                fetchBoys();
            }
        } catch (err) {
            setMessage("Server error");
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Do you want to delete this delivery boy?")) return;
        try {
            const res = await fetch(`${API_BASE}/admin/delete_delivery_boy.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            const data = await res.json();
            if (data.success) {
                fetchBoys();
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert("Server error");
        }
    };

    return (
        <AdminLayout pageTitle="Delivery Boys">
            <h2>Manage Delivery Boys</h2>

            <form onSubmit={handleSubmit} className="admin-menu-form">
                <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} inputMode="numeric" required />
                <input type="email" name="email" placeholder="Email (for login)" value={form.email} onChange={handleChange} required />
                                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password (min 6 chars)"
                        value={form.password}
                        onChange={handleChange}
                        style={{ paddingRight: '35px' }}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute',
                            right: '8px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '16px',
                            padding: 0
                        }}
                    >
                        {showPassword ? '🙈' : '👁️'}
                    </button>
                </div>
                <button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Delivery Boy"}</button>
            </form>

            {message && <p style={{ marginBottom: "15px" }}>{message}</p>}

            <table className="admin-orders-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {boys.map((boy) => (
                        <tr key={boy.id}>
                            <td>{boy.id}</td>
                            <td>{boy.name}</td>
                            <td>{boy.phone}</td>
                            <td>{boy.email}</td>
                            <td>
                                <button onClick={() => handleDelete(boy.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </AdminLayout>
    );
}

export default AdminDeliveryBoys;
