import { useEffect, useState } from "react";
import "./Style.css";

const API_BASE = "http://localhost/dastr-khwan-backend";

export default function WasteAlert() {
  const [alert, setAlert] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const checkAlert = () => {
      fetch(`${API_BASE}/get_active_waste_alert.php`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.active) {
            setAlert({ message: data.message, phone: data.phone });
          } else {
            setAlert(null);
          }
        })
        .catch((err) => console.error("Waste alert fetch error:", err));
    };

    checkAlert();
    const interval = setInterval(checkAlert, 20000); // har 20 sec check karega
    return () => clearInterval(interval);
  }, []);

  if (!alert) return null;

  return (
    <div className="waste-dot-wrapper">
      {expanded && (
        <div className="waste-dot-card">
          <p>🍲 {alert.message}</p>
          <p className="waste-alert-phone">📞 {alert.phone}</p>
          <p className="waste-dot-note">First come, first serve</p>
        </div>
      )}
      <div className="waste-red-dot" onClick={() => setExpanded(!expanded)}></div>
    </div>
  );
}