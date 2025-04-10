import React from 'react';
import '../styles/Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p className="contact-subtitle">
          Have a question, feedback, or need assistance? We'd love to hear from you.
        </p>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" placeholder="Your Name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="your@email.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input id="subject" type="text" placeholder="Subject" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows="5" placeholder="Type your message here..." required></textarea>
          </div>
          <button className="submit-btn" type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
