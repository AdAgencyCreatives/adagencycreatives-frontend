import { Dialog } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { IoCloseOutline, IoEye, IoEyeOff } from "react-icons/io5";
import "../../styles/Modal/AuthModal.scss";
import { Context as AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";

const LoginModal = ({ open, handleClose, setModal }) => {
  const [show, setShow] = useState(false);
  const { sendResetLink } = useContext(AuthContext);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const handleChange = (value) => {
    setEmail(value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError(null)
    setMessage(null)
    setShowLoading(true);
    const result = await sendResetLink(email);
    setShowLoading(false);
    if(result){
      setMessage("Please check your email for password reset link")
    }
    else{
      setError("There was an error sending the request")
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleClose() }
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      scroll="body"
    >
      <div className="auth-modal">
        <div className="auth-header"></div>
        <div className="auth-body">
          <div className="job-apply-email-form-wrapper">
            <div className="inner">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h3 style={{ fontSize: 24, marginBottom: 0, fontWeight: 400 }}>
                  Forgot Password
                </h3>
                <button
                  className="border-0 bg-transparent text-primary"
                  onClick={handleClose}
                >
                  <IoCloseOutline size={30} />
                </button>
              </div>
              {message && (
                <div className={`alert alert-info`}>
                  {message}
                </div>
              )}
              {error && (
                <div className={`alert alert-warning`}>
                  {error}
                </div>
              )}
              <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
{/*                   <label className="form-label">Email</label> */}
                  <input
                    className="form-control mb-4"
                    name="email"
                    placeholder="Email"
                    required="required"
                    value={email}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                </div>
                <div style={{ "display": (showLoading ? "flex" : "none"), "justify-content": "center" }}><CircularProgress /></div>
                <button disabled={(showLoading ? "disabled" : "")} className="btn btn-gray btn-hover-primary text-uppercase ls-3 w-100 mt-3 p-3 fs-5">
                  Submit
                </button>
                <p
                  className="text-center mt-4"
                  style={{ fontSize: 20, fontWeight: 300 }}
                >
                  Do you need to create an account?&nbsp;
                  <a
                    href="#"
                    style={{ fontWeight: "bold", color: "black" }}
                    onClick={() => setModal("register")}
                  >
                    Register
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default LoginModal;
