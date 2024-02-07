import Dialog from "@mui/material/Dialog";
import "../../../styles/Modal/AddNotesModal.scss";
import { useContext, useEffect, useState } from "react";
import { Context as JobsContext } from "../../../context/JobsContext";
import { Context as AuthContext } from "../../../context/AuthContext";
import { usePopupScrollLoader } from "../../../hooks/usePopupScrollLoader";
import moment from "moment";
import { CircularProgress, Link, Tooltip } from "@mui/material";
import TimeAgo from "../../TimeAgo";
import { convertUTCDateToLocalDate } from "../../UtcToLocalDateTime";
import DelayedOutput from "../../DelayedOutput";
import { IoClose, IoCloseCircleSharp, IoCloseSharp, IoPencil } from "react-icons/io5";

const AddNotesModal = ({ resource_id, type, open, handleClose, statusJob }) => {
  const [note, setNote] = useState("");
  const [message, setMessage] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const {
    state: { notes, notesNextPage, isLoading },
    getNotes,
    addNote,
    updateNote,
    deleteNote,
    getNextPageNotes
  } = useContext(JobsContext);

  const {
    state: { user },
  } = useContext(AuthContext);

  const submitNote = async () => {
    if (selectedNote?.id) {
      await updateNote(selectedNote.id, {
        body: note,
      }, () => {
        setMessage("Note successfully updated")
        setNote('');
        setSelectedNote(null);
      });
    } else {
      await addNote({
        resource_type: type,
        resource_id,
        body: note,
      }, () => {
        setMessage('Note successfully saved')
        setNote('');
        getNotes(user.uuid, resource_id, type);
      });
    }
  };

  const onEditNote = async (item) => {
    setSelectedNote(item);
    setNote(item.body);
  };

  const onCancelEditNote = async () => {
    setSelectedNote(null);
    setNote('');
    setMessage(false);
  };

  const onDeleteNote = async (item) => {
    if (!window.confirm("Are you sure to delete this note?")) {
      return;
    }
    await deleteNote(item.id, () => {
      setMessage('Note successfully deleted')
      setNote('');
      getNotes(user.uuid, resource_id, type)
    });
  };

  useEffect(() => {
    if (open && user) {
      getNotes(user.uuid, resource_id, type);
    }
  }, [open, user]);

  useEffect(() => {
    setMessage(false);
  }, [open]);

  const loadMore = () => {
    if (notesNextPage) getNextPageNotes(user.uuid, resource_id, type, notesNextPage);
  };

  usePopupScrollLoader(isLoading, loadMore);

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

              {message && (
                <div className={`alert alert-info note-alert`}>
                  {message}
                  <IoCloseCircleSharp className="note-alert-close" onClick={() => setMessage(false)} />
                </div>
              )}

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
                {selectedNote?.id ? 'Update' : 'Add'} Note {isLoading && <CircularProgress size={20} />}
              </button>
              {selectedNote?.id && (<Link className="reset-note" onClick={(e) => onCancelEditNote(e)}>Cancel</Link>)}

              <div className="notes-list-item">
                {notes?.length > 0 ? (
                  <>
                    <h3 className="text-center mb-4">
                      <span>Recent Notes</span>
                    </h3>
                    {notes.map((note) => (
                      <div key={note.id} className="note-item fs-5">
                        <p className="mb-0">{note.body}</p>
                        <p className="mb-0">
                          <small>
                            <TimeAgo datetime={note.updated_at} />,&nbsp;
                            {/* {convertUTCDateToLocalDate(note.created_at).toString()} */}
                            {moment(convertUTCDateToLocalDate(note.created_at)).format(
                              "D MMMM, YYYY hh:mm A"
                            )}
                          </small>
                        </p>
                        <div className="notes-action">
                          <Tooltip title="Edit">
                            <Link
                              className="btn p-0 border-0 btn-hover-primary"
                              onClick={(e) => onEditNote(note)}
                            >
                              <IoPencil className="icon-rounded" />
                            </Link>
                          </Tooltip>

                          <Tooltip title="Remove">
                            <Link
                              className="btn p-0 border-0 btn-hover-primary"
                              onClick={(e) => onDeleteNote(note)}
                            >
                              <IoClose className="icon-rounded" />
                            </Link>
                          </Tooltip>
                        </div>
                      </div>
                    ))}
                    <div className="load-more text-center">
                      {isLoading && (
                        <div className="spinner-border text-light" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <DelayedOutput delay={2000}>
                    <p>You currently have no notes entered.</p>
                  </DelayedOutput>
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
