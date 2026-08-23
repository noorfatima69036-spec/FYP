import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost/dastr-khwan-backend";

function AdminWeeklyMenu() {
    const [weeklyMenu, setWeeklyMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusMsg, setStatusMsg] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const admin = localStorage.getItem("admin");
        if (!admin) {
            navigate("/admin/login");
            return;
        }
        fetchMenu();
    }, []);

    const fetchMenu = () => {
        fetch(`${API_BASE}/get_weekly_menu.php`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setWeeklyMenu(data.weekly_menu);
                }
                setLoading(false);
            });
    };

    const handleChange = (id, field, value) => {
        setWeeklyMenu((prev) =>
            prev.map((day) => (day.id === id ? { ...day, [field]: value } : day))
        );
    };

    const handleSave = async (day) => {
        setStatusMsg("");
        try {
            const res = await fetch(`${API_BASE}/update_weekly_menu.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: day.id,
                    main_item: day.main_item,
                    extra_item: day.extra_item,
                }),
            });
            const data = await res.json();
            if (data.success) {
                setStatusMsg(`✅ ${day.day_name} The restaurant's menu has been updated.`);
            } else {
                setStatusMsg("❌ " + data.message);
            }
        } catch (err) {
            setStatusMsg("❌ Server error");
        }
    };

    if (loading) return <p className="admin-loading-text">Loading...</p>;

    return (
        <div className="admin-dashboard-container">
            <h2>Manage Weekly Menu</h2>

            {statusMsg && <p style={{ marginBottom: "15px" }}>{statusMsg}</p>}

            <table className="admin-orders-table">
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Main Item</th>
                        <th>Extra Item</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {weeklyMenu.map((day) => (
                        <tr key={day.id}>
                            <td><strong>{day.day_name}</strong></td>
                            <td>
                                <input
                                    type="text"
                                    value={day.main_item}
                                    onChange={(e) => handleChange(day.id, "main_item", e.target.value)}
                                    style={{ width: "100%", padding: "6px" }}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={day.extra_item}
                                    onChange={(e) => handleChange(day.id, "extra_item", e.target.value)}
                                    style={{ width: "100%", padding: "6px" }}
                                />
                            </td>
                            <td>
                                <button onClick={() => handleSave(day)}>Save</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminWeeklyMenu;