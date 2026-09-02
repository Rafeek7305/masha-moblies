import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiClock, 
  FiSend, 
  FiCheckCircle, 
  FiMessageSquare,
  FiHelpCircle,
  FiSmartphone 
} from 'react-icons/fi';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending message
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 1000);
  };

  const faqs = [
    {
      q: 'Are all smartphones brand new with official warranty?',
      a: 'Yes, 100% of our new smartphones come in sealed original boxes with full brand warranty. We also provide certified pre-owned units with in-house warranty coverage.'
    },
    {
      q: 'How does the Mobile Exchange Offer work?',
      a: 'Bring your current phone to our showroom or specify details online. We run a instant diagnostic check and offer you the highest market trade-in value applied directly to your new phone.'
    },
    {
      q: 'What payment methods do you accept at the showroom?',
      a: 'We accept Cash, UPI (Google Pay, PhonePe, Paytm), Credit/Debit cards, Net Banking, and zero-cost EMI finance schemes from major banks.'
    },
    {
      q: 'Can I reserve a smartphone before visiting the store?',
      a: 'Absolutely! Send us a WhatsApp message with the model & color you want, and our team will reserve the stock for up to 24 hours.'
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.glowBg} />

      <div className={`${styles.container} container`}>
        {/* Header */}
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.tag}>Connect With Us</span>
          <h1 className={`${styles.title} text-gradient`}>Visit Or Get In Touch</h1>
          <p className={styles.subtitle}>
            Have questions about latest flagship phones, exchange values, or accessory compatibility? 
            Our mobile specialists are ready to assist you.
          </p>
        </motion.div>

        {/* Quick Info Cards */}
        <motion.div 
          className={styles.infoGrid}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <FiMapPin />
            </div>
            <h3>Showroom Address</h3>
            <p>Masha Mobiles Showroom, Main Tech Boulevard, City Center</p>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ marginTop: '0.8rem', display: 'inline-block' }}
            >
              Get Directions →
            </a>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <FiPhone />
            </div>
            <h3>Phone & Hotline</h3>
            <p>
              <a href="tel:+919876543210">+91 98765 43210</a><br />
              <a href="tel:+918765432109">+91 87654 32109</a>
            </p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <FiMail />
            </div>
            <h3>Email Desk</h3>
            <p>
              <a href="mailto:support@mashamobiles.com">support@mashamobiles.com</a><br />
              <a href="mailto:sales@mashamobiles.com">sales@mashamobiles.com</a>
            </p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <FiClock />
            </div>
            <h3>Store Timings</h3>
            <p>
              Mon - Sat: 9:30 AM - 9:30 PM<br />
              Sunday: 10:00 AM - 8:00 PM
            </p>
          </div>
        </motion.div>

        {/* Main Grid: Contact Form + Map & Direct Links */}
        <div className={styles.mainGrid}>
          {/* Contact Form */}
          <motion.div 
            className={styles.formCard}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Send Us A Message</h2>
              <p className={styles.formSub}>Fill in the form below and our store expert will get back to you promptly.</p>
            </div>

            {submitted && (
              <div className={styles.successBanner}>
                <FiCheckCircle size={22} />
                <span>Thank you! Your message has been sent successfully. We will reach out shortly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Your Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    placeholder="e.g. Rahul Sharma" 
                    className={styles.input}
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Mobile Number *</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    required 
                    placeholder="+91 98765 00000" 
                    className={styles.input}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="rahul@example.com" 
                    className={styles.input}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Subject</label>
                  <select 
                    name="subject" 
                    className={styles.select}
                    value={formData.subject}
                    onChange={handleChange}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Product Availability">Product Availability & Stock</option>
                    <option value="Exchange Valuation">Exchange Valuation Offer</option>
                    <option value="Price & Offers">Price & Discount Quote</option>
                    <option value="After Sales Support">After Sales & Warranty</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Your Message *</label>
                <textarea 
                  name="message" 
                  required 
                  placeholder="Tell us what smartphone or gadget you are looking for..." 
                  className={styles.textarea}
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={loading}
              >
                {loading ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <FiSend /> Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Map & Direct Connect Box */}
          <motion.div 
            className={styles.mapCard}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Live Showroom Google Map Iframe */}
            <div className={styles.mapWrapper}>
              <iframe 
                title="Masha Mobiles Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.751327129583!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8380f5385e3c746!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                className={styles.mapIframe}
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Direct Connect Buttons */}
            <div className={styles.directBox}>
              <h3 className={styles.directTitle}>Instant Connection</h3>
              <p className={styles.directSub}>Need immediate assistance or live stock availability? Connect directly via WhatsApp or Phone Call.</p>
              
              <div className={styles.directBtns}>
                <a 
                  href="https://wa.me/919876543210?text=Hi%20Masha%20Mobiles,%20I%20have%20an%20inquiry%20regarding%20smartphones." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={styles.whatsappBtn}
                >
                  <FaWhatsapp size={20} /> Chat on WhatsApp Live
                </a>

                <a href="tel:+919876543210" className={styles.callBtn}>
                  <FaPhoneAlt size={16} /> Call Showroom Directly
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Showroom FAQ Accordion Section */}
        <motion.div 
          className={styles.faqSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
          <p className={styles.faqSub}>Quick answers to common questions about buying, trading, and servicing at Masha Mobiles.</p>

          <div className={styles.faqGrid}>
            {faqs.map((faq, idx) => (
              <div key={idx} className={styles.faqCard}>
                <h4 className={styles.faqQuestion}>
                  <FiHelpCircle style={{ color: 'var(--primary-color)', flexShrink: 0 }} />
                  {faq.q}
                </h4>
                <p className={styles.faqAnswer}>{faq.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
