// src/components/AboutUs.tsx
import React from "react";
import { Users, Target, Globe } from "lucide-react";
import "./AboutUs.css";

const testimonialsData = [
  {
    quote: "QuickDeliver made my shipment so easy and fast. Highly recommend!",
    rating: 5,
    authorName: "Jane Doe",
    authorRole: "CEO, Acme Corp",
    authorImage: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote: "Reliable service, my packages always arrive on time.",
    rating: 4,
    authorName: "John Smith",
    authorRole: "Entrepreneur",
    authorImage: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote: "Their team is professional and very helpful. Excellent experience!",
    rating: 5,
    authorName: "Alice Johnson",
    authorRole: "Freelancer",
    authorImage: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    quote: "I trust QuickDeliver with my business shipments. Always on point!",
    rating: 5,
    authorName: "Michael Brown",
    authorRole: "Business Owner",
    authorImage: "https://randomuser.me/api/portraits/men/41.jpg",
  },
  {
    quote: "Fast, reliable, and the customer service is superb!",
    rating: 4,
    authorName: "Sara Wilson",
    authorRole: "Shop Owner",
    authorImage: "https://randomuser.me/api/portraits/women/52.jpg",
  },
  {
    quote: "The delivery tracking feature is amazing! I feel in control.",
    rating: 5,
    authorName: "David Lee",
    authorRole: "Consultant",
    authorImage: "https://randomuser.me/api/portraits/men/55.jpg",
  },
];

const AboutUs: React.FC = () => {
  return (
    <div className="about-container">
      {/* Header Section */}
      <header className="about-header">
        <h1>About QuickDeliver</h1>
        <p>Your trusted partner for fast, safe, and reliable deliveries.</p>
      </header>

      {/* Company Overview */}
      <section className="about-section">
        <h2>Who We Are</h2>
        <p>
          QuickDeliver was founded with a mission to make deliveries simple,
          affordable, and dependable. Whether you're sending a small package or
          managing large shipments, our team ensures every delivery reaches its
          destination safely and on time.
        </p>
      </section>

      {/* Mission, Vision, and Reach */}
      <section className="about-values">
        <div className="value-card">
          <Target size={40} className="value-icon" />
          <h3>Our Mission</h3>
          <p>
            To provide lightning-fast, secure, and transparent delivery services
            that make life easier for our customers.
          </p>
        </div>
        <div className="value-card">
          <Users size={40} className="value-icon" />
          <h3>Our Team</h3>
          <p>
            Our professional drivers, dispatchers, and support agents work
            around the clock to serve you 24/7 with care and precision.
          </p>
        </div>
        <div className="value-card">
          <Globe size={40} className="value-icon" />
          <h3>Our Reach</h3>
          <p>
            We deliver nationwide and are rapidly expanding across the region to
            make your logistics experience smoother than ever.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="about-cta">
        <h2>Join Thousands Who Trust QuickDeliver</h2>
        <p>
          Experience the easiest, fastest, and most secure delivery service
          today.
        </p>
        <button className="about-btn">Get Started</button>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <div className="testimonials-header">
            <h2 className="testimonials-title">What Our Customers Say</h2>
            <p className="testimonials-subtitle">
              Hear from our satisfied clients who trust QuickDeliver for their logistics needs.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonialsData.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-quote">❝</div>
                <div className="testimonial-rating">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="testimonial-text">{testimonial.quote}</p>
                <div className="testimonial-author">
                  <img
                    className="author-image"
                    src={testimonial.authorImage}
                    alt={testimonial.authorName}
                  />
                  <div className="author-info">
                    <h4>{testimonial.authorName}</h4>
                    <p>{testimonial.authorRole}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
