import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost/dastr-khwan-backend";

function DeliveryLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/delivery_login.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (data.success) {
                localStorage.setItem("deliveryBoy", JSON.stringify(data.delivery_boy));
                navigate("/delivery/dashboard");
            } else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            setError("Could not connect to the server.");
        }
        setLoading(false);
    };

    return (
        <div className="delivery-login-page">
            <div className="delivery-login-card">
                <div className="delivery-login-icon">🚴</div>
                <h2 className="delivery-login-title">Delivery Partner Login</h2>
                <p className="delivery-login-subtitle">Dastr-Khwan Delivery Team</p>
                <form onSubmit={handleLogin}>
                    <div className="admin-form-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="admin-form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    {error && <p className="admin-error-text">{error}</p>}
                    <button type="submit" disabled={loading} className="delivery-login-btn">
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default DeliveryLogin;