import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";

const STATUS_OPTIONS = ['pending', 'preparing', 'cooking', 'packing', 'ready', 'delivered', 'cancelled'];

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) {
      navigate("/admin/login");
      return;
    }
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost/dastr-khwan-backend/get_all_orders.php");
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      } else {
        setError("Failed to load orders.");
      }
    } catch (err) {
      setError("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch("http://localhost/dastr-khwan-backend/update_order_status.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Status update failed.");
    }
  };

  const handleVerifyPayment = async (orderId) => {
    try {
        const res = await fetch("http://localhost/dastr-khwan-backend/verify_payment.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ order_id: orderId }),
        });
        const data = await res.json();
        if (data.success) {
            setOrders((prev) =>
                prev.map((o) => (o.id === orderId ? { ...o, payment_status: 'verified' } : o))
            );
        } else {
            alert(data.message);
        }
    } catch (err) {
        alert("Payment verification failed.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

 if (loading) return <AdminLayout pageTitle="Orders"><p className="admin-loading-text">Loading orders...</p></AdminLayout>;
  if (error) return <AdminLayout pageTitle="Orders"><p className="admin-error-text">{error}</p></AdminLayout>;

  return (
    <AdminLayout pageTitle="Orders">
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
        <th>Delivery</th>
        <th>Date</th>
    </tr>
</thead>
        <tbody>
          {orders.map((order) => (
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
    {order.payment_method === 'online' ? (
        <div style={{ fontSize: '13px' }}>
            <strong>Online</strong><br/>
            TID: {order.transaction_id}<br/>
            {order.payment_status === 'verified' ? (
                <span style={{ color: 'green', fontWeight: 'bold' }}>✅ Verified</span>
            ) : (
                <>
                    <span style={{ color: 'orange', fontWeight: 'bold' }}>⏳ Pending</span><br/>
                    <button onClick={() => handleVerifyPayment(order.id)} style={{ marginTop: '4px', fontSize: '12px', padding: '3px 8px' }}>
                        Verify Payment
                    </button>
                </>
            )}
        </div>
    ) : (
        <span>Cash on Delivery</span>
    )}
</td>
<td>
    <select
        value={order.status}
        onChange={(e) => handleStatusChange(order.id, e.target.value)}
        className="admin-status-select"
    >
        {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
        ))}
    </select>
</td>
              <td>
    {order.delivery_status === 'delivered' ? (
        <span style={{ color: 'green', fontWeight: 'bold' }}>✅ Delivered</span>
    ) : order.delivery_status === 'accepted' ? (
        <span style={{ color: '#a0522d', fontWeight: 'bold' }}>🚴 {order.delivery_boy_name}</span>
    ) : (
        <span style={{ color: '#888' }}>⏳ Not accepted yet</span>
    )}
</td>
<td>{order.created_at}</td>
            </tr>
          ))}
           </tbody>
      </table>
    </AdminLayout>
  );
}

export default AdminDashboard;