import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "../styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((previousState) => ({ ...previousState, [name]: value }));
  }

  return (
    <div className="dark-container page-mentors mb-0 mt-4">
      <h1 className="page-title" style={{ fontSize: 35 }}>
        Contact Us
      </h1>
      <div className="container">
        <div className="contact-form">
          <input
            className="form-control form-inp"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            className="form-control form-inp"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className="form-control form-inp"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            className="form-control form-inp"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />
          <textarea
            className="form-control form-inp"
            rows={5}
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
          />
          <ReCAPTCHA sitekey="Your client site key"/>,
          <button className="submit-btn">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
