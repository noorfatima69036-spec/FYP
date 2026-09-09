import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";

const API_BASE = "http://localhost/dastr-khwan-backend";

// This page shows all office membership subscription requests submitted by customers.
function AdminMemberships() {
    const [memberships, setMemberships] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const admin = localStorage.getItem("admin");
        if (!admin) {
            navigate("/admin/login");
            return;
        }
        fetch(`${API_BASE}/admin/get_memberships.php`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) setMemberships(data.memberships);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <AdminLayout pageTitle="Memberships">
                <p className="admin-loading-text">Loading membership requests...</p>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout pageTitle="Memberships">
            {memberships.length === 0 ? (
                <p style={{ color: "#888" }}>No membership requests yet.</p>
            ) : (
                <table className="admin-orders-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Office Name</th>
                            <th>Address</th>
                            <th>Plan</th>
                            <th>Delivery Time</th>
                            <th>Meal Preference</th>
                            <th>Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {memberships.map((m) => (
                            <tr key={m.id}>
                                <td>{m.id}</td>
                                <td>{m.office_name}</td>
                                <td>{m.office_address}</td>
                                <td style={{ textTransform: "capitalize" }}>{m.plan_type}</td>
                                <td>{m.delivery_time}</td>
                                <td>{m.meal_preference || "-"}</td>
                                <td>{m.contact_number}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </AdminLayout>
    );
}

export default AdminMemberships;