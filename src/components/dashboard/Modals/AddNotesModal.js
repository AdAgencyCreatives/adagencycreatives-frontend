import Dialog from "@mui/material/Dialog";
import "../../../styles/Modal/AddNotesModal.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { Context as JobsContext } from "../../../context/JobsContext";
import { Context as AuthContext } from "../../../context/AuthContext";
import { Context as AlertContext } from "../../../context/AlertContext";
import { usePopupScrollLoader } from "../../../hooks/usePopupScrollLoader";
import moment from "moment";
import { CircularProgress, Link, Tooltip } from "@mui/material";
import TimeAgo from "../../TimeAgo";
import { convertUTCDateToLocalDate } from "../../UtcToLocalDateTime";
import DelayedOutput from "../../DelayedOutput";
import { IoClose, IoCloseCircleSharp, IoCloseSharp, IoPencil } from "react-icons/io5";
import CustomEditor from "../../../components/CustomEditor";
import CommonDeleteModal from "../../../components/modals/CommonDeleteModal";

const AddNotesModal = ({ resource_id, type, open, setOpen, handleClose, statusJob }) => {

  const [note, setNote] = useState("");
  const [notesData, setNotesData] = useState([]);
  const [message, setMessage] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
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

  const {
    showAlert,
  } = useContext(AlertContext);

  const submitNote = async () => {
    if (selectedNote?.id) {
      await updateNote(selectedNote.id, {
        body: note,
      }, () => {
        // setMessage("Note successfully updated")
        setNote('');
        setSelectedNote(null);
        showAlert('Note successfully updated');
        handleClose();
      });
    } else {
      await addNote({
        resource_type: type,
        resource_id,
        body: note,
      }, () => {
        // setMessage('Note successfully saved')
        // getNotes(user.uuid, resource_id, type);
        setNote('');
        showAlert('Note successfully saved');
        handleClose();
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
    await deleteNote(item.id, () => {
      setNote('');
      showAlert('Note successfully deleted');
      handleClose();
    });
  };

  useEffect(() => {
    if (open && user) {
      getNotes(user.uuid, resource_id, type);
    }
  }, [open, user]);

  useEffect(() => {
    setNotesData(notes || []);
  }, [notes]);

  useEffect(() => {
    setSelectedNote(null);
    setNote('');
    setMessage(false);
    setNotesData([]);
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
        <div className="close-modal"><IoCloseCircleSharp size={30} onClick={(e) => setOpen(false)} /></div>
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
                <CustomEditor
                  value={note}
                  setValue={setNote}
                  enableAdvanceEditor={true}
                  placeholder=""
                />
              </div>
              <input type="hidden" name="action" />
              <input type="hidden" name="application_id" />
              <button
                onClick={submitNote}
                className="btn btn-gray btn-hover-primary text-uppercase ls-3 w-100 mt-3 p-3 fs-5"
              >
                {selectedNote?.id ? 'Update' : 'Add'} Note
              </button>
              {selectedNote?.id && (<Link className="reset-note" onClick={(e) => onCancelEditNote(e)}>Cancel</Link>)}
              <div className="text-center mb-1 mt-1" style={{ visibility: isLoading ? 'visible' : 'hidden' }}>
                <CircularProgress size={20} />
              </div>
              <div className="notes-list-item">
                {notesData?.length > 0 ? (
                  <>
                    <h3 className="text-center mb-4">
                      <span>Recent Notes</span>
                    </h3>
                    {notesData.map((note) => (
                      <div key={note.id} className="note-item fs-5">
                        <div dangerouslySetInnerHTML={{ __html: note.body }}></div>
                        <p className="mb-0">
                          <small>
                            {/* <TimeAgo datetime={note.updated_at} />,&nbsp; */}
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
                              onClick={(e) => setDeleteModalOpen(true)}
                            >
                              <IoClose className="icon-rounded" />
                            </Link>
                          </Tooltip>
                          <CommonDeleteModal
                            title="Confirming Deletion Request"
                            message="Are you sure you want to delete this note?"
                            open={deleteModalOpen}
                            setOpen={setDeleteModalOpen}
                            onConfirm={() => onDeleteNote(note)}
                          />
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
