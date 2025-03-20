import { Modal, Dialog, CircularProgress } from "@mui/material";
import { useContext, useEffect } from "react";
import { Context as AuthContext, logActivity } from "../../../context/AuthContext";
import { Context as ChatContext } from "../../../context/ChatContext";
import { Context as AlertContext } from "../../../context/AlertContext";
import { useState, useRef } from "react";
import CustomEditor from "../../../components/CustomEditor";
import { IoCloseCircleSharp } from "react-icons/io5";
import usePermissions from "../../../hooks/usePermissions";
import JobMessages from "../../../pages/User/JobMessages";
import { useLocation, useNavigate } from 'react-router-dom';

const Message = ({ open, setOpen = false, handleClose = false, item, type }) => {

  const [subjectData, setSubjectData] = useState("");
  const [messageData, setMessageData] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const {
    state: { loading, },
    sendMessage, getMessages,
  } = useContext(ChatContext);

  const {
    state: { user },
  } = useContext(AuthContext);

  const {
    isAdmin,
    isAdvisor,
    isAgency,
    isRecruiter,
    isCreative,
    hasSubscription,
  } = usePermissions();

  const {
    state: { message },
    showAlert,
  } = useContext(AlertContext);

  const isChatBox = open && (isAdmin || ((isAgency || isRecruiter || isAdvisor) && hasSubscription) || isCreative);

  // useEffect(() => {
  //   if (isChatBox) {
  //     const params = new URLSearchParams(location.hash.replace("#", ""));
  //     params.set("messages", item.user_id);
  //     const newPath = `#${params.toString()}`;
  //     if (location.hash !== newPath) {
  //       navigate(newPath);
  //     }
  //     // const newPath = location.hash
  //     //   ? `${location.pathname}${location.hash}&messages=${item.user_id}`
  //     //   : `${location.pathname}#messages=${item.user_id}`;
  //     // navigate(newPath);
  //   }
  // }, [isChatBox]);

  useEffect(() => {
    const params = new URLSearchParams(location.hash.replace("#", ""));
    if (params.get("messages")?.length > 0) {
      setOpen && setOpen(true);
    }
  }, [location.hash]);

  const handleSubmit = () => {
    sendMessage(user.uuid, item.user_id, messageData, type, () => {
      handleClose();
      showAlert('Message sent successfully');
      setSubjectData("");
      setMessageData("");
      (async () => {
        await getMessages(user.uuid, type);
      })();

    });
    logActivity(user.uuid, "message_sent", "You sent message to Creative: " + item.name, "{user_id:'" + user.uuid + "', creative_id:'" + item.user_id + "'}");
  };

  const closeMessageDialog = () => {
    setOpen && setOpen(false);
    handleClose && handleClose();
    setSubjectData("");
    setMessageData("");
    const params = new URLSearchParams(location.hash.replace("#", ""));
    params.delete("messages");
    navigate(`#${params.toString()}`);
  };

  return (
    <Dialog
      open={open}
      onClose={closeMessageDialog}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      scroll="body"
      maxWidth={isChatBox ? 'lg' : 'md'}
      fullWidth={isChatBox}
    >
      {isChatBox ? (
        <div className="m-4 position-relative chat-box">
          <div className="close-modal position-absolute end-0" style={{ cursor: 'pointer' }}><IoCloseCircleSharp size={30} onClick={(e) => closeMessageDialog()} /></div>
          <JobMessages />
        </div>
      ) : (
        <>
          {item && (
            <div className="add-note-modal">
              <div className="close-modal"><IoCloseCircleSharp size={30} onClick={(e) => closeMessageDialog()} /></div>
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
                    {/* {message && (
                      <div className={`alert alert-info`}>
                        Sent message successful.
                      </div>
                    )} */}
                    <div className="form-group" style={{ display: "none" }}>
                      <input
                        className="form-control mb-4"
                        name="subject"
                        placeholder="Subject"
                        required="required"
                        value={subjectData}
                        onChange={(e) => setSubjectData(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <CustomEditor
                        value={messageData}
                        setValue={setMessageData}
                        enableAdvanceEditor={true}
                        placeholder="Message"
                      />
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
        </>
      )}
    </Dialog>
  );
};

export default Message;
