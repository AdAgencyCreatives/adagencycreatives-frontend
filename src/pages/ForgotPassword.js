import { useContext, useEffect, useState } from "react";
import { IoCloseOutline, IoEye, IoEyeOff } from "react-icons/io5";
import "../styles/Modal/AuthModal.scss";
import { Context as AuthContext } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";

const ForgotPassword = () => {

    const queryParams = new URLSearchParams(window.location.search);

    const [show, setShow] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const { sendResetLink } = useContext(AuthContext);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        setEmail(queryParams.get('email'));
        if (queryParams?.get('auto-submit') == 'true') {
            window.setTimeout(() => {
                handleAutoSubmit(queryParams?.get('email'));
            }, 1000);
        }
    }, []);

    const handleChange = (value) => {
        setEmail(value);
    };

    const handleClose = () => {

    };

    const handleAutoSubmit = async (emailParam) => {
        setError(null)
        setMessage(null)
        setShowLoading(true);
        const result = await sendResetLink(emailParam);
        setShowLoading(false);
        if (result) {
            setMessage("Please check your email for password reset link");
            setSubmitted(true);
        }
        else {
            setError("There was an error sending the request")
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null)
        setMessage(null)
        setShowLoading(true);
        const result = await sendResetLink(email);
        setShowLoading(false);
        if (result) {
            setMessage("Please check your email for password reset link");
            setSubmitted(true);
        }
        else {
            setError("There was an error sending the request")
        }
    };

    return (
        <>
            <div className="bg-black p-4"></div>
            <div className="container mt-5 mb-5">
                <div className="job-apply-email-form-wrapper">
                    <div className="inner forgot-password">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h3 style={{ fontSize: 24, marginBottom: 0, fontWeight: 400 }}>
                                Forgot Password
                            </h3>
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
                        <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
                            <div className="form-group">
                                {/*                   <label className="form-label">Email</label> */}
                                <input
                                    className="form-control mb-4"
                                    name="email"
                                    placeholder="Email"
                                    required="required"
                                    value={email}
                                    onChange={(e) => handleChange(e.target.value)}
                                    disabled={queryParams?.get('email')?.length > 0 ? "disabled" : ""}
                                />
                            </div>
                            <div style={{ "display": (showLoading ? "flex" : "none"), "justify-content": "center" }}><CircularProgress /></div>
                            {submitted ? (
                                <button disabled={(showLoading ? "disabled" : "")} className="btn btn-gold hover-black text-uppercase ls-3 w-100 mt-3 p-3 fs-5">
                                    Retry Submit
                                </button>
                            ) : (
                                <button disabled={(showLoading || submitted ? "disabled" : "")} className="btn btn-gold hover-black text-uppercase ls-3 w-100 mt-3 p-3 fs-5">
                                    Submit
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
