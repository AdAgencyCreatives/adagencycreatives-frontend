import { useContext, useState } from "react";
import "../../../styles/AgencyDashboard/ChangePassword.scss";
import { Context as AuthContext } from "../../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import MessageAlert from "../../../components/MessageAlert";
import DeleteProfileModal from "../../../components/modals/DeleteProfileModal";

const DeleteProfile = () => {

  // State
  const [formData, setFormData] = useState({ password: "" });
  // Context
  const {
    state: { formSubmit, messageAlert, modal },
    confirmPassword, handleClose
  } = useContext(AuthContext);
  // Change
  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };
  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    confirmPassword(formData);
  };
  // Close modal
  const close = (e) => {
    handleClose();
  };

  return (
    <div className="dashboard-wrapper agency-page-change-password">
      <h3 className="page-title">Delete Profile</h3>
      <div className="card">
        <div className="row">
          <div className="col-sm-8">
            <DeleteProfileModal open={modal} close={close} />
            <MessageAlert type={messageAlert.type} message={messageAlert.message} display={messageAlert.display} />
            <form className="delete-profile-form" onSubmit={handleSubmit}>
              <div className="profile-edit-form">
                <p style={{ fontSize: 18, fontWeight: 500, marginBottom: 0 }}>
                  Are you sure you want to delete your profile?
                </p>
                <p style={{ fontSize: 18, fontWeight: 500 }}>This can not be undone.</p>
                <div className="form-group position-relative mb-4">
                  <label htmlFor="oldPassword" className="form-label">
                    Please enter your login Password to confirm:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    // required="required"
                    onChange={(e) => handleChange("password", e.target.value)}
                  />
                </div>
                <button className="btn btn-gray btn-hover-primary p-3 px-5 ls-3 text-uppercase" disabled={formSubmit}>
                  Delete Profile {formSubmit && <CircularProgress size={20} />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProfile;
