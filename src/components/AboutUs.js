import React from 'react';
import './styles/AboutUs.css'; // Import the CSS file for styling

const AboutUs = () => {
  return (
    <div className="about-page">
      {/* Engaging Header */}
      <div className="about-header" >
        <div className="header-content">
          <h1>Empowering Readers Everywhere</h1>
          <p>Where Every Book Finds its Reader</p>
        </div>
      </div>

      {/* Your Story in a Visual Timeline */}
      <section className="timeline-section">
        <h2>Our Journey</h2>
        <div className="timeline">
          <div className="timeline-item">
            <h3>2010</h3>
            <p>Founded with a mission to make reading accessible to all.</p>
          </div>
          <div className="timeline-item">
            <h3>2015</h3>
            <p>Reached 1 million readers worldwide.</p>
          </div>
          {/* Add more timeline items as needed */}
        </div>
      </section>

      {/* Mission, Vision, and Values */}
      <section className="mission-section">
        <h2>Our Mission, Vision, and Values</h2>
        <div className="mission-content">
          <div className="mission-item">
            <h3>Mission</h3>
            <p>To make reading accessible and enjoyable for everyone.</p>
          </div>
          <div className="mission-item">
            <h3>Vision</h3>
            <p>To become the world’s most beloved eBook store.</p>
          </div>
          <div className="mission-item">
            <h3>Values</h3>
            <p>Passion, diversity, and a commitment to innovation.</p>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="team-section">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          {/* Example team member */}
          <div className="team-member">
            <img src="data:image/png;base64,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" alt="Team Member Name" />
            <h4>Jane Doe</h4>
            <p>CEO & Founder</p>
          </div>
          {/* Add more team members */}
        </div>
      </section>

      {/* Customer Testimonials and Reviews */}
      <section className="testimonials-section">
        <h2>What Our Readers Say</h2>
        <div className="testimonial-carousel">
          {/* Example testimonial */}
          <div className="testimonial">
            <p>“This eBook store has changed the way I read forever!”</p>
            <span>- A Happy Reader</span>
          </div>
          {/* Add more testimonials */}
        </div>
      </section>

      {/* Call to Action */}
    </div>
  );
};

export default AboutUs;
