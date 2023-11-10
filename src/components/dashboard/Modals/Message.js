import { Modal, Dialog, CircularProgress } from "@mui/material";
import { useContext } from "react";
import { Context as AuthContext, logActivity } from "../../../context/AuthContext";
import { Context as ChatContext } from "../../../context/ChatContext";
import { useState } from "react";

const Message = ({ open, handleClose, item, type }) => {
  const [data, setData] = useState({ subject: "", message: "" });
  const [message, setMessage] = useState(false);
  const {
    state: { loading },
    sendMessage,
  } = useContext(ChatContext);

  const {
    state: { user },
  } = useContext(AuthContext);

  const handleSubmit = () => {
    sendMessage(user.uuid, item.user_id, data.message, type, () =>
      setMessage(true)
    );
    logActivity(user.uuid, "message_sent", "You sent message to Creative: " + item.name, "{user_id:'" + user.uuid + "', creative_id:'" + item.user_id + "'}");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      scroll="body"
    >
      {item && (
        <div className="add-note-modal">
          <div className="addnote-header"></div>
          <div className="addnote-body">
            <div className="job-apply-email-form-wrapper">
              <div className="inner">
                <p
                  className="text-center"
                  style={{ fontSize: 20, marginBottom: 30, fontWeight: 400 }}
                >
                  Send Message to "{item.name}"
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
