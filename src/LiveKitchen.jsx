import { useEffect, useState } from "react";
import "./style.css";


// Customer order place karne ke baad is page par live status dekh sakta hai.
// Abhi demo ke liye stages automatically advance hoti hain (setInterval se).
// Jab backend ready ho, real status "kitchen_status" table se fetch hoga.

const stages = [
  { key: "received", label: "Order Received" },
  { key: "preparing", label: "Preparing" },
  { key: "cooking", label: "Cooking" },
  { key: "packing", label: "Packing" },
  { key: "ready", label: "Ready / Out for Delivery" },
];

export default function LiveKitchen() {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    // Demo simulation: har 4 second baad agla stage
    if (currentStage < stages.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStage((prev) => prev + 1);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [currentStage]);

  return (
    <div className="kitchen-tracker">
      <h2 className="feature-title">Live Kitchen</h2>
      <p className="feature-subtitle">
        Track your order live in the kitchen.....
      </p>

      <div className="progress-steps">
        {stages.map((stage, index) => (
          <div className="progress-step" key={stage.key}>
            <div
              className={`step-circle ${
                index < currentStage
                  ? "done"
                  : index === currentStage
                  ? "active"
                  : ""
              }`}
            >
              {index < currentStage ? "✓" : index + 1}
            </div>
            <div
              className={`step-label ${
                index === currentStage ? "active" : ""
              }`}
            >
              {stage.label}
            </div>
          </div>
        ))}
      </div>

      <p
        style={{
          textAlign: "center",
          marginTop: "30px",
          color: "#a0522d",
          fontWeight: 600,
        }}
      >
        {currentStage === stages.length - 1
          ? "Your Food is Ready! 🎉"
          : `Status: ${stages[currentStage].label}...`}
      </p>
    </div>
  );
}