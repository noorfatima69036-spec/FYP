import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";

const API_BASE = "http://localhost/dastr-khwan-backend";

// This is the main admin overview page showing key statistics
function AdminHome() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const admin = localStorage.getItem("admin");
        if (!admin) {
            navigate("/admin/login");
            return;
        }
        fetchStats();
    }, []);

    const fetchStats = () => {
        fetch(`${API_BASE}/admin/get_dashboard_stats.php`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setStats(data.stats);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    if (loading) {
        return (
            <AdminLayout pageTitle="Overview">
                <p className="admin-loading-text">Loading statistics...</p>
            </AdminLayout>
        );
    }

    // Card definitions: label + which stat value to show
    const cards = [
        { label: "Total Orders", value: stats?.total_orders ?? 0 },
        { label: "Total Deliveries", value: stats?.total_delivered ?? 0 },
        { label: "Bulk Order Requests", value: stats?.total_bulk_orders ?? 0 },
        { label: "Membership Offers", value: stats?.total_memberships ?? 0 },
        { label: "Delivery Partners", value: stats?.total_delivery_boys ?? 0 },
        { label: "Total Revenue", value: `Rs. ${Number(stats?.total_revenue ?? 0).toLocaleString()}` },
    ];

    return (
        <AdminLayout pageTitle="Overview">
            <div className="admin-stats-grid">
                {cards.map((card) => (
                    <div key={card.label} className="admin-stat-card">
                        <p className="admin-stat-card-label">{card.label}</p>
                        <p className="admin-stat-card-value">{card.value}</p>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}

export default AdminHome;