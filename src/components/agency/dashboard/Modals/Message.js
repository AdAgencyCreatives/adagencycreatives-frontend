import { Modal } from "@mui/material";
// import "../../../styles/Modal/AddNotesModal.scss";

const Message = ({ open, handleClose }) => {
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
              <p className="text-center" style={{fontSize:20,marginBottom:30,fontWeight:400}}>Send Message to "Phil Neves"</p>

              <form className="private-message-form" method="post">
                <div className="form-group">
                  <input
                    className="form-control mb-4"
                    name="subject"
                    placeholder="Subject"
                    required="required"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    name="message"
                    placeholder="Message"
                    required="required"
                    rows={4}
                  ></textarea>
                </div>
                <button className="btn btn-gray btn-hover-primary text-uppercase ls-3 w-100 mt-3 p-3">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Message;
