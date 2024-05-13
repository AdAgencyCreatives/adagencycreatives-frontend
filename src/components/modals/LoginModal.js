import { Dialog } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { IoCloseOutline, IoEye, IoEyeOff } from "react-icons/io5";
import "../../styles/Modal/AuthModal.scss";
import { Context as AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { requestFriendship } from "../../context/FriendsDataContext";
import { saveNotification } from "../../context/NotificationsDataContext";


const LoginModal = ({ open, handleClose, setModal }) => {
  const [show, setShow] = useState(false);
  const { state, signin } = useContext(AuthContext);
  const { formMessage } = state;
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showLoading, setShowLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setShowLoading(false);
    if (formMessage) {
      setMessage({
        class: formMessage.type == "success" ? "info" : "warning",
        content: formMessage.message,
      });
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
          if (window?.location?.href?.indexOf("http://localhost:3000") === 0 || window?.location?.href?.indexOf("https://staging.adagencycreatives.com") === 0) {
            sendAdminFriendRequest(data);
          }
          navigate('/community');
        } else if (data.user.role == 'agency' || data.user.role == 'advisor' || data.user.role == 'recruiter') {
          navigate('/dashboard');
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
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h3 style={{ fontSize: 24, marginBottom: 0, fontWeight: 400 }}>
                  Login
                </h3>
                <button
                  className="border-0 bg-transparent text-primary"
                  onClick={handleClose}
                >
                  <IoCloseOutline size={30} />
                </button>
              </div>
              {message && (
                <div className={`alert alert-${message.class}`}>
                  {message.content}
                </div>
              )}
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
