import { Dialog } from "@mui/material";
import { useContext } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Context as AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@mui/material";
import "../../styles/Modal/AuthModal.scss";

const DeleteProfileModal = ({ open, close }) => {

  // Context
  const {
    state: { formSubmit, user },
    deleteProfile,
  } = useContext(AuthContext);
  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    deleteProfile(user.uuid, () => {
      close();
      window.location = "/";
    });
  };

  return (
    <Dialog
      open={open}
      onClose={() => close()}
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
                  Delete Profile
                </h3>
                <button
                  className="border-0 bg-transparent text-primary"
                  onClick={() => close()}>
                  <IoCloseOutline size={30} />
                </button>
              </div>
              <p className="text-center">
                Are you sure you want to delete your account ?
              </p>
              <div className="d-flex align-items-center justify-content-end">
                <button className="btn btn-gray btn-hover-primary p-3 px-5 ls-3 text-uppercase" disabled={formSubmit} onClick={handleSubmit}>
                  Delete {formSubmit && <CircularProgress size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteProfileModal;
