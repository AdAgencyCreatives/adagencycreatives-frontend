import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import "../../../styles/AgencyDashboard/ChangePassword.scss";
import { useContext } from "react";
import { Context } from "../../../context/AuthContext";
import { CircularProgress } from "@mui/material";

const ChangePassword = () => {
  const {
    state: { formSubmit },
    updatePassword,
  } = useContext(Context);

  const [show, setShow] = useState({
    old: false,
    new: false,
    retype: false,
  });

  const [data, setData] = useState({
    old_password: "",
    password: "",
    password_confirmation: "",
  });


  return (
    <div className="dashboard-wrapper agency-page-change-password">
      <h3 className="page-title">Change Password</h3>
      <div className="card">
        <div className="row">
          <div className="col-sm-8">
            <div className="profile-edit-form">
              <div className="form-group position-relative mb-4">
                <label htmlFor="oldPassword" className="form-label">
                  Old Password
                </label>
                <input
                  type={show.old ? "text" : "password"}
                  className="form-control"
                  value={data.old_password}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      old_password: e.target.value,
                    }))
                  }
                />
                <div className="showToggle">
                  {show.old ? (
                    <IoEye onClick={() => setShow({ ...show, old: false })} />
                  ) : (
                    <IoEyeOff onClick={() => setShow({ ...show, old: true })} />
                  )}
                </div>
              </div>
              <div className="form-group position-relative mb-4">
                <label htmlFor="oldPassword" className="form-label">
                  New Password
                </label>
                <input
                  type={show.new ? "text" : "password"}
                  className="form-control"
                  value={data.password}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
                <div className="showToggle">
                  {show.new ? (
                    <IoEye onClick={() => setShow({ ...show, new: false })} />
                  ) : (
                    <IoEyeOff onClick={() => setShow({ ...show, new: true })} />
                  )}
                </div>
              </div>
              <div className="form-group position-relative">
                <label htmlFor="oldPassword" className="form-label">
                  Retype Password
                </label>
                <input
                  type={show.retype ? "text" : "password"}
                  className="form-control"
                  value={data.password_confirmation}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      password_confirmation: e.target.value,
                    }))
                  }
                />
                <div className="showToggle">
                  {show.retype ? (
                    <IoEye
                      onClick={() => setShow({ ...show, retype: false })}
                    />
                  ) : (
                    <IoEyeOff
                      onClick={() => setShow({ ...show, retype: true })}
                    />
                  )}
                </div>
              </div>

              <div className="submit-btn mt-4">
                <button
                  className="btn btn-dark btn-hover-primary border-0 px-3 py-2"
                  onClick={() => updatePassword(data)}
                  disabled={formSubmit}
                >
                  Change Password {formSubmit && <CircularProgress size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
