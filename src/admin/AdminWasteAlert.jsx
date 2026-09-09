import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";

const API_BASE = "http://localhost/dastr-khwan-backend";

function AdminWasteAlert() {
  const [message, setMessage] = useState("Today's leftover food is available");
  const [phone, setPhone] = useState("+92 320 5811056");
  const [currentAlert, setCurrentAlert] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (!admin) {
      navigate("/admin/login");
      return;
    }
    checkCurrentAlert();
  }, []);

  const checkCurrentAlert = () => {
    fetch(`${API_BASE}/admin/get_active_waste_alert.php`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.active) {
          setCurrentAlert({ message: data.message, phone: data.phone });
        } else {
          setCurrentAlert(null);
        }
      });
  };

  const handlePost = async (e) => {
    e.preventDefault();
    setStatusMsg("");
    try {
      const res = await fetch(`${API_BASE}/admin/post_waste_alert.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, phone }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg("✅ Waste alert has been activated — it is now visible to customers.");
        checkCurrentAlert();
      } else {
        setStatusMsg("❌ " + data.message);
      }
    } catch (err) {
      setStatusMsg("❌ Server error");
    }
  };

  const handleDeactivate = async () => {
    try {
      const res = await fetch(`${API_BASE}/admin/deactivate_waste_alert.php`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        setStatusMsg("Alert has been turned off");
        setCurrentAlert(null);
      }
    } catch (err) {
      setStatusMsg("❌ Server error");
    }
  };

   return (
    <AdminLayout pageTitle="Waste Alert">
      <h2>Waste Alert</h2>

      <div style={{ marginBottom: "20px", padding: "12px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <strong>Current Status: </strong>
        {currentAlert ? (
          <span style={{ color: "green" }}>🟢 Active — "{currentAlert.message}"</span>
        ) : (
          <span style={{ color: "gray" }}>⚪ There are no active alerts</span>
        )}
      </div>

      <form onSubmit={handlePost} className="admin-menu-form" style={{ flexDirection: "column", alignItems: "flex-start" }}>
        <label>Message</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "100%" }}
          required
        />
        <label>Contact Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ width: "100%" }}
          required
        />
        <div style={{ marginTop: "10px" }}>
          <button type="submit">Post / Activate Alert</button>
          {currentAlert && (
            <button type="button" onClick={handleDeactivate} style={{ marginLeft: "10px" }}>
              Deactivate Alert
            </button>
          )}
        </div>
      </form>

       {statusMsg && <p style={{ marginTop: "10px" }}>{statusMsg}</p>}
    </AdminLayout>
  );
}

export default AdminWasteAlert;