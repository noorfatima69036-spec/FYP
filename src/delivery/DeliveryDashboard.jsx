import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost/dastr-khwan-backend";

function DeliveryDashboard() {
    const [orders, setOrders] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deliveryBoy, setDeliveryBoy] = useState(null);
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [periodOrders, setPeriodOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const stored = localStorage.getItem("deliveryBoy");
        if (!stored) {
            navigate("/delivery/login");
            return;
        }
        const boy = JSON.parse(stored);
        setDeliveryBoy(boy);
        fetchOrders();
        fetchStats(boy.id);
        // Refresh every 8 seconds so accepted-by-others orders disappear automatically
        const interval = setInterval(() => {
            fetchOrders();
            fetchStats(boy.id);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const fetchOrders = () => {
        fetch(`${API_BASE}/orders/get_ready_orders.php`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) setOrders(data.orders);
                setLoading(false);
            });
    };

    const fetchStats = (boyId) => {
        fetch(`${API_BASE}/delivery/get_delivery_stats.php?delivery_boy_id=${boyId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) setStats(data.stats);
            });
    };
    const handleCardClick = (periodKey) => {
    const boy = JSON.parse(localStorage.getItem("deliveryBoy"));
    setSelectedPeriod(periodKey);
    fetch(`${API_BASE}/get_orders_by_period.php?delivery_boy_id=${boy.id}&period=${periodKey}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.success) setPeriodOrders(data.orders);
        });
};

    const handleAccept = async (orderId) => {
        const boy = JSON.parse(localStorage.getItem("deliveryBoy"));
        try {
            const res = await fetch(`${API_BASE}/orders/accept_order.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ order_id: orderId, delivery_boy_id: boy.id }),
            });
            const data = await res.json();
            if (data.success) {
                fetchOrders();
                fetchStats(boy.id);
            } else {
                alert(data.message);
                fetchOrders();
            }
        } catch (err) {
            alert("Could not be accepted");
        }
    };

    const handleMarkDelivered = async (orderId) => {
        const boy = JSON.parse(localStorage.getItem("deliveryBoy"));
        try {
            const res = await fetch(`${API_BASE}/delivery/mark_delivered.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ order_id: orderId, delivery_boy_id: boy.id }),
            });
            const data = await res.json();
            if (data.success) {
                fetchOrders();
                fetchStats(boy.id);
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert("Could not be updated");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("deliveryBoy");
        navigate("/delivery/login");
    };

    if (loading) return <p className="admin-loading-text">Loading orders...</p>;

    const myAcceptedOrders = orders.filter((o) => Number(o.delivery_boy_id) === Number(deliveryBoy?.id));
    const availableOrders = orders.filter((o) => o.delivery_status === "pending");

    // Stat cards definition
   const statCards = stats ? [
    { label: "Today", value: stats.today, key: "today" },
    { label: "Yesterday", value: stats.yesterday, key: "yesterday" },
    { label: "This Week", value: stats.this_week, key: "this_week" },
    { label: "Last Week", value: stats.last_week, key: "last_week" },
    { label: "This Month", value: stats.this_month, key: "this_month" },
    { label: "Last Month", value: stats.last_month, key: "last_month" },
    { label: "Total Accepted", value: stats.total_accepted, key: "total_accepted" },
    { label: "Total Delivered", value: stats.total_delivered, key: "total_delivered" },
] : [];

    return (
        <div className="admin-dashboard-container">
            <div className="delivery-header-banner">
                <h2>🚴 Welcome, {deliveryBoy?.name}</h2>
                <button onClick={handleLogout} className="admin-logout-btn">Logout</button>
            </div>

            {/* ===== Delivery Statistics ===== */}
            <div className="delivery-section-box">
                <h3 className="delivery-section-title">📊 My Delivery Stats</h3>
                <div className="admin-stats-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
    {statCards.map((card) => (
        <div
            key={card.label}
            className={`admin-stat-card admin-stat-card-clickable ${selectedPeriod === card.key ? "active" : ""}`}
            onClick={() => handleCardClick(card.key)}
        >
            <p className="admin-stat-card-label">{card.label}</p>
            <p className="admin-stat-card-value">{card.value}</p>
        </div>
    ))}
</div>

{selectedPeriod && (
    <div style={{ marginTop: "20px" }}>
        <h4 style={{ color: "#a0522d", textTransform: "capitalize" }}>
            {selectedPeriod.replace(/_/g, " ")} — Orders
        </h4>
        {periodOrders.length === 0 ? (
            <p style={{ color: "#888" }}>No orders found for this period.</p>
        ) : (
            <table className="admin-orders-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Total</th>
                        <th>Payment</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {periodOrders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.full_name}</td>
                            <td>{order.phone}</td>
                            <td>{order.address}</td>
                            <td>Rs. {order.total_amount}</td>
                            <td>
                                {order.payment_method === "online" ? (
                                    order.payment_status === "verified" ? (
                                        <span style={{ color: "green", fontWeight: "bold" }}>✅ Paid Online</span>
                                    ) : (
                                        <span style={{ color: "orange", fontWeight: "bold" }}>⏳ Pending</span>
                                    )
                                ) : (
                                    <span>💵 COD</span>
                                )}
                            </td>
                            <td style={{ textTransform: "capitalize" }}>{order.delivery_status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
)}
            </div>

            {/* ===== My Accepted Orders ===== */}
            <div className="delivery-section-box">
            <h3 className="delivery-section-title">📦 My Accepted Deliveries</h3>
            {myAcceptedOrders.length === 0 ? (
                <p style={{ color: "#888" }}>You haven't accepted any orders yet.</p>
            ) : (
                <table className="admin-orders-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myAcceptedOrders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.full_name}</td>
                                <td>{order.phone}</td>
                                <td>{order.address}</td>
                                <td>
                                    {order.items.map((item, i) => (
                                        <div key={i}>{item.item_name} x{item.quantity}</div>
                                    ))}
                                </td>
                                <td>Rs. {order.total_amount}</td>
                                <td>
                                    {order.payment_method === "online" ? (
                                        order.payment_status === "verified" ? (
                                            <span style={{ color: "green", fontWeight: "bold" }}>✅ Paid Online</span>
                                        ) : (
                                            <span style={{ color: "orange", fontWeight: "bold" }}>⏳ Payment Pending</span>
                                        )
                                    ) : (
                                        <span>💵 Cash on Delivery</span>
                                    )}
                                </td>
                                <td>
                                    {order.delivery_status === "delivered" ? (
                                        <span style={{ color: "green", fontWeight: "bold" }}>✅ Delivered</span>
                                    ) : (
                                        <span style={{ color: "#a0522d", fontWeight: "bold" }}>🚴 Accepted by You</span>
                                    )}
                                </td>
                                <td>
                                    {order.delivery_status !== "delivered" && (
                                        <button onClick={() => handleMarkDelivered(order.id)}>Mark Delivered</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            </div>

            {/* ===== Available Orders (not accepted yet by anyone) ===== */}
            <div className="delivery-section-box delivery-available-box">
            <h3 className="delivery-section-title">🆕 Available Orders to Accept</h3>
            {availableOrders.length === 0 ? (
                <p style={{ color: "#888" }}>No new orders available right now.</p>
            ) : (
                <table className="admin-orders-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Address</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {availableOrders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.full_name}</td>
                                <td>{order.address}</td>
                                <td>
                                    {order.items.map((item, i) => (
                                        <div key={i}>{item.item_name} x{item.quantity}</div>
                                    ))}
                                </td>
                                <td>Rs. {order.total_amount}</td>
                                <td>
                                    {order.payment_method === "online" ? (
                                        order.payment_status === "verified" ? (
                                            <span style={{ color: "green", fontWeight: "bold" }}>✅ Paid Online</span>
                                        ) : (
                                            <span style={{ color: "orange", fontWeight: "bold" }}>⏳ Payment Pending</span>
                                        )
                                    ) : (
                                        <span>💵 Cash on Delivery</span>
                                    )}
                                </td>
                                <td>
                                    <button onClick={() => handleAccept(order.id)}>Accept</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            </div>
        </div>
    );
}

export default DeliveryDashboard;