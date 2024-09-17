import moment from "moment";
import { useContext, useEffect } from "react";
import { Context } from "../../context/ChatContext";
import { Tooltip, Dialog, CircularProgress } from "@mui/material";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as AlertContext } from "../../context/AlertContext";
import React, { useState } from 'react';
import {
  IoClose,
  IoArrowForward,
  IoLocationOutline,
  IoCheckmarkCircle,
  IoPencil,
  IoLockOpen,
  IoCloseOutline,
  IoRefresh
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { api } from "../../api/api";

import AvatarImageLoader from "../AvatarImageLoader";

const UserList = (props) => {
  const { messageType, page, data, handleItemClick, refreshContacts, setMessageData } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenEdit, setIsDialogOpenEdit] = useState(false);
  const [isId, setIsId] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [messageTmp, setMessageTmp] = useState();
  const [conversationData, setConversationData] = useState([]);

  useEffect(() => {
    setConversationData(data);
  }, [data]);

  const {
    state: { user },
  } = useContext(AuthContext);

  const {
    showAlert
  } = useContext(AlertContext);

  const parseDateShort = (dateString) => {
    const parsedDate = moment(dateString);

    const currentDate = moment();

    let result = "";

    if (currentDate.isSame(parsedDate, "day")) {
      result = `${parsedDate.format("h:mm a")}`;
    } else if (currentDate.isSame(parsedDate, "week")) {
      result = `${parsedDate.format("dddd")}`;
    } else {
      result = `${parsedDate.format("M/D/YYYY")}`;
    }
    return result;
  };

  const { state: { activeContact } } = useContext(Context)

  function sanitizeText(text) {
    // Remove links with <br/>
    const sanitizedText = text.replace(/<br\/>.*?s3\.amazonaws\.com.*?(\s|$)/g, ' ');

    // Remove any extra whitespace
    return sanitizedText;
  }

  const getShortMessage = (messageText) => {
    let newMessage = messageText;
    while (newMessage.indexOf("<br>") >= 0 || newMessage.indexOf("<br/>") >= 0 || newMessage.indexOf("<br />") >= 0) {
      newMessage = newMessage.replace("<br>", "\n");
      newMessage = newMessage.replace("<br/>", "\n");
      newMessage = newMessage.replace("<br />", "\n");
    }

    while (newMessage.indexOf("<div>") >= 0 || newMessage.indexOf("</div>") >= 0) {
      newMessage = newMessage.replace("<div>", "\n");
      newMessage = newMessage.replace("</div>", "\n");
    }

    while (newMessage.indexOf("<p>") >= 0 || newMessage.indexOf("</p>") >= 0) {
      newMessage = newMessage.replace("<p>", "\n");
      newMessage = newMessage.replace("</p>", "\n");
    }

    while (newMessage.indexOf("\n\n") >= 0) {
      newMessage = newMessage.replace("\n\n", "\n");
    }

    let lines = newMessage.indexOf("\n") >= 0 ? newMessage.split('\n') : [newMessage];
    let shortMessage = (lines.length > 3 ? lines.slice(0, 3) : lines).join("<br />");

    let clipLimit = 120;
    if (shortMessage.length >= clipLimit) {
      return shortMessage.substring(0, Math.min(shortMessage.length, clipLimit)) + "...";
    }
    return shortMessage;
  };

  const [formDelete, setFormDelete] = useState(false);
  const [formEdit, setFormEdit] = useState(false);

  const handleDelete = async () => {
    setFormDelete(true);
    let deletedCount = 0;
    try {
      const response = await api.post(`/delete-conversation?message_type=${messageType}&user1=${selectedItem.sender_id}&user2=${selectedItem.receiver_id}`);
      deletedCount = response.data;
    } catch (error) {
      console.log(error);
    }
    setIsDialogOpen(false);
    setFormDelete(false);
    if (deletedCount) {
      // window.location.reload();
      setMessageData([]);
      await refreshContacts();
      showAlert("Conversation deleted");
    }
  };

  const handleEdit = async () => {
    setFormEdit(true);
    const data = { id: isId, message: messageTmp };
    console.log(data, 'data');
    try {
      const response = await api.patch("/messages/" + isId, data);
    } catch (error) { }
    setIsDialogOpenEdit(false);
    window.location.reload();
  };

  const deleteConversation = (item) => {
    setIsDialogOpen(true);
    setSelectedItem(item);
    setIsId(item.id);
  };

  const closeDeleteConversation = () => {
    setIsDialogOpen(false);
    setSelectedItem(null);
    setIsId(0);
  };
  const handleChange = (key, value) => {
    setMessageTmp(value);
  };

  return (
    <ul className="users-list">
      <Dialog
        open={isDialogOpen} onClose={closeDeleteConversation}
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
                    Delete Conversation?
                  </h3>
                  <button
                    className="border-0 bg-transparent text-primary"
                    onClick={() => closeDeleteConversation()}>
                    <IoCloseOutline size={30} />
                  </button>
                </div>
                <p className="text-center">
                  Are you sure you want to delete this conversation ?
                </p>
                <div className="d-flex align-items-center justify-content-end">
                  <button className="btn btn-gray btn-hover-primary p-3 px-5 ls-3 text-uppercase" disabled={formDelete} onClick={handleDelete}>
                    Delete {formDelete && <CircularProgress size={20} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
      {conversationData?.map((item) => (
        <li data-id={item.contact.uuid}
          className={(item.contact.uuid == activeContact) ? "active" : ""}
          onClick={() => {
            handleItemClick(item.contact, messageType, conversationData);
            document.getElementById("message-status-" + item.contact.uuid)?.classList?.remove('unread');
          }}
          key={item.id}
        >
          <AvatarImageLoader user={item?.contact} height={40} width={40} />
          <div className="user-details">
            <div className="d-flex justify-content-between align-items-center">
              <div className="username">
                {item.contact.first_name} {item.contact.last_name}
              </div>
              <div id={"message-status-" + item.contact.uuid} className={"message-time" + ((item.read_at || item.message_type == "sent") ? "" : " unread")}>
                {parseDateShort(item.created_at)}

              </div>
              <div className="job-action">
                <Tooltip title="Remove">
                  <Link
                    className="btn p-0 border-0 btn-hover-primary"
                    onClick={() => deleteConversation(item)}
                  >
                    <IoClose className="icon-rounded" />
                  </Link>
                </Tooltip>
              </div>
            </div>
            <div className="user-message" dangerouslySetInnerHTML={{ __html: getShortMessage((item?.sender_id == user?.id ? "You" : item.contact.first_name) + ": " + sanitizeText(item.message)) }}></div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
