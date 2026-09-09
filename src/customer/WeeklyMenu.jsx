import { useEffect, useState } from "react";
import "../Style.css";

const API_BASE = "http://localhost/dastr-khwan-backend";

export default function WeeklyMenu() {
    const [weeklyMenu, setWeeklyMenu] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE}/admin/get_weekly_menu.php`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setWeeklyMenu(data.weekly_menu);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Weekly menu fetch error:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="admin-loading-text">Loading weekly menu...</p>;

    return (
        <div className="feature-container" style={{ maxWidth: "700px" }}>
            <h2 className="feature-title">Weekly Office Menu</h2>
            <p className="feature-subtitle">
                Every day's menu is decided by the Dastr-Khwan kitchen — fresh and balanced
            </p>

            <div className="weekly-menu-list">
                {weeklyMenu.map((day) => (
                    <div key={day.id} className="weekly-menu-row">
                        <div className="weekly-menu-day">{day.day_name}</div>
                        <div className="weekly-menu-details">
                            <p className="weekly-menu-main">{day.main_item}</p>
                            <p className="weekly-menu-extra">+ {day.extra_item}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}