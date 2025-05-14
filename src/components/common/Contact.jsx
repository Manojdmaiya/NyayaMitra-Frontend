import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import '../../styles/Contact.css';

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('Sending...');

    emailjs.sendForm(
      'service_x0puq5v',
      'template_8yf2brb',
      form.current,
      'GBJ0r1HfPvp6hqAMl'
    )
      .then(() => {
        setStatus('Email sent successfully!');
        form.current.reset();
      })
      .catch(() => {
        setStatus('Failed to send email. Please try again.');
      });
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p className="contact-subtitle">
          Have a question, feedback, or need assistance? We'd love to hear from you.
        </p>
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Your Name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="your@email.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input id="subject" name="subject" type="text" placeholder="Subject" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" placeholder="Type your message here..." required></textarea>
          </div>
          <button className="submit-btn" type="submit">Send Message</button>
        </form>
        {status && <p style={{ textAlign: 'center', marginTop: '20px', color: '#333' }}>{status}</p>}
      </div>
    </div>
  );
};

export default Contact;
