import React, { useState } from "react";
import "./BecomeDriver.css";

const BecomeDriver: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Driver Application Submitted:", formData);
    setSubmitted(true);
  };

  return (
    <section className="become-driver-section">
      <div className="become-driver-container">
        <h1>Join the SafeBoda Team</h1>
        <p>Become a SafeBoda driver and start earning while making a difference in your community.</p>

        {!submitted ? (
          <form className="become-driver-form" onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Full Name" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="phone" type="tel" placeholder="Phone Number" onChange={handleChange} required />
            <input name="location" type="text" placeholder="Location" onChange={handleChange} required />
            <button type="submit" className="apply-btn">Apply Now</button>
          </form>
        ) : (
          <div className="success-message">
            <h3>✅ Thank you, {formData.name}!</h3>
            <p>Your application has been received. We’ll contact you soon.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BecomeDriver;
