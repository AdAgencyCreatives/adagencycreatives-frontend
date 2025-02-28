import { Dialog } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { IoCloseOutline, IoEye, IoEyeOff } from "react-icons/io5";
import "../../styles/Modal/AuthModal.scss";
import { Context as AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { requestFriendship } from "../../context/FriendsDataContext";
import { saveNotification } from "../../context/NotificationsDataContext";
import CountdownTimer from './CountdownTimer';

const LoginModal = ({ open, handleClose, setModal }) => {
  const [show, setShow] = useState(false);
  const [loginLocked, setLoginLocked] = useState(false);
  const [lockedTime, setLockedTime] = useState(0);
  const { state, signin } = useContext(AuthContext);
  const { formMessage } = state;
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showLoading, setShowLoading] = useState(false);

  const navigate = useNavigate();

  function getSecondsDifference(date1, date2) {
    let diffMs = Math.abs(new Date(date1) - new Date(date2)); // Difference in milliseconds
    return Math.floor(diffMs / 1000); // Convert to seconds
  }

  useEffect(() => {
    if (localStorage.getItem("locked_end") !== null) {
      let lockedEnd = localStorage.getItem("locked_end");
      setLocked(lockedEnd);
    }
  }, []);

  const setLocked = (lockedEnd) => {
    let nowUtc = new Date().toISOString(lockedEnd);

    if (new Date(nowUtc) > new Date(lockedEnd)) {
      setLoginLocked(false);
      setLockedTime(0);
    } else {
      // console.log(new Date(nowUtc));
      // console.log(new Date(lockedEnd));
      let diffMs = Math.abs(new Date(nowUtc) - new Date(lockedEnd)); // Difference in milliseconds
      const locked_remaining = Math.floor(diffMs / 1000); // Convert to seconds

      // console.log(locked_remaining);

      setLoginLocked(true);
      setLockedTime(locked_remaining);
    }
  }

  useEffect(() => {
    setShowLoading(false);
    if (formMessage) {
      if (formMessage?.status === 'reset') {
        setMessage({
          class: "warning",
          content: formMessage.message,
          status: 'reset'
        });
      } else if (formMessage?.status === 'locked') {
        localStorage.setItem('locked_end', formMessage?.locked_end);
        setLocked(formMessage?.locked_end);
      } else {
        setMessage({
          class: formMessage.type == "success" ? "info" : "warning",
          content: formMessage.message,
        });
      }
    } else {
      setMessage(null);
    }
  }, [formMessage]);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const sendAdminFriendRequest = async (data) => {
    try {
      let admin_id = 202;
      let admin_uuid = "f1c048c1-d961-4910-ab83-fc8ac5f304cd";
      let result1 = await requestFriendship({
        "sender_id": admin_uuid, "receiver_id": data.user.uuid
      });

      if (result1?.status == "success") {
        let result2 = await saveNotification({
          "user_id": data.user.uuid, "type": "lounge_friends_activity", "message": "Ad Agency Creatives has sent friendship request.", "body": "{activity_key:'lounge_friendship_requested'}"
        });
      }

      console.log(result1);
    } catch (error) {
      console.log("Post Login Error:");
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowLoading(true);
    signin(formData, async (data) => {
      setShowLoading(false);
      handleClose();
      if (data?.user?.role?.length > 0) {
        if (data.user.role == 'creative') {
          // if (window?.location?.href?.indexOf("http://localhost:3000") === 0 || window?.location?.href?.indexOf("https://staging.adagencycreatives.com") === 0) {
          //   sendAdminFriendRequest(data);
          // }
          if (window.location.pathname == "/") {
            // navigate('/community');
            navigate('/dashboard');
          } else {
            navigate(window.location.pathname);
          }
        } else if (data.user.role == 'agency' || data.user.role == 'advisor' || data.user.role == 'recruiter') {
          if (window.location.pathname == "/") {
            navigate('/dashboard');
          } else {
            navigate(window.location.pathname);
          }
        } else {
          navigate('/');
        }
      }
    });
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      scroll="body"
    >
      <div className="auth-modal">
        <div className="auth-header"></div>
        <div className="auth-body">
          <div className="job-apply-email-form-wrapper">
            <div className="inner">
              {loginLocked ? (
                <div className="position-relative">
                  <CountdownTimer initialTime={lockedTime} setLoginLocked={setLoginLocked} />
                  <button
                    className="border-0 bg-transparent text-primary position-absolute p-0"
                    onClick={handleClose}
                    style={{ top: '0', right: '0' }}
                  >
                    <IoCloseOutline size={30} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <h3 style={{ fontSize: 24, marginBottom: 0, fontWeight: 400 }}>
                      Login
                    </h3>
                    <button
                      className="border-0 bg-transparent text-primary p-0"
                      onClick={handleClose}
                    >
                      <IoCloseOutline size={30} />
                    </button>
                  </div>
                  <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        className="form-control mb-4"
                        name="email"
                        placeholder="Email"
                        required="required"
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                    </div>
                    <div className="form-group position-relative mb-4">
                      <label htmlFor="oldPassword" className="form-label">
                        Password
                      </label>
                      <input
                        type={show ? "text" : "password"}
                        className="form-control"
                        placeholder="Password"
                        onChange={(e) => handleChange("password", e.target.value)}
                      />
                      <div className="showToggle">
                        {show ? (
                          <IoEye onClick={() => setShow(false)} />
                        ) : (
                          <IoEyeOff onClick={() => setShow(true)} />
                        )}
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <div className="d-flex">
                        <input
                          type="checkbox"
                          className="me-2"
                          name="remember"
                          id="remember"
                        />
                        <label
                          className="form-check-label"
                          style={{ fontSize: 18 }}
                          htmlFor="remember"
                        >
                          Keep me signed in
                        </label>
                      </div>
                      <a
                        href="#"
                        style={{ fontSize: 18, fontWeight: 300 }}
                        onClick={() => setModal("reset")}
                      >
                        Forgotten password?
                      </a>
                    </div>
                    <div
                      style={{
                        display: showLoading ? "flex" : "none",
                        "justify-content": "center",
                      }}
                    >
                      <CircularProgress />
                    </div>
                    <button
                      disabled={showLoading ? "disabled" : ""}
                      className="btn btn-gray btn-hover-primary text-uppercase ls-3 w-100 mt-3 p-3 fs-5"
                    >
                      Login
                    </button>
                    {message && message?.status === 'reset' && (
                      <button
                        className="btn btn-gray btn-hover-primary text-uppercase ls-3 w-100 mt-3 p-3 fs-5"
                        onClick={() => setModal('reset') }
                        type="button"
                      >
                        Click To Reset Your Password
                      </button>
                    )}
                    {message && !message?.status && (
                      <div className={`alert alert-${message.class} mt-3`}>
                        {message.content}
                      </div>
                    )}
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default LoginModal;
