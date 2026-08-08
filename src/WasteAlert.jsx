import { useEffect, useState } from "react";
import "./Style.css";

// ============ SETTINGS ============
const ALERT_HOUR = 16;      // 20 = 8 PM (24-hour format)
const ALERT_MINUTE = 0;
const CONTACT_NUMBER = "+92 320 5811056";
// ===================================

export default function WasteAlert() {
  const [showDot, setShowDot] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const isAfterAlertTime =
        now.getHours() > ALERT_HOUR ||
        (now.getHours() === ALERT_HOUR && now.getMinutes() >= ALERT_MINUTE);

      setShowDot(isAfterAlertTime);
    };

    checkTime();
    const interval = setInterval(checkTime, 20000);
    return () => clearInterval(interval);
  }, []);

  if (!showDot) return null;

  return (
    <div className="waste-dot-wrapper">
      {expanded && (
        <div className="waste-dot-card">
          <p>🍲Today's leftover food is available</p>
          <p className="waste-alert-phone">📞 {CONTACT_NUMBER}</p>
          <p className="waste-dot-note">First come, first serve</p>
        </div>
      )}
      <div className="waste-red-dot" onClick={() => setExpanded(!expanded)}></div>
    </div>
  );
}