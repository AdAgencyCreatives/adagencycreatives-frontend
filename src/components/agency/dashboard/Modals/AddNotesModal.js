import { Modal } from "@mui/material";
import "../../../../styles/Modal/AddNotesModal.scss";

const AddNotesModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="add-note-modal">
        <div className="addnote-header"></div>
        <div className="addnote-body">
          <div className="job-apply-email-form-wrapper">
            <div className="inner">
              <h3 className="text-center">
                <span>Add Note</span>
              </h3>

              <form className="create-meeting-form" method="post">
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    className="form-control"
                    name="message"
                    placeholder="Message"
                    required="required"
                  ></textarea>
                </div>
                <input type="hidden" name="action" />
                <input type="hidden" name="application_id" />
                <button className="btn btn-gray btn-hover-primary text-uppercase ls-3 w-100 mt-3 p-3">
                  Add Note
                </button>
              </form>

              <div className="notes-list-item">
                <p>You currently have no notes entered.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddNotesModal;
