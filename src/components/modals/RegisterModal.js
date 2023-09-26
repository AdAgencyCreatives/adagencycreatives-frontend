import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import { IoCloseOutline, IoEye, IoEyeOff } from "react-icons/io5";
import "../../styles/Modal/AuthModal.scss";

const RegisterModal = ({ open, handleClose, setModal }) => {
  const [show, setShow] = useState({});
  const [tab, setTab] = useState("creative");
  const [fields, setFields] = useState({
    creative: [
      {
        label: "First Name*",
        required: true,
        type: "text",
        name: "fname",
        placeholder: "First Name *",
      },
      {
        label: "Last Name*",
        required: true,
        type: "text",
        name: "lname",
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
        name: "portfolio",
        placeholder: "Portfolio Site *",
      },
    ],
    agency: [
      {
        label: "Company Name*",
        required: true,
        type: "text",
        name: "company",
        placeholder: "Company Name *",
      },
      {
        label: "Company First Name*",
        required: true,
        type: "text",
        name: "fname",
        placeholder: "Company First Name *",
      },
      {
        label: "Company Last Name*",
        required: true,
        type: "text",
        name: "lname",
        placeholder: "Company Last Name *",
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
        name: "linkedin",
        placeholder: "LinkedIn Profile *",
      },
    ],
  });

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
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      scroll="body"
    >
      <div className="auth-modal">
        <div className="auth-header"></div>
        <div className="auth-body">
          <div className="job-apply-email-form-wrapper">
            <div className="inner">
              <div class="d-flex align-items-baseline justify-content-between mb-4">
                <h3 style={{ fontSize: 24, marginBottom: 0, fontWeight: 400 }}>
                  Create an Account
                </h3>
                <p
                  className="text-center"
                  style={{ fontSize: 20, fontWeight: 300, margin: 0 }}
                >
                  Already have an account?
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
                <button
                  className="border-0 bg-transparent text-primary pe-0"
                  onClick={handleClose}
                >
                  <IoCloseOutline size={30} />
                </button>
              </div>

              <ul class="role-tabs nav nav-tabs">
                <li
                  class={tab == "creative" && "active"}
                  onClick={() => setActiveTab("creative")}
                >
                  <a data-toggle="tab">Creative</a>
                </li>
                <li
                  class={tab == "agency" && "active"}
                  onClick={() => setActiveTab("agency")}
                >
                  <a data-toggle="tab">Agency</a>
                </li>
              </ul>
              <form method="post">
                {fields[tab].map((field) => (
                  <div
                    className="form-group position-relative"
                    key={field.name}
                  >
                    <label className="form-label">{field.label}</label>
                    <input
                      key={tab + field.name}
                      className="form-control mb-4"
                      name={field.name}
                      placeholder={field.placeholder}
                      type={
                        field.type == "password"
                          ? show[field.name]
                            ? "text"
                            : "password"
                          : "text"
                      }
                      required="required"
                    />
                    {field.type == "password" && (
                      <div className="showToggle">
                        {show[field.name] ? (
                          <IoEye
                            onClick={() => toggleShow(field.name, false)}
                          />
                        ) : (
                          <IoEyeOff
                            onClick={() => toggleShow(field.name, true)}
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}

                <div class="d-flex align-items-center justify-content-between mb-2">
                  <div className="d-flex">
                    <input
                      type="checkbox"
                      className="me-2"
                      name="remember"
                      id="remember"
                    />
                    <label
                      class="form-check-label"
                      style={{ fontSize: 18 }}
                      htmlFor="remember"
                    >
                      You accept our <a href="#">Terms and Conditions</a> and{" "}
                      <a href="#">Privacy Policy</a>
                    </label>
                  </div>
                </div>
                <button className="btn btn-gray btn-hover-primary text-capitalize ls-3 w-100 mt-3 p-3">
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
