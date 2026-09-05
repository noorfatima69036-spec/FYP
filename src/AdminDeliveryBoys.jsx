import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";

const API_BASE = "http://localhost/dastr-khwan-backend";

function AdminDeliveryBoys() {
    const [boys, setBoys] = useState([]);
    const [form, setForm] = useState({ name: "", phone: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
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
        fetch(`${API_BASE}/get_delivery_boys.php`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) setBoys(data.delivery_boys);
            });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/add_delivery_boy.php`, {
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

    return (
        <AdminLayout pageTitle="Delivery Boys">
            <h2>Manage Delivery Boys</h2>

            <form onSubmit={handleSubmit} className="admin-menu-form">
                <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email (for login)" value={form.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
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
                    </tr>
                </thead>
                <tbody>
                    {boys.map((boy) => (
                        <tr key={boy.id}>
                            <td>{boy.id}</td>
                            <td>{boy.name}</td>
                            <td>{boy.phone}</td>
                            <td>{boy.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </AdminLayout>
    );
}

export default AdminDeliveryBoys;