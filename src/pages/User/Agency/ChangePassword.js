import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import '../../../styles/AgencyDashboard/ChangePassword.scss'

const ChangePassword = () => {
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
      <h3 className="page-title">Change Password</h3>
      <div className="card">
        <div className="row">
          <div className="col-8">
            <div className="profile-edit-form">
              <div className="form-group position-relative mb-4">
                <label htmlFor="oldPassword" className="form-label">
                  Old Password
                </label>
                <input
                  type={show.old ? "text" : "password"}
                  className="form-control"
                  //value={fields.old}
                  onChange={setValue}
                />
                <div className="showToggle">
                  {show.old ? (
                    <IoEye onClick={() => setShow({ ...show, old: false })} />
                  ) : (
                    <IoEyeOff
                      onClick={() => setShow({ ...show, old: true })}
                    />
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
                  //value={fields.new}
                />
                <div className="showToggle">
                  {show.new ? (
                    <IoEye onClick={() => setShow({ ...show, new: false })} />
                  ) : (
                    <IoEyeOff
                      onClick={() => setShow({ ...show, new: true })}
                    />
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
                  //value={fields.retype}
                />
                <div className="showToggle">
                  {show.retype ? (
                    <IoEye onClick={() => setShow({ ...show, retype: false })} />
                  ) : (
                    <IoEyeOff
                      onClick={() => setShow({ ...show, retype: true })}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
