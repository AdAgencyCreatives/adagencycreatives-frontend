import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import "../../../styles/AgencyDashboard/ChangePassword.scss";

const DeleteProfile = () => {
  //   const [fields, setFields] = useState({
  //     old: "",
  //     new: "",
  //     retype: "",
  //   });

  const [show, setShow] = useState({
    old: false,
    new: false,
    retype: false,
  });

  const setValue = (e) => {
    let value = e.target.value;
  };
  return (
    <div className="dashboard-wrapper agency-page-change-password">
      <h3 className="page-title">Delete Profile</h3>
      <div className="card">
        <div className="row">
          <div className="col-8">
            <div className="profile-edit-form">
              <p style={{ fontSize: 18, fontWeight: 500,marginBottom:0 }}>
                Are you sure you want to delete your profile?
              </p>
              <p style={{ fontSize: 18, fontWeight: 500 }}>This can not be undone.</p>
              <div className="form-group position-relative mb-4">
                <label htmlFor="oldPassword" className="form-label">
                  Please enter your login Password to confirm:
                </label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <button className="btn btn-gray btn-hover-primary p-3 px-5 ls-3 text-uppercase">Delete Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProfile;
