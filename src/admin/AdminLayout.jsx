import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// This component wraps every admin page with a sidebar and top bar,
// so all admin screens share the same consistent layout.
function AdminLayout({ children, pageTitle }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const admin = JSON.parse(localStorage.getItem("admin") || "{}");

    const handleLogout = () => {
        localStorage.removeItem("admin");
        navigate("/admin/login");
    };

    // Navigation items shown in the sidebar
    const navItems = [
        { path: "/admin/dashboard-home", label: "Dashboard", icon: "📊" },
        { path: "/admin/dashboard", label: "Orders", icon: "🧾" },
        { path: "/admin/menu", label: "Menu", icon: "🍽️" },
        { path: "/admin/bulk-orders", label: "Bulk Orders", icon: "👥" },
        { path: "/admin/memberships", label: "Memberships", icon: "🏢" },
        { path: "/admin/delivery-boys", label: "Delivery Boys", icon: "🚴" },
        { path: "/admin/reviews", label: "Reviews", icon: "⭐" },
        { path: "/admin/waste-alert", label: "Waste Alert", icon: "⚠️" },
        { path: "/admin/weekly-menu", label: "Weekly Menu", icon: "📅" },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="admin-layout-wrapper">
            {/* ===== Sidebar ===== */}
            <aside className="admin-sidebar">
                <div className="admin-sidebar-logo">Dastr-Khwan</div>
                <nav className="admin-sidebar-nav">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`admin-sidebar-link ${isActive(item.path) ? "active" : ""}`}
                        >
                            <span className="admin-sidebar-icon">{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="admin-sidebar-footer">
                    <button className="admin-sidebar-link" onClick={() => alert("Settings page coming soon")}>
                        <span className="admin-sidebar-icon">⚙️</span>
                        Settings
                    </button>
                </div>
            </aside>

            {/* ===== Main content area ===== */}
            <div className="admin-main-area">
                {/* Top bar */}
                <div className="admin-topbar">
                    <h2 className="admin-topbar-title">{pageTitle || "Overview"}</h2>
                    <div className="admin-profile-menu-wrapper">
                        <div
                            className="admin-profile-trigger"
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                        >
                            <div className="admin-profile-avatar">A</div>
                            <span>{admin?.username || "Admin"}</span>
                            <span className="admin-profile-caret">▾</span>
                        </div>
                        {showProfileMenu && (
                            <div className="admin-profile-dropdown">
                                <button onClick={() => alert("Settings page coming soon")}>⚙️ Settings</button>
                                <button onClick={handleLogout}>🚪 Logout</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Page content */}
                <div className="admin-page-content">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;