import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../Style.css";

const API_BASE = "http://localhost/dastr-khwan-backend";

const stages = [
  { key: "pending", label: "Order Received" },
  { key: "preparing", label: "Preparing" },
  { key: "cooking", label: "Cooking" },
  { key: "packing", label: "Packing" },
  { key: "ready", label: "Ready / Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

export default function LiveKitchen() {
  const { orderId } = useParams();
  const [status, setStatus] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

const [rating, setRating] = useState(0);
const [comment, setComment] = useState("");
const [reviewSubmitted, setReviewSubmitted] = useState(false);
const [reviewError, setReviewError] = useState("");
const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    const fetchStatus = () => {
      fetch(`${API_BASE}/orders/get_order_status.php?order_id=${orderId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setStatus(data.status);
            setPaymentMethod(data.payment_method);
            setPaymentStatus(data.payment_status);
            setErrorMsg("");
          } else {
            setErrorMsg(data.message || "Order not found.");
          }
          setLoading(false);
        })
        .catch(() => {
          setErrorMsg("Could not connect to the server.");
          setLoading(false);
        });
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 8000);
    return () => clearInterval(interval);
  }, [orderId]);

  
const handleSubmitReview = async () => {
    setReviewError("");
    if (rating === 0) {
        setReviewError("Please select a star rating.");
        return;
    }

    const user_id = localStorage.getItem('userId');
    setReviewLoading(true);

    try {
        const res = await fetch(`${API_BASE}/orders/submit_review.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                order_id: orderId,
                user_id: user_id,
                rating: rating,
                comment: comment,
            }),
        });
        const data = await res.json();
        if (data.success) {
            setReviewSubmitted(true);
        } else {
            setReviewError(data.message);
        }
    } catch (err) {
        setReviewError("Could not connect to the server.");
    }
    setReviewLoading(false);
};

  if (loading) return <p className="admin-loading-text">Loading order status...</p>;

  if (errorMsg) {
    return (
      <div className="kitchen-tracker">
        <p style={{ textAlign: "center", color: "red" }}>{errorMsg}</p>
        <p style={{ textAlign: "center" }}><Link to="/home">Back to Home</Link></p>
      </div>
    );
  }

  // Agar online payment hai aur abhi verify nahi hui, to order confirm nahi hua
  const isPaymentPending = paymentMethod === "online" && paymentStatus === "pending_verification";

  if (isPaymentPending) {
    return (
      <div className="kitchen-tracker">
        <h2 className="feature-title">Live Kitchen</h2>
        <p className="feature-subtitle">Order #{orderId}</p>
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <p style={{ color: "#c0392b", fontWeight: 700, fontSize: "18px" }}>
            ⏳ Order Not Confirmed Yet
          </p>
          <p style={{ color: "#666", marginTop: "10px" }}>
            Your payment has not been verified yet. As soon as it is verified, your order will start being prepared.
          </p>
        </div>
      </div>
    );
  }

  const currentStageIndex = stages.findIndex((s) => s.key === status);
  const isCancelled = status === "cancelled";

  return (
    <div className="kitchen-tracker">
      <h2 className="feature-title">Live Kitchen</h2>
      <p className="feature-subtitle">Order #{orderId} — Track your order live</p>

      {isCancelled ? (
        <p style={{ textAlign: "center", color: "red", fontWeight: 600, marginTop: "30px" }}>
          ❌ Your order has been cancelled.
        </p>
      ) : (
        <>
          <div className="progress-steps">
            {stages.map((stage, index) => (
              <div className="progress-step" key={stage.key}>
                <div
                  className={`step-circle ${
                    index < currentStageIndex
                      ? "done"
                      : index === currentStageIndex
                      ? "active"
                      : ""
                  }`}
                >
                  {index < currentStageIndex ? "✓" : index + 1}
                </div>
                <div className={`step-label ${index === currentStageIndex ? "active" : ""}`}>
                  {stage.label}
                </div>
              </div>
            ))}
          </div>

          <p style={{ textAlign: "center", marginTop: "30px", color: "#a0522d", fontWeight: 600 }}>
            {status === "delivered" ? (
    <>
        <p style={{ textAlign: "center", marginTop: "30px", color: "#a0522d", fontWeight: 600 }}>
            Your Food has been Delivered! 🎉
        </p>

        {reviewSubmitted ? (
            <p style={{ textAlign: "center", color: "green", fontWeight: 600, marginTop: "15px" }}>
                ✅ Thank you for your feedback!
            </p>
        ) : (
            <div style={{ maxWidth: "400px", margin: "20px auto", textAlign: "center" }}>
                <h4 style={{ color: "#a0522d" }}>Rate Your Order</h4>
                <div style={{ fontSize: "28px", margin: "10px 0" }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onClick={() => setRating(star)}
                            style={{
                                cursor: "pointer",
                                color: star <= rating ? "#f5a623" : "#ddd",
                            }}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <textarea
                    className="checkout-input textarea"
                    placeholder="Share your experience (optional)"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    style={{ width: "100%", minHeight: "70px" }}
                />
                {reviewError && (
                    <p style={{ color: "red", fontSize: "13px", marginTop: "8px" }}>{reviewError}</p>
                )}
                <button
                    onClick={handleSubmitReview}
                    disabled={reviewLoading}
                    className="confirm-order-btn"
                    style={{ marginTop: "10px" }}
                >
                    {reviewLoading ? "Submitting..." : "Submit Review"}
                </button>
            </div>
        )}
    </>
) : (
    <p style={{ textAlign: "center", marginTop: "30px", color: "#a0522d", fontWeight: 600 }}>
        Status: {stages[currentStageIndex]?.label || status}...
    </p>
)}
          </p>
        </>
      )}
    </div>
  );
}