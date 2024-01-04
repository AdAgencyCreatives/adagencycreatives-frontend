import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "../styles/Contact.css";
import { api } from "../api/api";
import { CircularProgress } from "@mui/material";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
  });
  const [submit, setSubmit] = useState(false);
  const [message, showMessage] = useState(false);
  const [error, showError] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((previousState) => ({ ...previousState, [name]: value }));
  }

  const submitContact = async (e) => {
    e.preventDefault();
    setSubmit(true);
    try {
      const response = await api.post("/contact-us", formData);
      showMessage(true);
      setFormData({ name: "", email: "", phone: "", location: "", message: "" });
    } catch (error) {
      showError(true);
    }
    setSubmit(false);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="dark-container page-mentors mb-0 mt-4">
      <h1 className="page-title">
        Contact Us
      </h1>
      <form onSubmit={submitContact}>
        <div className="container">
          <div className="contact-form">
            {message && <div className={`alert alert-info`}>Your message has been sent successfully</div>}
            {error && <div className={`alert alert-danger`}>There was an error submitting the form</div>}
            <input className="form-control form-inp" name="name" placeholder="Name" required value={formData.name} onChange={handleChange} />
            <input className="form-control form-inp" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
            <input className="form-control form-inp" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
            <input className="form-control form-inp" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
            <textarea className="form-control form-inp" rows={5} name="message" placeholder="Message" required value={formData.message} onChange={handleChange} />
            <ReCAPTCHA sitekey="6LflnAEkAAAAAMC-wK6kWCLZ3OGbIYgDzCodr50o" />,
            <button className="submit-btn" disabled={submit}>
              {!submit ? "Send" : <CircularProgress size={20} color="white" />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Contact;
