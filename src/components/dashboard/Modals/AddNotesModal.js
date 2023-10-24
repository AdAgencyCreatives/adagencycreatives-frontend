import Dialog from "@mui/material/Dialog";
import "../../../styles/Modal/AddNotesModal.scss";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../context/JobsContext";
import moment from "moment";

const AddNotesModal = ({ app_id, uid, open, handleClose }) => {
  const [note, setNote] = useState("");
  const {
    state: { notes },
    getNotes,
    addNote,
  } = useContext(Context);

  const submitNote = () => {
    const data = {
      user_id: uid,
      application_id: app_id,
      body: note,
    };
    addNote(data);
  };

  useEffect(() => {
    if (open) {
      console.log("getting note");
      getNotes(app_id);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      scroll="body"
    >
      <div className="add-note-modal">
        <div className="addnote-header"></div>
        <div className="addnote-body">
          <div className="job-apply-email-form-wrapper">
            <div className="inner">
              <h3 className="text-center">
                <span>Add Note</span>
              </h3>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  className="form-control"
                  name="message"
                  placeholder="Message"
                  required="required"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                ></textarea>
              </div>
              <input type="hidden" name="action" />
              <input type="hidden" name="application_id" />
              <button
                onClick={submitNote}
                className="btn btn-gray btn-hover-primary text-uppercase ls-3 w-100 mt-3 p-3 fs-5"
              >
                Add Note
              </button>

              <div className="notes-list-item">
                {notes.length ? (
                  <>
                    <h3 className="text-center mb-4">
                      <span>Recent Notes</span>
                    </h3>
                    {notes.map((note) => (
                      <div key={note.id} className="note-item fs-5">
                        <p className="mb-0">{note.body}</p>
                        <p className="mb-0">
                          <small>
                            {moment(note.created_at).format(
                              "D MMMM, YYYY hh:mm A"
                            )}
                          </small>
                        </p>
                      </div>
                    ))}
                  </>
                ) : (
                  <p>You currently have no notes entered.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AddNotesModal;
