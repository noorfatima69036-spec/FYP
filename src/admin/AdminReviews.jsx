import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";

const API_BASE = "http://localhost/dastr-khwan-backend";

function AdminReviews() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const admin = localStorage.getItem("admin");
        if (!admin) {
            navigate("/admin/login");
            return;
        }
        fetchReviews();
    }, []);

    const fetchReviews = () => {
        fetch(`${API_BASE}/admin/get_reviews.php`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) setReviews(data.reviews);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    const renderStars = (rating) => {
        return "★".repeat(rating) + "☆".repeat(5 - rating);
    };

    if (loading) {
        return (
            <AdminLayout pageTitle="Customer Reviews">
                <p className="admin-loading-text">Loading reviews...</p>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout pageTitle="Customer Reviews">
            {reviews.length === 0 ? (
                <p style={{ color: "#888" }}>No reviews yet.</p>
            ) : (
                <table className="admin-orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Rating</th>
                            <th>Comment</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((r) => (
                            <tr key={r.id}>
                                <td>{r.order_id}</td>
                                <td>{r.customer_name}</td>
                                <td style={{ color: "#f5a623", fontWeight: "bold" }}>
                                    {renderStars(r.rating)}
                                </td>
                                <td>{r.comment || <span style={{ color: "#888" }}>No comment</span>}</td>
                                <td>{r.created_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </AdminLayout>
    );
}

export default AdminReviews;