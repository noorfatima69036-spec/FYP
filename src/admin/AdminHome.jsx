import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";

const API_BASE = "https://api.dastrkhwan.site";

function AdminHome() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState(null);
    const [detailData, setDetailData] = useState([]);
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
               
                if (data.success) setStats(data.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    const handleCardClick = (type) => {
    if (!type) return; 
    setSelectedType(type);
    
    fetch(`${API_BASE}/admin/get_dashboard_details.php?type=${type}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.success && Array.isArray(data.data)) {
                setDetailData(data.data);
            } else {
                setDetailData([]);
            }
        })
        .catch((err) => {
            console.error("Error fetching details:", err);
            setDetailData([]);
        });
};

    if (loading) {
        return (
            <AdminLayout pageTitle="Overview">
                <p className="admin-loading-text">Loading statistics...</p>
            </AdminLayout>
        );
    }

    const cards = [
        { label: "Total Orders", value: stats?.total_orders ?? 0, type: "total_orders" },
        { label: "Total Deliveries", value: stats?.total_deliveries ?? 0, type: "total_deliveries" },
        { label: "Bulk Order Requests", value: stats?.bulk_orders ?? 0, type: "bulk_orders" },
        { label: "Membership Offers", value: stats?.membership_offers ?? 0, type: "memberships" },
        { label: "Delivery Partners", value: stats?.delivery_boys ?? 0, type: "delivery_boys" },
        { label: "Contact Messages", value: stats?.contact_messages ?? 0, type: "contact_messages" },
        { label: "Total Revenue", value: `Rs. ${Number(stats?.total_revenue ?? 0).toLocaleString()}`, type: null },
    ];

    return (
        <AdminLayout pageTitle="Overview">
            <div className="admin-stats-grid">
                {cards.map((card) => (
                    <div
                        key={card.label}
                        className={`admin-stat-card ${card.type ? "admin-stat-card-clickable" : ""} ${selectedType === card.type ? "active" : ""}`}
                        onClick={() => handleCardClick(card.type)}
                    >
                        <p className="admin-stat-card-label">{card.label}</p>
                        <p className="admin-stat-card-value">{card.value}</p>
                    </div>
                ))}
            </div>

            {selectedType && (
    <div style={{ marginTop: "20px" }}>
        <h4 style={{ color: "#a0522d" }}>
            {cards.find((c) => c.type === selectedType)?.label} — Details
        </h4>
        {!Array.isArray(detailData) || detailData.length === 0 || !detailData[0] ? (
            <p style={{ color: "#888" }}>No records found.</p>
        ) : (
            <table className="admin-orders-table">
                <thead>
                    <tr>
                        {Object.keys(detailData[0] || {}).map((col) => (
                            <th key={col}>{col.replace(/_/g, " ").toUpperCase()}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {detailData.map((row, i) => (
                        <tr key={i}>
                            {Object.values(row || {}).map((val, j) => (
                                <td key={j}>{val ?? "-"}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
)}
        </AdminLayout>
    );
}

export default AdminHome;