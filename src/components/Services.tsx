// src/components/Services.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Package,
  Truck,
  Clock,
  Shield,
  MapPin,
  Zap,
  CheckCircle,
  Users,
  CreditCard,
  Briefcase,
  Heart,
  DollarSign,
  UserCheck,
  ArrowRight,
  Building,
  BarChart3,
  Target,
  Cpu,
  Star,
  HeadphonesIcon,
  Globe,
} from "lucide-react";
import "./Services.css";

const Services: React.FC = () => {
  const navigate = useNavigate();

  const handleBookNow = (service: string) => {
    setSelectedService(service);
    setShowForm(true);
  };

  const [showForm, setShowForm] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const steps = [
    { icon: <Package size={40} />, number: "01", title: "Create Your Order", description: "Fill in package details, pickup and delivery addresses" },
    { icon: <MapPin size={40} />, number: "02", title: "Schedule Pickup", description: "Choose a convenient time for our driver to collect your package" },
    { icon: <Truck size={40} />, number: "03", title: "Track in Real-Time", description: "Monitor your package journey with live GPS tracking" },
    { icon: <CheckCircle size={40} />, number: "04", title: "Receive & Confirm", description: "Get instant notification when package is delivered" },
  ];

  const services = [
    { icon: <Zap size={32} />, title: "Express Delivery", description: "Same-day delivery for urgent packages within the city", price: "Starting at $15" },
    { icon: <Package size={32} />, title: "Standard Delivery", description: "Reliable delivery within 2-3 business days", price: "Starting at $8" },
    { icon: <Truck size={32} />, title: "Heavy Cargo", description: "Special handling for large and heavy items", price: "Starting at $25" },
    { icon: <Clock size={32} />, title: "Scheduled Pickup", description: "Choose your preferred pickup time and date", price: "Free scheduling" },
    { icon: <Shield size={32} />, title: "Insured Shipping", description: "Full insurance coverage for valuable items", price: "Starting at $5" },
    { icon: <MapPin size={32} />, title: "International", description: "Worldwide shipping to over 200 countries", price: "Custom quotes" },
  ];

  const featureCards = [
    { icon: <Users size={32} />, title: "SafeBoda Rides", description: "Motorcycle rides you can trust" },
    { icon: <CreditCard size={32} />, title: "Safe Car Rides", description: "Comfortable car rides for you" },
    { icon: <Briefcase size={32} />, title: "SafeBoda for Business", description: "Deliveries & services for companies" },
    { icon: <Heart size={32} />, title: "Customer First", description: "Your satisfaction is our priority" },
  ];

  const businessFeatures = [
    { icon: <Building size={32} />, title: "Delivery Support for Nairobi Businesses", description: "Tailored delivery solutions designed specifically for businesses in Nairobi" },
    { icon: <MapPin size={32} />, title: "Multi-stop Package Deliveries", description: "Efficient delivery routes with multiple stops to optimize your logistics" },
    { icon: <BarChart3 size={32} />, title: "Dedicated Business Dashboard", description: "Comprehensive dashboard to manage all your deliveries and track performance" },
    { icon: <Cpu size={32} />, title: "E-commerce Platform Integration", description: "Seamless integration with your e-commerce platform for automated order processing" },
    { icon: <Target size={32} />, title: "Corporate Offer Solutions", description: "Special corporate packages and pricing for business clients" },
    { icon: <Clock size={32} />, title: "Day-to-Day Errands", description: "Reliable service for daily business errands and urgent deliveries" },
  ];

  const bestServiceFeatures = [
    { icon: <Star size={32} />, title: "Local Market Expertise", description: "As a Kenyan business, we understand the local market best" },
    { icon: <HeadphonesIcon size={32} />, title: "Dedicated Local Support", description: "Local support team ready to serve you anytime" },
    { icon: <Shield size={32} />, title: "Peace of Mind", description: "SafeBoda offers you peace of mind for ride-hailing and package delivery" },
    { icon: <Globe size={32} />, title: "Comprehensive Services", description: "From rides to deliveries, we cover all your mobility needs" },
  ];

  const tumaFeatures = [
    { icon: <Truck size={32} />, title: "Mirotable", description: "Flexible and adaptable delivery solutions" },
    { icon: <MapPin size={32} />, title: "Live Tracking", description: "Real-time tracking of your packages and rides" },
    { icon: <Shield size={32} />, title: "Liarana Airways", description: "Secure and reliable delivery network" },
  ];

  const driverBenefits = [
    { icon: <DollarSign size={32} />, title: "Competitive Earnings", description: "Earn competitive rates with flexible working hours" },
    { icon: <Shield size={32} />, title: "Safety & Insurance", description: "Comprehensive insurance coverage for you and your vehicle" },
    { icon: <Truck size={32} />, title: "Vehicle Support", description: "Maintenance support and vehicle financing options" },
    { icon: <UserCheck size={32} />, title: "Career Growth", description: "Opportunities to grow from rider to business owner" },
    { icon: <Clock size={32} />, title: "Flexible Schedule", description: "Choose your own working hours and delivery areas" },
    { icon: <Users size={32} />, title: "Supportive Community", description: "Join a network of professional delivery partners" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ FIXED: Use your deployed backend URL
      const response = await fetch("https://backend-deliveries.onrender.com/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service: selectedService, ...formData }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Booking successful! You'll get a confirmation email.");
        setShowForm(false);
        setFormData({ customer_name: "", email: "", phone: "" });
      } else {
        alert("❌ Error: " + data.error);
      }
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* WHY SAFE BODA */}
      <section className="why-safeboda-section">
        <div className="why-safeboda-content">
          <div className="why-safeboda-text">
            <h2 className="why-safeboda-title">Why SafeBoda</h2>
            <p className="why-safeboda-description">
              We go beyond industry standards to ensure your safety on every ride. Our goal is simple — to give you safety, trust, and peace of mind with top-rated drivers.
            </p>
          </div>
          <div className="why-safeboda-visual">
            <img
              src="https://africanarguments.org/wp-content/uploads/2023/08/6-Formal-Delivery-Boda_8-1024x683.jpg"
              alt="SafeBoda Safety Commitment"
              className="why-safeboda-image"
            />
            <div className="why-safeboda-badge">
              <Shield size={24} />
              <span>Safety First</span>
            </div>
          </div>
        </div>
      </section>

      {/* WE DELIVER THE BEST SERVICE SECTION */}
      <section className="best-service-section">
        <div className="best-service-container">
          <div className="best-service-header">
            <h2 className="best-service-title">We deliver the best service</h2>
            <p className="best-service-description">
              SafeBoda offers you the peace of mind when it comes to ride-hailing and package delivery. 
              As a Kenyan business, we understand the local market best and have a dedicated local support 
              team ready to serve you.
            </p>
          </div>

          <div className="divider"></div>

          <div className="best-service-content">
            <div className="best-service-features">
              <h3 className="tuma-title">Tuma na SafeBoda</h3>
              <div className="tuma-features-grid">
                {tumaFeatures.map((feature, index) => (
                  <div key={index} className="tuma-feature-card">
                    <div className="tuma-feature-icon">{feature.icon}</div>
                    <h4 className="tuma-feature-title">{feature.title}</h4>
                    <p className="tuma-feature-description">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="service-benefits-grid">
              {bestServiceFeatures.map((feature, index) => (
                <div key={index} className="service-benefit-card">
                  <div className="service-benefit-icon">{feature.icon}</div>
                  <h3 className="service-benefit-title">{feature.title}</h3>
                  <p className="service-benefit-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SAFEBODA FOR BUSINESS SECTION */}
      <section className="business-section">
        <div className="business-container">
          <div className="business-header">
            <h2 className="business-title">SafeBoda for Business</h2>
            <p className="business-subtitle">
              Running a business? Let us handle your deliveries while you focus on growth.
            </p>
          </div>

          <div className="business-content">
            <div className="business-features-grid">
              {businessFeatures.map((feature, index) => (
                <div key={index} className="business-feature-card">
                  <div className="business-feature-icon">{feature.icon}</div>
                  <h3 className="business-feature-title">{feature.title}</h3>
                  <p className="business-feature-description">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="business-cta">
              <p className="business-cta-text">
                Perfect for e-commerce platforms, day-to-day errands, business deliveries, corporate offers
              </p>
              <button className="business-cta-button" onClick={() => handleBookNow("Business Solution")}>
                Get Business Solution <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM SERVICES */}
      <section className="hero-additional">
        <h2 className="section-title">Our Premium Services</h2>
        <div className="services-grid">
          {featureCards.map((card, i) => (
            <div key={i} className="service-card">
              <div className="service-icon">{card.icon}</div>
              <h4>{card.title}</h4>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BECOME A DRIVER SECTION */}
      <section className="driver-section">
        <div className="driver-container">
          <div className="driver-header">
            <h2 className="driver-title">Become a SafeBoda Driver</h2>
            <p className="driver-subtitle">
              Join our network of professional delivery partners and enjoy amazing benefits
            </p>
          </div>

          <div className="driver-benefits-grid">
            {driverBenefits.map((benefit, index) => (
              <div key={index} className="driver-benefit-card">
                <div className="driver-benefit-icon">{benefit.icon}</div>
                <h3 className="driver-benefit-title">{benefit.title}</h3>
                <p className="driver-benefit-description">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="driver-cta">
            <Link to="/become-driver" className="driver-cta-button">
              Join Our Team <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* DELIVERY SERVICES */}
      <section className="services-section" id="services">
        <div className="services-container">
          <div className="services-header">
            <h2 className="services-title">Our Delivery Services</h2>
            <p className="services-subtitle">
              Choose from our range of flexible delivery options tailored to your needs
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, i) => (
              <div key={i} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-price">{service.price}</div>
                <button className="service-btn" onClick={() => handleBookNow(service.title)}>
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {showForm && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Book {selectedService}</h3>
              <form onSubmit={handleSubmit}>
                <input type="text" name="customer_name" placeholder="Your Name" value={formData.customer_name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                <input type="tel" name="phone" placeholder="Your Phone (optional)" value={formData.phone} onChange={handleChange} />
                <div className="modal-actions">
                  <button type="submit" disabled={loading}>
                    {loading ? "Booking..." : "Confirm Booking"}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works-section">
        <h2 className="how-it-works-title">How It Works</h2>
        <div className="steps-container">
          {steps.map((step, i) => (
            <div key={i} className="step-card">
              <div className="step-number">{step.number}</div>
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Services;