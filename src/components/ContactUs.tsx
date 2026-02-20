import { useState } from "react";
import { Package, MapPin, User, DollarSign } from "lucide-react";
import "./ContactUs.css";

const OrderForm = () => {
  const [formData, setFormData] = useState({
    senderName: "",
    senderPhone: "",
    senderAddress: "",
    receiverName: "",
    receiverPhone: "",
    receiverAddress: "",
    packageType: "standard",
    packageWeight: "",
    packageDescription: "",
    pickupDate: "",
    deliveryType: "standard",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // ✅ FIXED: Use your deployed backend URL
      const response = await fetch("https://deliverieseasy.onrender.com/api/deliveries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("✅ Order submitted successfully!");
        setFormData({
          senderName: "",
          senderPhone: "",
          senderAddress: "",
          receiverName: "",
          receiverPhone: "",
          receiverAddress: "",
          packageType: "standard",
          packageWeight: "",
          packageDescription: "",
          pickupDate: "",
          deliveryType: "standard",
        });
      } else {
        setErrorMessage(data.error || "❌ Failed to submit order");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      setErrorMessage("❌ Network error, try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="order-form-section" id="order">
      <div className="order-form-container">
        <div className="order-form-header">
          <h2 className="order-form-title">Create New Delivery Order</h2>
          <p className="order-form-subtitle">
            Fill in the details below to schedule your delivery
          </p>
        </div>

        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <form className="order-form" onSubmit={handleSubmit}>
          {/* Sender Information */}
          <div className="form-section">
            <div className="form-section-header">
              <User size={24} />
              <h3>Sender Information</h3>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="senderName">Full Name</label>
                <input
                  type="text"
                  id="senderName"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="senderPhone">Phone Number</label>
                <input
                  type="tel"
                  id="senderPhone"
                  name="senderPhone"
                  value={formData.senderPhone}
                  onChange={handleChange}
                  placeholder="+2 (567) 543-16375"
                  required
                />
              </div>
              <div className="form-group form-group-full">
                <label htmlFor="senderAddress">Pickup Address</label>
                <input
                  type="text"
                  id="senderAddress"
                  name="senderAddress"
                  value={formData.senderAddress}
                  onChange={handleChange}
                  placeholder="123 Main Street, City, State, ZIP"
                  required
                />
              </div>
            </div>
          </div>

          {/* Receiver Information */}
          <div className="form-section">
            <div className="form-section-header">
              <MapPin size={24} />
              <h3>Receiver Information</h3>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="receiverName">Full Name</label>
                <input
                  type="text"
                  id="receiverName"
                  name="receiverName"
                  value={formData.receiverName}
                  onChange={handleChange}
                  placeholder="Jane Smith"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="receiverPhone">Phone Number</label>
                <input
                  type="tel"
                  id="receiverPhone"
                  name="receiverPhone"
                  value={formData.receiverPhone}
                  onChange={handleChange}
                  placeholder="+1 (555) 987-6543"
                  required
                />
              </div>
              <div className="form-group form-group-full">
                <label htmlFor="receiverAddress">Delivery Address</label>
                <input
                  type="text"
                  id="receiverAddress"
                  name="receiverAddress"
                  value={formData.receiverAddress}
                  onChange={handleChange}
                  placeholder="456 Oak Avenue, City, State, ZIP"
                  required
                />
              </div>
            </div>
          </div>

          {/* Package Details */}
          <div className="form-section">
            <div className="form-section-header">
              <Package size={24} />
              <h3>Package Details</h3>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="packageType">Package Type</label>
                <select
                  id="packageType"
                  name="packageType"
                  value={formData.packageType}
                  onChange={handleChange}
                  required
                >
                  <option value="document">Document</option>
                  <option value="small">Small Package</option>
                  <option value="standard">Standard Package</option>
                  <option value="large">Large Package</option>
                  <option value="fragile">Fragile Item</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="packageWeight">Weight (kg)</label>
                <input
                  type="number"
                  id="packageWeight"
                  name="packageWeight"
                  value={formData.packageWeight}
                  onChange={handleChange}
                  placeholder="2.5"
                  step="0.1"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="pickupDate">Pickup Date</label>
                <input
                  type="date"
                  id="pickupDate"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="deliveryType">Delivery Type</label>
                <select
                  id="deliveryType"
                  name="deliveryType"
                  value={formData.deliveryType}
                  onChange={handleChange}
                  required
                >
                  <option value="express">Express (Same Day) - $15</option>
                  <option value="standard">Standard (2-3 Days) - $8</option>
                  <option value="economy">Economy (5-7 Days) - $5</option>
                </select>
              </div>
              <div className="form-group form-group-full">
                <label htmlFor="packageDescription">Package Description</label>
                <textarea
                  id="packageDescription"
                  name="packageDescription"
                  value={formData.packageDescription}
                  onChange={handleChange}
                  placeholder="Describe your package contents..."
                  rows={4}
                  required
                ></textarea>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() =>
                setFormData({
                  senderName: "",
                  senderPhone: "",
                  senderAddress: "",
                  receiverName: "",
                  receiverPhone: "",
                  receiverAddress: "",
                  packageType: "standard",
                  packageWeight: "",
                  packageDescription: "",
                  pickupDate: "",
                  deliveryType: "standard",
                })
              }
            >
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              <DollarSign size={20} />
              <span>{loading ? "Submitting..." : "Create Order & Pay"}</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default OrderForm;