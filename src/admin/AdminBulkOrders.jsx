import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";

const API_BASE = "http://localhost/dastr-khwan-backend";

// This page shows all bulk order requests submitted by customers,
// including the dishes and quantities they selected.
function AdminBulkOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const admin = localStorage.getItem("admin");
        if (!admin) {
            navigate("/admin/login");
            return;
        }
        fetch(`${API_BASE}/admin/get_bulk_orders.php`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) setOrders(data.bulk_orders);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <AdminLayout pageTitle="Bulk Orders">
                <p className="admin-loading-text">Loading bulk order requests...</p>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout pageTitle="Bulk Orders">
            {orders.length === 0 ? (
                <p style={{ color: "#888" }}>No bulk order requests yet.</p>
            ) : (
                <table className="admin-orders-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Event Type</th>
                            <th>Guests</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Address</th>
                            <th>Contact</th>
                            <th>Dishes</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.event_type}</td>
                                <td>{order.guest_count}</td>
                                <td>{order.event_date}</td>
                                <td>{order.event_time}</td>
                                <td>{order.address}</td>
                                <td>{order.contact_number}</td>
                                <td>
                                    {order.items.map((item, i) => (
                                        <div key={i} style={{ fontSize: "13px" }}>
                                            {item.item_name} (Qty: {item.quantity})
                                        </div>
                                    ))}
                                </td>
                                <td>Rs. {order.total_amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </AdminLayout>
    );
}

export default AdminBulkOrders;