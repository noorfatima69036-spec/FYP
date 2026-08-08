import "./Style.css";

// Admin/Chef decides the menu for each day here.
// Office members can view this before subscribing to see what they'll get.

const weeklyMenu = {
    Monday: { main: "Chicken Karahi + Roti", extra: "Salad + Raita" },
    Tuesday: { main: "Chicken Biryani", extra: "Raita + Salad" },
    Wednesday: { main: "Beef Pulao", extra: "Salad" },
    Thursday: { main: "Butter Chicken + Naan", extra: "Salad" },
    Friday: { main: "Mutton Karahi + Roti", extra: "Raita" },
    Saturday: { main: "Chicken Korma + Rice", extra: "Salad + Raita" },
    Sunday: { main: "Special Deal (Biryani + Drink)", extra: "Dessert" },
};

export default function WeeklyMenu() {
    return (
        <div className="feature-container" style={{ maxWidth: "700px" }}>
            <h2 className="feature-title">Weekly Office Menu</h2>
            <p className="feature-subtitle">
                Every day's menu is decided by the Dastr-Khwan kitchen — fresh and balanced
            </p>

            <div className="weekly-menu-list">
                {Object.entries(weeklyMenu).map(([day, meal]) => (
                    <div key={day} className="weekly-menu-row">
                        <div className="weekly-menu-day">{day}</div>
                        <div className="weekly-menu-details">
                            <p className="weekly-menu-main">{meal.main}</p>
                            <p className="weekly-menu-extra">+ {meal.extra}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}