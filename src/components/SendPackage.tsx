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

    console.log("📦 [SEND PACKAGE] Form submitted");
    console.log("📦 [SEND PACKAGE] Sender:", formData.sender);
    console.log("📦 [SEND PACKAGE] Receiver:", formData.receiver);
    console.log("📦 [SEND PACKAGE] Email:", formData.email);

    // Always include a default location
    const packageData = {
      ...formData,
      pickupLat: defaultLocation.lat,
      pickupLng: defaultLocation.lng,
    };

    try {
      // Format data for the bookings API
      const bookingData = {
        service: formData.weight ? `Package delivery (${formData.weight}kg)` : "Package delivery",
        customer_name: formData.sender,
        email: formData.email,
        phone: ""
      };

      console.log("📤 [SEND PACKAGE] Sending booking request to API");
      console.log("📤 [SEND PACKAGE] Booking data:", bookingData);

      const response = await fetch(
        "https://deliverieseasy.onrender.com/api/bookings",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        }
      );

      console.log("📥 [SEND PACKAGE] Response status:", response.status);
      const responseData = await response.json();
      console.log("📥 [SEND PACKAGE] Response data:", responseData);

      if (response.ok) {
        console.log("✅ [SEND PACKAGE] Package sent successfully!");
        console.log("📧 [SEND PACKAGE] Confirmation email should be sent to:", formData.email);
        alert("Package sent successfully! Check your email for confirmation.");
        setFormData({
          sender: "",
          receiver: "",
          email: "",
          pickupAddress: "",
          deliveryAddress: "",
          weight: "",
        });
      } else {
        console.log("❌ [SEND PACKAGE] Failed:", responseData.message || "Something went wrong");
        alert("Something went wrong!");
      }
    } catch (err) {
      console.error("❌ [SEND PACKAGE] Error:", err);
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
