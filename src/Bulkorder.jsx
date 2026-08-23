import { useState } from "react";
import "./Style.css";
const API_BASE = "http://localhost/dastr-khwan-backend";

export default function BulkOrder() {
    const [form, setForm] = useState({
        event_type: "",
        guest_count: "",
        event_date: "",
        event_time: "",
        menu_requirements: "",
        contact_number: "",
    });
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Aaj ki date se compare karke check karta hai ke event date
    // kam se kam 1 din aage hai ya nahi
    const isDateTooSoon = (selectedDate) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const chosenDate = new Date(selectedDate);
        chosenDate.setHours(0, 0, 0, 0);

        const oneDayInMs = 24 * 60 * 60 * 1000;
        const diff = chosenDate - today;

        return diff < oneDayInMs; // agar 1 din se kam hai to true (bohat jaldi hai)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setIsError(false);

        if (isDateTooSoon(form.event_date)) {
            setIsError(true);
            setMessage(
                "Sorry, we can't take urgent basis orders. Bulk orders require at least 1 day advance notice — please choose a later date."
            );
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${API_BASE}/add_bulk_order.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            setIsError(!data.success);
            setMessage(data.message);

            if (data.success) {
                setForm({
                    event_type: "",
                    guest_count: "",
                    event_date: "",
                    event_time: "",
                    menu_requirements: "",
                    contact_number: "",
                });
            }
        } catch (err) {
            setIsError(true);
            setMessage("Could not connect to the server. Please check if XAMPP is running.");
        }

        setLoading(false);
    };

    // Minimum date jo user select kar sakta hai (kal ki date)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];

    return (
        <div className="feature-container">
            <h2 className="feature-title">Big Orders / Event Booking</h2>
            <p className="feature-subtitle">
                For weddings, parties, or office events — please book at least 1 day in advance
            </p>

            <form onSubmit={handleSubmit} className="feature-form">
                <input
                    type="text"
                    name="event_type"
                    placeholder="Event Type (e.g. Wedding, Office Party)"
                    value={form.event_type}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="guest_count"
                    placeholder="Number of Guests"
                    value={form.guest_count}
                    onChange={handleChange}
                    required
                />
                <label>Event Date (minimum 1 day advance)</label>
                <input
                    type="date"
                    name="event_date"
                    value={form.event_date}
                    onChange={handleChange}
                    min={minDate}
                    required
                />
                <label>Event Time</label>
                <input
                    type="time"
                    name="event_time"
                    value={form.event_time}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="menu_requirements"
                    placeholder="Menu Requirements / Special Requests"
                    value={form.menu_requirements}
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
                <button type="submit" className="feature-btn" disabled={loading}>
    {loading ? 'Submitting...' : 'Submit Request'}
</button>

                {message && (
                    <p
                        className="feature-message"
                        style={isError ? { color: "#c0392b", fontWeight: 600 } : {}}
                    >
                        {isError ? "⚠️ " : "✅ "}
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
}