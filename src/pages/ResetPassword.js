import { useContext, useEffect, useRef, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { Context } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";
import "../styles/ResetPassword.scss";

import useHelper from "../hooks/useHelper";

const ResetPassword = () => {

  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const location = useLocation();
  const { hasPasswordError } = useHelper();

  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  if (token == undefined || token == '' || email == undefined || email == '') {
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

  const [errData, setErrData] = useState({
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
    setErrData({ ...errData, [key]: hasPasswordError(value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    errData.password = formData.password?.length > 0 ? hasPasswordError(formData.password) : 'Input required.';
    errData.password_confirmation = formData.password_confirmation?.length > 0 ? hasPasswordError(formData.password_confirmation) : 'Input required.';

    if (errData.password?.length > 0) {
      setError("Password Field: " + errData.password);
      passwordRef?.current?.focus();
      return false;
    }

    if (errData.password_confirmation?.length > 0) {
      setError("Password Confirmation Field: " + errData.password_confirmation);
      passwordConfirmationRef?.current?.focus();
      return false;
    }

    if (formData.password != formData.password_confirmation) {
      setError("Confirm Password field must match Password field.");
      passwordConfirmationRef?.current?.focus();
      return false;
    }

    setShowLoading(true);
    const result = await resetPassword(formData);
    setShowLoading(false);
    if (result) {
      setMessage("Your password has been reset. Redirecting...");
      setTimeout(() => window.location = "/", 1000)
    }
  };

  useEffect(() => {
    if (formMessage?.type == "error") setError(formMessage.message);
  }, [formMessage]);

  return (
    <>
      <div className="container my-5">
        <div className="password-reset">
          <h1>Reset Your Password</h1>
          <form className="password-reset-form" onSubmit={handleSubmit}>
            {message && <div className={`alert alert-info`}>{message}</div>}
            {error && (
              <div className={`alert alert-warning`}>
                {error}
              </div>
            )}
            <div className="form-group position-relative mb-4">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                ref={passwordRef}
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
                ref={passwordConfirmationRef}
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
