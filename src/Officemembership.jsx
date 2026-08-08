import { useState } from "react";
import { Link } from "react-router-dom";
import "./Style.css";

const plans = [
    { key: "daily", label: "Daily", desc: "Food delivered every day at a fixed time" },
    { key: "weekly", label: "Weekly", desc: "5 days a week" },
    { key: "monthly", label: "Monthly", desc: "Full month with discount" },
];

export default function OfficeMembership() {
    const [form, setForm] = useState({
        office_name: "",
        office_address: "",
        delivery_time: "",
        meal_preference: "",
        contact_number: "",
    });
    const [selectedPlan, setSelectedPlan] = useState("weekly");
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const memberships = JSON.parse(localStorage.getItem("memberships") || "[]");
        const newMembership = {
            ...form,
            plan_type: selectedPlan,
            id: Date.now(),
            status: "active",
            created_at: new Date().toLocaleString(),
        };
        memberships.push(newMembership);
        localStorage.setItem("memberships", JSON.stringify(memberships));
        setMessage("Your membership request has been submitted! We will contact you soon.");
        setForm({
            office_name: "",
            office_address: "",
            delivery_time: "",
            meal_preference: "",
            contact_number: "",
        });
    };

    return (
        <div className="feature-container">
            <h2 className="feature-title">Office Membership</h2>
            <p className="feature-subtitle">
                Subscribe your office for daily food delivery, at a fixed time
            </p>

            <p style={{ textAlign: "center", marginBottom: "16px" }}>
                <Link to="/weekly-menu" style={{ color: "#a0522d", fontWeight: "600", fontSize: "14px" }}>
                    📋 View this week's menu
                </Link>
            </p>

            <div className="plan-options">
                {plans.map((plan) => (
                    <div
                        key={plan.key}
                        className={`plan-card ${selectedPlan === plan.key ? "selected" : ""}`}
                        onClick={() => setSelectedPlan(plan.key)}
                    >
                        <h4>{plan.label}</h4>
                        <p>{plan.desc}</p>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="feature-form">
                <input
                    type="text"
                    name="office_name"
                    placeholder="Office Name"
                    value={form.office_name}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="office_address"
                    placeholder="Office Address"
                    value={form.office_address}
                    onChange={handleChange}
                    required
                />
                <label>Delivery Time</label>
                <input
                    type="time"
                    name="delivery_time"
                    value={form.delivery_time}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="meal_preference"
                    placeholder="Meal Preference (e.g. no spicy, veg only)"
                    value={form.meal_preference}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="contact_number"
                    placeholder="Contact Number"
                    value={form.contact_number}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="feature-btn">
                    Subscribe Now
                </button>
                {message && <p className="feature-message">{message}</p>}
            </form>
        </div>
    );
}