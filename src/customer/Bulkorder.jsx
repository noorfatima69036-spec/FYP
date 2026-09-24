import { useState, useEffect } from "react";
import "../Style.css";

const API_BASE = "https://api.dastrkhwan.site";

const CATEGORY_LABELS = {
    appetizers: "Appetizers",
    maincourse: "Main Course",
    rice: "Rice & Biryani",
    bfm: "Breakfast Menu",
    drinks: "Drinks",
    extra: "Extras",
    desserts: "Desserts",
    deals: "Deals",
};

export default function BulkOrder() {
    const [menuItems, setMenuItems] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [quantities, setQuantities] = useState({});
    const [unitTypes, setUnitTypes] = useState({});
    const [cart, setCart] = useState([]);
    const [step, setStep] = useState("building");

    const [form, setForm] = useState({
        event_type: "",
        guest_count: "",
        event_date: "",
        event_time: "",
        address: "",
        menu_requirements: "",
        contact_number: "",
    });
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(`${API_BASE}/admin/get_menu_items.php`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    const grouped = {};
                    data.items.forEach((item) => {
                        if (!grouped[item.category]) grouped[item.category] = [];
                        grouped[item.category].push(item);
                    });
                    setMenuItems(grouped);
                }
            });
    }, []);

    // Handlers with input restrictions
    const handleFormChange = (e) => {
        const { name, value } = e.target;

        // Restriction 1: Event Type (Only alphabets & spaces)
        if (name === "event_type") {
            const regex = /^[a-zA-Z\s]*$/;
            if (!regex.test(value)) return;
        }

        // Restriction 2: Contact Number (Only numbers, max 11 digits)
        if (name === "contact_number") {
            const regex = /^[0-9]*$/;
            if (!regex.test(value) || value.length > 11) return;
        }

        // Restriction 3: Guest Count (Positive integers only)
        if (name === "guest_count") {
            if (value !== "" && (Number(value) < 1 || value.includes("."))) return;
        }

        setForm({ ...form, [name]: value });
    };

    const handleQuantityChange = (itemId, value) => {
        if (value !== "" && Number(value) <= 0) return;
        setQuantities({ ...quantities, [itemId]: value });
    };

    const handleUnitChange = (itemId, unit) => {
        setUnitTypes({ ...unitTypes, [itemId]: unit });
    };

    const getDefaultUnit = (item) => {
        if (item.price_per_box) return "box";
        if (item.price_per_kg) return "kg";
        return null;
    };

    const getUnitPrice = (item, unit) => {
        return unit === "kg" ? Number(item.price_per_kg) : Number(item.price_per_box);
    };

    const handleAddItem = (item) => {
        const qty = parseInt(quantities[item.id]);
        if (!qty || qty <= 0) {
            alert("Please enter a valid positive quantity for this dish.");
            return;
        }

        const unit = unitTypes[item.id] || getDefaultUnit(item);
        if (!unit) {
            alert("This dish has no bulk pricing set. Please contact admin.");
            return;
        }

        const unitPrice = getUnitPrice(item, unit);

        setCart((prev) => {
            const existing = prev.find((c) => c.id === item.id && c.unit_type === unit);
            if (existing) {
                return prev.map((c) =>
                    c.id === item.id && c.unit_type === unit ? { ...c, quantity: qty } : c
                );
            }
            return [
                ...prev,
                { id: item.id, name: item.name, category: item.category, unit_type: unit, price: unitPrice, quantity: qty },
            ];
        });
        setQuantities({ ...quantities, [item.id]: "" });
    };

    const handleRemoveItem = (itemId, unitType) => {
        setCart((prev) => prev.filter((c) => !(c.id === itemId && c.unit_type === unitType)));
    };

    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const isDateTooSoon = (selectedDate) => {
        if (!selectedDate) return true;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const chosenDate = new Date(selectedDate);
        chosenDate.setHours(0, 0, 0, 0);
        return (chosenDate - today) < 24 * 60 * 60 * 1000;
    };

    const handleProceedToSummary = (e) => {
        e.preventDefault();

        // Field Validation Checks
        if (!form.event_type.trim()) {
            alert("Please enter the Event Type.");
            return;
        }

        const guestNum = Number(form.guest_count);
        if (!form.guest_count || guestNum < 10) {
            alert("Bulk orders require a minimum of 10 guests.");
            return;
        }

        if (!form.event_date || isDateTooSoon(form.event_date)) {
            alert("Orders must be placed at least 1 day in advance.");
            return;
        }

        if (!form.event_time) {
            alert("Please select Event Time.");
            return;
        }

        if (!form.address.trim()) {
            alert("Please enter the Event Address.");
            return;
        }

        // Pakistani Mobile Number validation (03XXXXXXXXX)
        const phoneRegex = /^03\d{9}$/;
        if (!phoneRegex.test(form.contact_number)) {
            alert("Please enter a valid 11-digit Pakistani contact number starting with 03 (e.g. 03001234567).");
            return;
        }

        if (cart.length === 0) {
            alert("Please select and add at least one dish to your order before proceeding.");
            return;
        }

        setStep("summary");
    };

    const handleFinalSubmit = async () => {
        setMessage("");
        setIsError(false);
        setLoading(true);

        const payload = {
            ...form,
            items: cart.map((item) => ({
                name: item.name,
                category: item.category,
                quantity: item.quantity,
                price: item.price,
                unit_type: item.unit_type,
            })),
            total_amount: cartTotal,
        };

        try {
            const res = await fetch(`${API_BASE}/admin/add_bulk_order.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            setIsError(!data.success);
            setMessage(data.message);
            if (data.success) {
                setForm({ event_type: "", guest_count: "", event_date: "", event_time: "", address: "", menu_requirements: "", contact_number: "" });
                setCart([]);
                setStep("building");
            }
        } catch (err) {
            setIsError(true);
            setMessage("Could not connect to the server. Please check your internet connection.");
        }
        setLoading(false);
    };

    // Min Date constraint: Tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];

    // ===================== SUMMARY SCREEN =====================
    if (step === "summary") {
        return (
            <div className="feature-container">
                <h2 className="feature-title">Review Your Bulk Order</h2>
                <div className="bulk-summary-box">
                    <h3>Event Details</h3>
                    <p><strong>Event Type:</strong> {form.event_type}</p>
                    <p><strong>Guests:</strong> {form.guest_count}</p>
                    <p><strong>Date:</strong> {form.event_date}</p>
                    <p><strong>Time:</strong> {form.event_time}</p>
                    <p><strong>Address:</strong> {form.address}</p>
                    <p><strong>Contact:</strong> {form.contact_number}</p>
                    {form.menu_requirements && <p><strong>Special Requests:</strong> {form.menu_requirements}</p>}
                    <hr />
                    <h3>Selected Dishes</h3>
                    {cart.map((item) => (
                        <div key={`${item.id}-${item.unit_type}`} className="bulk-summary-row">
                            <span>{item.name} ({item.category === "drinks" ? `${item.quantity}` : (item.unit_type === "kg" ? `${item.quantity} KG` : `${item.quantity} Box(es)`)})</span>
                            <span>Rs. {item.price * item.quantity}</span>
                        </div>
                    ))}
                    <hr />
                    <div className="bulk-summary-row bulk-summary-total">
                        <span>Total:</span>
                        <span>Rs. {cartTotal}</span>
                    </div>
                </div>
                <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                    <button className="feature-btn" onClick={() => setStep("building")} style={{ background: "#888" }}>← Edit Order</button>
                    <button className="feature-btn" onClick={handleFinalSubmit} disabled={loading}>
                        {loading ? "Submitting..." : "Confirm Bulk Order"}
                    </button>
                </div>
                {message && (
                    <p className="feature-message" style={isError ? { color: "#c0392b", fontWeight: 600 } : {}}>
                        {isError ? "⚠️ " : "✅ "}{message}
                    </p>
                )}
            </div>
        );
    }

    // ===================== BUILDING SCREEN =====================
    return (
        <div className="feature-container">
            <h2 className="feature-title">Big Orders / Event Booking</h2>
            <p className="feature-subtitle">
                For weddings, parties, or office events — please book at least 1 day in advance
            </p>

            {/* ===== SECTION 1: Event Details ===== */}
            <div className="bulk-section-box">
                <h3 className="bulk-section-title">📋 Event Details</h3>
                <form className="feature-form" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="text"
                        name="event_type"
                        placeholder="Event Type (e.g. Wedding, Office Party)"
                        value={form.event_type}
                        onChange={handleFormChange}
                        required
                    />
                    <input
                        type="number"
                        name="guest_count"
                        placeholder="Number of Guests (Min 10)"
                        min="10"
                        value={form.guest_count}
                        onChange={handleFormChange}
                        required
                    />
                    <label>Event Date (minimum 1 day advance)</label>
                    <input
                        type="date"
                        name="event_date"
                        value={form.event_date}
                        onChange={handleFormChange}
                        min={minDate}
                        required
                    />
                    <label>Event Time</label>
                    <input
                        type="time"
                        name="event_time"
                        value={form.event_time}
                        onChange={handleFormChange}
                        required
                    />
                    <textarea
                        name="address"
                        placeholder="Event Address"
                        value={form.address}
                        onChange={handleFormChange}
                        required
                    />
                    <textarea
                        name="menu_requirements"
                        placeholder="Menu Requirements / Special Requests"
                        value={form.menu_requirements}
                        onChange={handleFormChange}
                    />
                    <input
                        type="text"
                        name="contact_number"
                        placeholder="Contact Number (e.g. 03001234567)"
                        value={form.contact_number}
                        onChange={handleFormChange}
                        maxLength={11}
                        required
                    />
                </form>
            </div>

            {/* ===== SECTION 2: Dish Selection ===== */}
            <div className="bulk-section-box">
                <h3 className="bulk-section-title">🍽️ Select Your Dishes</h3>
                <p style={{ textAlign: "center", fontWeight: 700, color: "#a0522d", marginBottom: "15px" }}>
                    👇 Select your dishes below to build your order
                </p>

                <div className="bulk-category-tabs">
                    {Object.keys(menuItems)
                        .filter((cat) => cat !== "deals" && cat !== "extra")
                        .map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                className={`bulk-category-tab ${selectedCategory === cat ? "active" : ""}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {CATEGORY_LABELS[cat] || cat}
                            </button>
                        ))}
                </div>

                {selectedCategory && (
                    <div className="bulk-items-list">
                        {menuItems[selectedCategory]?.map((item) => {
                            const hasBox = item.price_per_box !== null && Number(item.price_per_box) > 0;
                            const hasKg = item.price_per_kg !== null && Number(item.price_per_kg) > 0;
                            const currentUnit = unitTypes[item.id] || getDefaultUnit(item);
                            const isDrink = item.category === "drinks";

                            if (!hasBox && !hasKg) return null;

                            return (
                                <div key={item.id} className="bulk-item-row" style={{ flexWrap: "wrap" }}>
                                    <span className="bulk-item-name">
                                        {item.name}
                                        {isDrink
                                            ? ` — Rs. ${item.price_per_box}`
                                            : (currentUnit === "kg"
                                                ? ` — Rs. ${item.price_per_kg}/kg`
                                                : ` — Rs. ${item.price_per_box}/box`)}
                                    </span>

                                    {!isDrink && hasBox && hasKg && (
                                        <div style={{ display: "flex", gap: "10px", margin: "4px 0" }}>
                                            <label style={{ fontSize: "13px", cursor: "pointer" }}>
                                                <input
                                                    type="radio"
                                                    name={`unit-${item.id}`}
                                                    checked={currentUnit === "box"}
                                                    onChange={() => handleUnitChange(item.id, "box")}
                                                /> Boxes (Rs. {item.price_per_box}/box)
                                            </label>
                                            <label style={{ fontSize: "13px", cursor: "pointer" }}>
                                                <input
                                                    type="radio"
                                                    name={`unit-${item.id}`}
                                                    checked={currentUnit === "kg"}
                                                    onChange={() => handleUnitChange(item.id, "kg")}
                                                /> KG (Rs. {item.price_per_kg}/kg)
                                            </label>
                                        </div>
                                    )}

                                    <input
                                        type="number"
                                        min="1"
                                        placeholder={isDrink ? "Quantity" : (currentUnit === "kg" ? "Quantity (kg)" : "Quantity (boxes)")}
                                        value={quantities[item.id] || ""}
                                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                        className="bulk-qty-input"
                                    />
                                    <button type="button" onClick={() => handleAddItem(item)} className="bulk-add-btn">
                                        Add
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                {cart.length > 0 && (
                    <div className="bulk-cart-box">
                        <h4>Your Selected Dishes:</h4>
                        {cart.map((item) => (
                            <div key={`${item.id}-${item.unit_type}`} className="bulk-cart-row">
                                <span>
                                    {item.name} — Qty: {item.quantity}{item.category === "drinks" ? "" : ` ${item.unit_type === "kg" ? "KG" : "Box(es)"}`} (Rs. {item.price * item.quantity})
                                </span>
                                <button type="button" onClick={() => handleRemoveItem(item.id, item.unit_type)} className="bulk-remove-btn">✖</button>
                            </div>
                        ))}
                        <p className="bulk-cart-running-total"><strong>Running Total: Rs. {cartTotal}</strong></p>
                    </div>
                )}
            </div>

            <button type="button" onClick={handleProceedToSummary} className="feature-btn">
                Proceed to Review →
            </button>
        </div>
    );
}