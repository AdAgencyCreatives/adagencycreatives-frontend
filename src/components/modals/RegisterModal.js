import Dialog from "@mui/material/Dialog";
import { useContext, useEffect, useRef, useState } from "react";
import { IoCloseOutline, IoEye, IoEyeOff } from "react-icons/io5";
import "../../styles/Modal/AuthModal.scss";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as AlertContext } from "../../context/AlertContext";
import ScrollToHash from "../ScrollToHash";

const RegisterModal = ({ open, handleClose, setModal, form }) => {
  const { state, signup } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);
  const { formMessage } = state;
  const [show, setShow] = useState({});
  const [tab, setTab] = useState(form);
  const [message, setMessage] = useState(null);
  const dialogRef = useRef(null);
  const [formSubmit, setFormSubmit] = useState(false);

  useEffect(() => {
    if (formMessage) {
      setMessage({
        class: formMessage.type == "success" ? "info" : "warning",
        content: formMessage.message,
      });
    } else {
      setMessage(null);
    }
  }, [formMessage]);

  const [fields, setFields] = useState({
    creative: [
      {
        label: "First Name*",
        required: true,
        type: "text",
        name: "first_name",
        placeholder: "First Name *",
      },
      {
        label: "Last Name*",
        required: true,
        type: "text",
        name: "last_name",
        placeholder: "Last Name *",
      },
      {
        label: "Email*",
        required: true,
        type: "text",
        name: "email",
        placeholder: "Email *",
      },
      {
        label: "Password *",
        required: true,
        type: "password",
        name: "password",
        placeholder: "Password *",
      },
      {
        label: "Confirm Password *",
        required: true,
        type: "password",
        name: "cpassword",
        placeholder: "Confirm Password *",
      },
      {
        label: "Portfolio Site *",
        required: true,
        type: "text",
        name: "portfolio_site",
        placeholder: "Portfolio Site *",
      },
      {
        label: "",
        type: "hidden",
        name: "linkedin_profile",
        placeholder: "LinkedIn Profile *",
        value: " ",
      },
    ],
    agency: [
      {
        label: "Company Name*",
        required: true,
        type: "text",
        name: "agency_name",
        placeholder: "Company Name *",
      },
      {
        label: "Contact First Name*",
        required: true,
        type: "text",
        name: "first_name",
        placeholder: "Contact First Name *",
      },
      {
        label: "Contact Last Name*",
        required: true,
        type: "text",
        name: "last_name",
        placeholder: "Contact Last Name *",
      },
      {
        label: "Email*",
        required: true,
        type: "text",
        name: "email",
        placeholder: "Email *",
      },
      {
        label: "Password *",
        required: true,
        type: "password",
        name: "password",
        placeholder: "Password *",
      },
      {
        label: "Confirm Password *",
        required: true,
        type: "password",
        name: "cpassword",
        placeholder: "Confirm Password *",
      },
      {
        label: "LinkedIn Profile *",
        required: true,
        type: "text",
        name: "linkedin_profile",
        placeholder: "LinkedIn Profile *",
      },
      {
        label: "",
        type: "hidden",
        name: "portfolio_site",
        placeholder: "Portfolio Site *",
        value: " ",
      },
    ],
  });

  const handleInputChange = (type, index, value) => {
    const updatedFields = { ...fields };

    updatedFields[type][index].value = value;

    setFields(updatedFields);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormSubmit(true);
    /* signup(fields[tab], tab, () => {
      dialogRef.current
        .getElementsByClassName("MuiDialog-container")[0]
        .scrollTo({
          top: 0,
          behavior: "smooth",
        });
    }); */
    try {
      const result = await signup(fields[tab], tab);
      handleClose();
      showAlert("registration-success"); // never change this as it displays registration success message.
    } catch (e) {
      dialogRef.current.getElementsByClassName("MuiDialog-container")[0].scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    setFormSubmit(false);
    return false;
  };

  const toggleShow = (field, visible) => {
    setShow({
      ...show,
      [field]: visible,
    });
  };
  const setActiveTab = (tab) => {
    setShow({});
    setFields({});
    setFields({ ...fields });
    setTab(tab);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" scroll="body" ref={dialogRef}>
      <div className="auth-modal">
        <div className="auth-header"></div>
        <div className="auth-body">
          <div className="job-apply-email-form-wrapper">
            <div className="inner">
              <div className="inner-head">
                <h3 style={{ fontSize: 24, marginBottom: 0, fontWeight: 400 }}>Create an Account</h3>
                <p style={{ fontSize: 20, fontWeight: 300, margin: 0 }}>
                  Already have an account?&nbsp;
                  <a
                    href="#"
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      marginLeft: 2,
                    }}
                    onClick={() => setModal("login")}
                  >
                    Login
                  </a>
                </p>
                <button className="border-0 bg-transparent text-primary pe-0 close-btn" onClick={handleClose}>
                  <IoCloseOutline size={30} />
                </button>
              </div>

              <ul className="role-tabs nav nav-tabs">
                <li className={tab == "creative" ? "active" : ""} onClick={() => setActiveTab("creative")}>
                  <a data-toggle="tab">Creative</a>
                </li>
                <li className={tab == "agency" ? "active" : ""} onClick={() => setActiveTab("agency")}>
                  <a data-toggle="tab">Agency</a>
                </li>
              </ul>
              {message && <div className={`alert alert-${message.class}`}>{message.content}</div>}
              <form id="register-form" onSubmit={(e) => handleFormSubmit(e)}>
                {fields[tab].map((field, index) => (
                  <div className="form-group position-relative" key={field.name}>
                    <label className="form-label">{field.label}</label>
                    <input
                      key={tab + field.name}
                      className="form-control mb-4"
                      name={field.name}
                      placeholder={field.placeholder}
                      type={field.type == "password" ? (show[field.name] ? "text" : "password") : field.type}
                      required="required"
                      value={field.value || ""}
                      onChange={(e) => handleInputChange(tab, index, e.target.value)}
                    />
                    {field.type == "password" && (
                      <div className="showToggle">{show[field.name] ? <IoEye onClick={() => toggleShow(field.name, false)} /> : <IoEyeOff onClick={() => toggleShow(field.name, true)} />}</div>
                    )}
                  </div>
                ))}

                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className="d-flex">
                    <input type="checkbox" className="me-2" name="remember" id="remember" required />
                    <label className="form-check-label" style={{ fontSize: 18 }} htmlFor="remember">
                      You accept our{" "}
                      <a href="/terms-and-conditions" target="_blank">
                        Terms and Conditions
                      </a>{" "}
                      and
                      <a href="/privacy-policy" target="_blank">
                        {" "}
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>
                <button className="btn btn-gray btn-hover-primary text-capitalize ls-3 w-100 mt-3 p-3 fs-5" disabled={formSubmit}>
                  Register Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default RegisterModal;
