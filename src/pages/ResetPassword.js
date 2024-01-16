import { useContext, useEffect, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { Context } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";
import "../styles/ResetPassword.scss";

const ResetPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  if(token  == undefined || token == '' || email  == undefined || email == ''){
    window.location = "/";
  }
  const [show, setShow] = useState({});
  const { state, resetPassword } = useContext(Context);
  const { formMessage } = state;
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    token,
    email,
    password: "",
    password_confirmation: "",
  });
  const [showLoading, setShowLoading] = useState(false);

  const toggleShow = (field, visible) => {
    setShow({
      ...show,
      [field]: visible,
    });
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setShowLoading(true);
    const result = await resetPassword(formData);
    setShowLoading(false);
    if (result) {
      setMessage("Your password has been reset. Redirecting...");
      setTimeout(() =>  window.location = "/",1000)
    }
  };

  useEffect(() => {
    if (formMessage?.type == "error") setError(formMessage.message);
  }, [formMessage]);

  return (
    <>
      <div className="container my-5">
        <div className="password-reset">
          <form className="password-reset-form" onSubmit={handleSubmit}>
            <div className="form-group position-relative mb-4">
              {message && <div className={`alert alert-info`}>{message}</div>}
              {error && (
                <div className={`alert alert-warning`}>
                  {error}
                </div>
              )}
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={show.password ? "text" : "password"}
                name="password"
                className="form-control"
                placeholder="Password"
                onChange={(e) => handleChange("password", e.target.value)}
              />
              <div className="showToggle">
                {show.password ? (
                  <IoEye onClick={() => toggleShow("password", false)} />
                ) : (
                  <IoEyeOff onClick={() => toggleShow("password", true)} />
                )}
              </div>
            </div>

            <div className="form-group position-relative mb-4">
              <label htmlFor="password_confirmation" className="form-label">
                Confirm Password
              </label>
              <input
                type={show.password_confirmation ? "text" : "password"}
                name="password_confirmation"
                className="form-control"
                placeholder="Confirm Password"
                onChange={(e) => handleChange("password_confirmation", e.target.value)}
              />
              <div className="showToggle">
                {show.password_confirmation ? (
                  <IoEye
                    onClick={() => toggleShow("password_confirmation", false)}
                  />
                ) : (
                  <IoEyeOff
                    onClick={() => toggleShow("password_confirmation", true)}
                  />
                )}
              </div>
            </div>
            <div
              style={{
                display: showLoading ? "flex" : "none",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </div>
            <button
              disabled={showLoading ? "disabled" : ""}
              className="btn btn-dark btn-hover-primary border-0 px-3 py-2"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
