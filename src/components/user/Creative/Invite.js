import { Dialog, CircularProgress } from "@mui/material";
import { useContext, useEffect } from "react";
import {
  Context as AuthContext,
  logActivity,
} from "../../../context/AuthContext";
import { Context as AgenciesContext } from "../../../context/AgenciesContext";
import { Context as AlertContext } from "../../../context/AlertContext";
import { useState } from "react";

const Invite = ({ open, handleClose, item }) => {
  const [jobId, setJobId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);
  const [openPositions, setOpenPositions] = useState([]);

  const {
    state: { user },
  } = useContext(AuthContext);

  const {
    state: { },
    showAlert
  } = useContext(AlertContext);

  const {
    state: { open_positions },
    getOpenPositionsAll,
    sendJobInvite,
  } = useContext(AgenciesContext);

  useEffect(() => {
    console.log(open_positions);
    let validOpenPositions = [];
    for (let index = 0; index < open_positions.length; index++) {
      const element = open_positions[index];
      if (element.status == "approved") {
        validOpenPositions.push(element);
      }
    }
    setOpenPositions(validOpenPositions);
  }, [open_positions]);

  /*   const {
      state: { bookmarks },
      createBookmark,
      getBookmark,
      removeBookmark,
    } = useContext(DataContext); */


  useEffect(() => {
    if (user) getOpenPositionsAll(user.uuid, 1);
  }, [user]);

  const handleChange = (checked, id) => {
    if (checked) {
      setJobId((prev) => [...prev, id]);
    } else {
      let items = jobId.filter((item) => item !== id);
      setJobId([items]);
    }
  };

  const handleSubmit = async () => {
    if (!jobId.length) {
      setMessage(false);
      setError("Please select a job to send invite");
      return;
    }
    setLoading(true);
    try {
      for (var i = 0; i < jobId.length; i++) {
        let check = await sendJobInvite(item.user_id, jobId[i]);
      }
      showAlert('Job invitation sent successfully');
      handleClose();
      setError(false);
      // setMessage(true);
    } catch (error) {
      setMessage(false);
      setError("There was an error sending the invite");
    }
    setLoading(false);

    // logActivity(user.uuid, "message_sent", "You sent message to Creative: " + item.name, "{user_id:'" + user.uuid + "', creative_id:'" + item.user_id + "'}");
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
                <p style={{ fontSize: 25, fontWeight: 500 }}>
                  Invite to apply job
                </p>
                <p className="fs-5">Select job to invite this user</p>
                {message && (
                  <div className={`alert alert-info`}>{message}</div>
                )}
                {error && <div className={`alert alert-danger`}>{error}</div>}
                {openPositions.length > 0 &&
                  openPositions.map((item) => (
                    <div className="form-group fs-5" key={item.id}>
                      <label>
                        <input
                          className="me-2"
                          value={item.id}
                          type="checkbox"
                          onChange={(e) =>
                            handleChange(e.target.checked, item.id)
                          }
                        />
                        {item.title}
                      </label>
                    </div>
                  ))}
                <button
                  className="btn btn-gray btn-hover-primary text-uppercase ls-3 w-100 mt-4 p-3"
                  onClick={handleSubmit}
                >
                  Invite {loading && <CircularProgress size={20} color="white" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default Invite;
