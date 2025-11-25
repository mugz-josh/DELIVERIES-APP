import React, { useState } from "react";
import "./SendPackage.css";

const SendPackage: React.FC = () => {
  const [formData, setFormData] = useState({
    sender: "",
    receiver: "",
    email: "",
    pickupAddress: "",
    deliveryAddress: "",
    weight: "",
  });

  // Default manual location (Kampala)
  const defaultLocation = {
    lat: 0.3476,
    lng: 32.5825,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Always include a default location
    const packageData = {
      ...formData,
      pickupLat: defaultLocation.lat,
      pickupLng: defaultLocation.lng,
    };

    try {
      const response = await fetch(
        "https://backend-deliveries.onrender.com/api/send-package",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(packageData),
        }
      );

      if (response.ok) {
        alert("Package sent successfully!");
        setFormData({
          sender: "",
          receiver: "",
          email: "",
          pickupAddress: "",
          deliveryAddress: "",
          weight: "",
        });
      } else {
        alert("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending package!");
    }
  };

  return (
    <div className="send-package-form">
      <h2>Send a Package</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="sender"
          placeholder="Sender Name"
          value={formData.sender}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="receiver"
          placeholder="Receiver Name"
          value={formData.receiver}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="pickupAddress"
          placeholder="Pickup Address"
          value={formData.pickupAddress}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="deliveryAddress"
          placeholder="Delivery Address"
          value={formData.deliveryAddress}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="weight"
          placeholder="Package Weight (kg)"
          value={formData.weight}
          onChange={handleChange}
          required
        />
        <button type="submit">Send Package</button>
      </form>
    </div>
  );
};

export default SendPackage;
