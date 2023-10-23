import { Modal, Dialog, CircularProgress } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../../../context/ChatContext";
import { useState } from "react";
// import "../../../styles/Modal/AddNotesModal.scss";

const Message = ({ open, handleClose, item }) => {
  const [data, setData] = useState({ subject: "", message: "" });
  const [message, setMessage] = useState(false);
  const {
    state: { loading },
    sendMessage,
  } = useContext(Context);
  const to = item.resource;

  const handleSubmit = () => {
    sendMessage(item.user_id, to.user_id, data.message, () => setMessage(true));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      scroll="body"
    >
      {item.resource && (
        <div className="add-note-modal">
          <div className="addnote-header"></div>
          <div className="addnote-body">
            <div className="job-apply-email-form-wrapper">
              <div className="inner">
                <p
                  className="text-center"
                  style={{ fontSize: 20, marginBottom: 30, fontWeight: 400 }}
                >
                  Send Message to "{to.name}"
                </p>
                {message && (
                  <div className={`alert alert-info`}>
                    Sent message successful.
                  </div>
                )}
                <div className="form-group">
                  <input
                    className="form-control mb-4"
                    name="subject"
                    placeholder="Subject"
                    required="required"
                    value={data.subject}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, subject: e.target.value }))
                    }
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    name="message"
                    placeholder="Message"
                    required="required"
                    rows={4}
                    value={data.message}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, message: e.target.value }))
                    }
                  ></textarea>
                </div>
                <button
                  className="btn btn-gray btn-hover-primary text-uppercase ls-3 w-100 mt-3 p-3"
                  onClick={handleSubmit}
                >
                  Send Message {loading && <CircularProgress size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default Message;
