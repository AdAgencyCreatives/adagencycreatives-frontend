import Loader from "../Loader";
import { IoArrowBack, IoClose, IoCloseCircleSharp, IoCloseOutline, IoInformation, IoInformationCircle, IoInformationCircleOutline, IoPencil } from "react-icons/io5";
import FileIcon from "../../assets/images/FileIcon.png";
import VideoIcon from "../../assets/images/VideoIcon.png";
import { useEffect, useState, useRef, useContext } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as ChatContext } from "../../context/ChatContext";
import { Context as AlertContext } from "../../context/AlertContext";
import moment from "moment";
import NewChat from "./NewChat";
import { FaRegSmile, FaPaperclip, FaBan } from "react-icons/fa";
import EmojiPicker, { Emoji } from "emoji-picker-react";
import { api } from "../../api/api";
import { CircularProgress, Dialog, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import CustomEditor from "../CustomEditor4";
import AvatarImageLoader from "../AvatarImageLoader";
import DelayedOutput from "../DelayedOutput";

const ChatBox = ({
  page,
  chatBoxMobile,
  handleBackButton,
  contact,
  type,
  chatBox,
  setChatBox,
  setContact,
  getMessages,
  userSelected,
  setUserSelected,
  setPaged,
  paged,
  setHasMoreData,
  hasMoreData,
  messageData,
  setMessageData,
  messageType,
  refreshContacts,
  userListLoading,
}) => {

  const [showLoading, setShowLoading] = useState(false);

  const {
    state: { messages, loading, contacts, attachments, activeContact },
    sendMessage,
    getContacts,
    uploadAttachment,
    appendMessages
  } = useContext(ChatContext);

  const {
    state: { user },
  } = useContext(AuthContext);

  const {
    showAlert
  } = useContext(AlertContext);

  const [showPicker, setShowPicker] = useState(false);
  const [content, setContent] = useState("");
  const [messageSent, setMessageSent] = useState(0);
  const [draftMessages, setDraftMessages] = useState({});
  const [draftAttachments, setDraftAttachments] = useState({});
  const [chatBoxAttachments, setChatBoxAttachments] = useState([]);
  const containerRef = useRef();
  const uploadRef = useRef();
  const logoRef = useRef();

  const [topHeight, setTopHeight] = useState(300); // initial height
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(0);

  const MIN_HEIGHT = 50;
  const MAX_HEIGHT = window.innerHeight - 100;

  const startDrag = (e) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setStartHeight(topHeight);
  };

  const stopDrag = () => setIsDragging(false);

  const onDrag = (e) => {
    if (!isDragging) return;
    const deltaY = e.clientY - startY;
    let newHeight = startHeight + deltaY;
    if (newHeight >= MIN_HEIGHT && newHeight <= MAX_HEIGHT) {
      setTopHeight(newHeight);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'row-resize';
    } else {
      document.body.style.userSelect = 'auto';
      document.body.style.cursor = 'default';
    }
  }, [isDragging]);

  useEffect(() => {
    if (!Object.keys(contact).length && contacts.length) {
      // let item = contacts[0].contact;
      // setContact(item)
      // getMessages(item.uuid, type);
      if (activeContact) {
        setContact(activeContact);
        getMessages(activeContact.uuid, type);
      }
    }
  }, [contacts, contact]);


  useEffect(() => {
    setMessageData(messages);
  }, [messages]);

  useEffect(() => {
    if (contact) {
      setContent(draftMessages[contact.uuid] || "");
      setChatBoxAttachments(draftAttachments[contact.uuid] || []);
    }
  }, [contact]);

  useEffect(() => {

  }, [attachments]);

  useEffect(() => {
    if (!hasMoreData) {
      scrollToBottom();
    }
  }, [messageData]);

  const scrollToBottom = () => {
    if (containerRef.current)
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
  };

  const handleMessageChange = (value) => {
    updateDraftMessage(value);
  };

  const updateDraftMessage = (msg) => {
    let newDraftMessages = { ...draftMessages };
    let messageBody = msg;
    newDraftMessages[contact.uuid] = messageBody;
    setDraftMessages(newDraftMessages);
  };

  const updateDraftAttachment = (action, response = null) => {
    let newDraftAttachments = { ...draftAttachments };

    if (action == "reset") {
      newDraftAttachments[contact.uuid] = response;
      setDraftAttachments(newDraftAttachments);
      setChatBoxAttachments(response);
      return;
    }

    let atts = newDraftAttachments[contact.uuid] || [];

    if (atts?.length > 0 && action == "upload_finish") {
      atts[atts.length - 1] = response;
      atts[atts.length - 1].uploaded = true;
    } else {
      atts.push(response);
    }

    newDraftAttachments[contact.uuid] = atts;
    setDraftAttachments(newDraftAttachments);
    setChatBoxAttachments(atts);
  };

  const handleSubmit = async () => {
    if (!content || content.length == 0) {
      showAlert("Enter your Message");
      return;
    }
    /* setMessageData((prev) => [
      ...prev,
      {
        created_at: Date.now(),
        message: content,
        message_type: "sent",
      },
    ]); */
    let messageBody = content;
    if (chatBoxAttachments.length) {
      chatBoxAttachments.forEach((item) => {
        messageBody += "<br/>";
        messageBody += item.url;
      });
    }

    const type = messageData?.slice(-1)?.pop()?.type ?? (messageType?.split(',')[0] ?? 'job');
    // const type = messageData.slice(-1).pop()?.type ?? 'job';
    // const type = messageType ?? (messageData.slice(-1).pop()?.type ?? 'job');
    await sendMessage(user.uuid, contact.uuid, messageBody, type);
    //showAlert("Message sent");

    setContent("");
    setMessageSent(prev => prev + 1);
    setChatBoxAttachments([]);
    updateDraftMessage("");
    updateDraftAttachment("reset", []);

    setChatBox("list");
    setContact(contact);

    await getMessages(contact.uuid, type);
    await getContacts(type);
  };

  const parseDate = (dateString) => {
    const parsedDate = moment(dateString);

    const currentDate = moment();

    let result = "";

    if (currentDate.isSame(parsedDate, "day")) {
      result = `Today, ${parsedDate.format("h:mm a")}`;
    } else if (currentDate.isSame(parsedDate, "week")) {
      result = `${parsedDate.format("dddd h:mma")}`;
    } else {
      result = `${parsedDate.format("M/D/YYYY h:mma")}`;
    }
    return result;
  };

  const selectEmoji = (emojiData) => {
    setContent((prev) => (prev += emojiData.emoji));
    setShowPicker(false);
  };

  const handleFileChange = async (event, resource) => {
    const file = event.target.files[0];

    let isImage = file.type.indexOf("image") >= 0;
    let isVideo = file.type.indexOf("video") >= 0;

    if (file) {
      const src = URL.createObjectURL(file);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user_id", user.uuid);
      formData.append("resource_type", "message_" + (isVideo ? "video" : (isImage ? "image" : "file")));
      await uploadAttachment(formData, src, (action, response) => {
        updateDraftAttachment(action, response);
      });
    }
  };
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

  function parseMessage(message) {
    const result = {
      message: "",
      attachments: [],
    };

    // Split the message by '<br/>'
    const lines = message.split("<br/>");
    let imageTypes = ['JPG', 'PNG', 'GIF', 'WEBP', 'TIFF', 'RAW', 'BMP', 'HEIF', 'INDD', 'JPEG', 'SVG', 'AI', 'EPS'];
    let videoTypes = ['WEBM', 'MPG', 'MP2', 'MPEG', 'MPE', 'MPV', 'OGG', 'MP4', 'M4P', 'M4V', 'AVI', 'WMV', 'MOV', 'QT', 'FLV', 'SWF', 'AVCHD'];

    lines.forEach((line) => {
      if (line.includes("s3.amazonaws.com")) {
        // Check if the line contains a link
        let url = line?.trim();
        let ext = url?.slice(url?.lastIndexOf(".") + 1)?.toUpperCase();
        let att = { 'url': url, 'resource_type': "message_" + (imageTypes.includes(ext) ? "image" : (videoTypes.includes(ext) ? "video" : "file")) };
        result.attachments.push(att); // Trim to remove any extra spaces
      } else {
        // If it's not a link, consider it as text
        result.message +=
          result.message !== "" ? ` ${line.trim()}` : line.trim();
      }
    });

    return result;
  }

  useEffect(() => {
    const loadMoreMessages = async () => {
      if (containerRef.current && containerRef.current.scrollTop === 0) {
        const id = contact.uuid;
        const type = messageData?.slice(-1)?.pop()?.type ?? (messageType?.split(',')[0] ?? 'job');
        // const type = messageData.slice(-1).pop()?.type ?? 'job';
        // const type = messageType ?? (messageData.slice(-1).pop()?.type ?? 'job');

        const response = await api.get("/messages/" + id + "?type=" + type + "&page=" + paged);
        const newMessages = response.data.data ?? [];
        if (newMessages.length !== 0) {
          setHasMoreData(true);
          setMessageData((prevMessages) => [...newMessages, ...prevMessages]);
          setPaged((prevPaged) => prevPaged + 1);
        }
      }
    };

    // Bắt sự kiện scroll trên khung chat
    const handleScroll = () => {
      loadMoreMessages();
    };
    if (containerRef.current)
      containerRef.current.addEventListener('scroll', handleScroll);
    return () => {
      if (containerRef.current)
        containerRef.current.removeEventListener('scroll', handleScroll);
    };
  }, [messageData, hasMoreData, paged]);

  const closeEmojiHandler = () => {
    setShowPicker(false);
  };

  useEffect(() => {
    if (!userSelected) {
      setContent("");
    }
  }, [userSelected]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpenEdit, setIsDialogOpenEdit] = useState(false);
  const [isId, setIsId] = useState(false);
  const [messageTmp, setMessageTmp] = useState("");

  useEffect(() => {
    console.log(messageTmp);
  }, [messageTmp]);

  const deleteMessage = (item) => {
    if ((item.sender_id == user.uuid)) {
      setIsId(item.id);
      setIsDialogOpen(true);
    }
  };

  const closeDeleteMessage = () => {
    setIsDialogOpen(false);
    setIsId(0);
  };
  const closeEditMessage = () => {
    setIsDialogOpenEdit(false);
    setIsId(0);
  };
  const editMessage = (item) => {
    if (item.sender_id == user.uuid) {
      setIsId(item.id);
      setMessageTmp(item.message);
      setTimeout(() => setIsDialogOpenEdit(true), 500); // Delay opening to ensure state update
    }
  };

  const [formDelete, setFormDelete] = useState(false);
  const [formEdit, setFormEdit] = useState(false);
  const handleDelete = async () => {
    setFormDelete(true);
    try {
      const response = await api.post("/delete-single-message/" + isId);
      showAlert("Message deleted")
    } catch (error) { }
    setFormDelete(false);
    setIsDialogOpen(false);

    await getMessages(contact.uuid, type);
    await getContacts(type);
  };

  const handleEdit = async () => {
    setFormEdit(true);

    const data = { id: isId, message: messageTmp, edited: true };
    // console.log(data, 'data');
    try {
      const response = await api.patch("/messages/" + isId, data);
      showAlert("Message updated")
    } catch (error) { }
    setFormEdit(false);
    setIsDialogOpenEdit(false);

    await getMessages(contact.uuid, type);
    await getContacts(type);
  };

  useEffect(() => {
    if (!loading) {
      scrollToLastMessage();
    }
  }, [loading]);

  const scrollToLastMessage = () => {
    window.setTimeout(() => {
      scrollToBottom();
    }, 1000);
  };

  return (
    <>
      {activeContact || chatBox == "new" ? (
        <div className={`chat-box ${chatBoxMobile}`} onMouseMove={onDrag} onMouseUp={stopDrag}>
          <div className="chat-mobile-top d-md-none d-flex">
            <IoArrowBack size={20} onClick={handleBackButton} />

            <div className="name">
              {chatBox != "new" ? (contact.first_name + " " + contact.last_name) : "Back"}
            </div>
          </div>
          <div 
            className="chat-top"
            style={{
              height: `${topHeight}px`,
              transition: isDragging ? 'none' : 'height 0.3s ease',
            }}
          >
            {chatBox == "new" ? (
              <NewChat setContact={setContact} contacts={contacts} userSelected={userSelected} setUserSelected={setUserSelected} />
            ) : (
              <div ref={containerRef} className="chat-area">
                {loading ? (
                  <DelayedOutput delay={1000}>
                    <Loader fullHeight={false} />
                  </DelayedOutput>
                ) : (
                  <>
                    {messageData && messageData.map((item, index) => {
                      const is_sender = user?.uuid == item?.sender_id;
                      const is_receiver = user?.uuid == item?.receiver_id;
                      const is_message_deleted = item?.sender_deleted_at || item?.receiver_deleted_at;
                      const is_system_message = item?.message.indexOf("<a") == 0 && item?.message.indexOf("applied on the job") > 0 ? true : false;

                      const elements = document.querySelectorAll('.users-list .active');
                      let dataIdValue = 0;
                      elements.forEach((element) => {
                        dataIdValue = element.getAttribute('data-id');
                      });
                      const sender = item.message_type == "sent" ? user : contact;
                      const time = parseDate(item.created_at);
                      const created_at = parseDateShort(item.created_at);
                      const { message, attachments } = parseMessage(item.message);
                      if (item.message_type == 'received') {
                        if (item.sender_id != dataIdValue && item.human_readable_date.includes('second')) {
                          const myDiv = document.querySelector('[data-id="' + item.sender_id + '"]');
                          if (myDiv) {
                            const childElement = myDiv.querySelector('.message-time');

                            if (childElement) {
                              childElement.classList.add('unread');
                              childElement.innerHTML = created_at;
                            }
                            const childMess = myDiv.querySelector('.user-message');

                            if (childMess) {
                              childMess.innerHTML = item.message;
                            }
                          }
                          return null;
                        }
                      }

                      return (
                        <div className="chat-item" key={"message" + index}>
                          <AvatarImageLoader user={sender} height={40} width={40} className="chat-avatar" />
                          <div className="details">
                            <div className="sender">
                              {(sender?.role == "creative" || sender?.role == "agency") ? (<>
                                <Link
                                  to={"/" + sender?.role + "/" + sender?.username}
                                  className="link link-black hover-gold"
                                >{sender.first_name + " " + sender.last_name}</Link>
                              </>) : (<>
                                {sender.first_name + " " + sender.last_name}
                              </>)}
                              <span className="time">{time}</span>
                              {item?.edited_at && (
                                <Tooltip title={parseDate(item?.edited_at)}>
                                  <span className="edited">Edited</span>
                                </Tooltip>
                              )}
                              {!is_message_deleted && sender == user && (
                                <div className="job-action">
                                  {!is_system_message ? (
                                    <>
                                      <Tooltip title="Edit">
                                        <Link
                                          className="btn p-0 border-0 btn-hover-primary"
                                          onClick={() => editMessage(item)}
                                        >
                                          <IoPencil className="icon-rounded" />
                                        </Link>
                                      </Tooltip>

                                      <Tooltip title="Remove">
                                        <Link
                                          className="btn p-0 border-0 btn-hover-primary"
                                          onClick={() => deleteMessage(item)}
                                        >
                                          <IoClose className="icon-rounded" />
                                        </Link>
                                      </Tooltip>
                                    </>
                                  ) : (
                                    <Tooltip title="Automatic Job Apply Confirmation">
                                      <Link
                                        className="btn p-0 border-0 btn-hover-primary"
                                      >
                                        <IoInformationCircleOutline className="icon-rounded" />
                                      </Link>
                                    </Tooltip>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="text">
                              {is_message_deleted ? (
                                <span className="single-message-deleted">
                                  <FaBan />
                                  This message was deleted
                                </span>
                              ) : (
                                <>
                                  <div dangerouslySetInnerHTML={{ __html: message }}></div>
                                  <div className="message_attachments">
                                    {attachments.length > 0 &&
                                      attachments.map((attachment, index) => (<>
                                        {attachment.resource_type && attachment.resource_type == "message_video" ? (
                                          <div className="video-container">
                                            <video className="video" controls muted playsInline>
                                              <source src={attachment.url} type={"video/" + attachment.url.substring(attachment.url.lastIndexOf('.') + 1)} />
                                              Sorry, your browser doesn't support videos.
                                            </video>
                                          </div>
                                        ) : (<>
                                          {attachment.resource_type && attachment.resource_type == "message_image" ? (
                                            <a href={attachment.url || "#"} target="_blank" rel="noreferrer">
                                              <img className="post-image" src={attachment.url || ""} alt="" />
                                            </a>
                                          ) : (
                                            <a href={attachment.url || "#"} target="_blank" rel="noreferrer">
                                              <img className="post-image" src={FileIcon} alt="" />
                                            </a>
                                          )}
                                        </>)}
                                      </>))}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            )}
          </div>
          {/* Separator */}
          <div
            onMouseDown={startDrag}
            style={{
              height: '4px',
              cursor: 'row-resize',
              background: '#ccc',
              userSelect: 'none',
            }}
          ></div>
          <div
            className="chat-footer"
            style={{
              // height: `${650 - topHeight}px`,
              transition: isDragging ? 'none' : 'height 0.3s ease',
              background: '#fff'
            }}
          >
            <div className="message-box">
              <div className="message-input">
                <CustomEditor
                  key={messageSent}
                  editorId="message-sent"  // Unique ID for each message
                  value={content}
                  setValue={setContent}
                  onValueChange={handleMessageChange}
                  enableAdvanceEditor={true}
                  placeholder="Message"
                  height={550 - topHeight}
                />
              </div>
            </div>
            {chatBoxAttachments.length > 0 && (
              <div className="attachments">
                {chatBoxAttachments.map((attachment, index) => {
                  return (<div className="item" key={"at_" + index}>
                    {!attachment.uploaded ? (
                      <Loader fullHeight={false} />
                    ) : (<>
                      {attachment.resource_type && attachment.resource_type == "message_video" ? (
                        <a href={attachment.url || "#"} target="_blank" rel="noreferrer">
                          <img className="post-image" src={VideoIcon} alt="" />
                        </a>
                      ) : (<>
                        {attachment.resource_type && attachment.resource_type == "message_image" ? (
                          <a href={attachment.url || "#"} target="_blank" rel="noreferrer">
                            <img className="post-image" src={attachment.url || ""} alt="" />
                          </a>
                        ) : (
                          <a href={attachment.url || "#"} target="_blank" rel="noreferrer">
                            <img className="post-image" src={FileIcon} alt="" />
                          </a>
                        )}
                      </>)}
                    </>)}
                  </div>);
                })}
              </div>
            )}
            <div className="message-actions">
              {page == "lounge" && (
                <>
                  <FaRegSmile onClick={() => setShowPicker((val) => !val)} />
                  {showPicker && (
                    <div className="emoji-picker-container">
                      <EmojiPicker
                        previewConfig={{ showPreview: false }}
                        skinTonesDisabled={true}
                        height={250}
                        suggestedEmojisMode=""
                        categories={[
                          "smileys_people",
                          "animals_nature",
                          "food_drink",
                          "travel_places",
                          "activities",
                          "objects",
                          "symbols",
                          "flags",
                        ]}
                        onEmojiClick={selectEmoji}
                      />
                      <IoCloseCircleSharp className="emoji-exit" onClick={(e) => setShowPicker(false)} />
                    </div>
                  )}
                  <FaPaperclip onClick={() => uploadRef.current.click()} />
                  <input
                    type="file"
                    ref={uploadRef}
                    className="d-none"
                    onChange={(e) => handleFileChange(e)}
                  />
                </>
              )}
              <div className="send-message">
                <button id="btn-send" className="btn btn-send" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </div>
          </div>

          <Dialog
            open={isDialogOpen} onClose={closeDeleteMessage}
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
                        Delete message?
                      </h3>
                      <button
                        className="border-0 bg-transparent text-primary"
                        onClick={() => closeDeleteMessage()}>
                        <IoCloseOutline size={30} />
                      </button>
                    </div>
                    <p className="text-center">
                      Are you sure you want to delete this message ?
                    </p>
                    <div className="d-flex align-items-center justify-content-end">
                      <button className="btn btn-silver hover-gold p-3 px-5 ls-3 text-uppercase" disabled={formDelete} onClick={handleDelete}>
                        Delete {formDelete && <CircularProgress size={20} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Dialog>
          <Dialog
            open={isDialogOpenEdit} onClose={closeEditMessage}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            aria-hidden="false"
            scroll="body"
          >
            <div className="auth-modal">
              <div className="auth-header"></div>
              <div className="auth-body">
                <div className="job-apply-email-form-wrapper">
                  <div className="inner">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <h3 style={{ fontSize: 24, marginBottom: 0, fontWeight: 400 }}>
                        Edit message
                      </h3>
                      <button
                        className="border-0 bg-transparent text-primary"
                        onClick={() => closeEditMessage()}>
                        <IoCloseOutline size={30} />
                      </button>
                    </div>
                    <div className="mb-4">
                      <CustomEditor
                        editorId={`edit-message-${isId}`}  // Unique ID for each message
                        value={messageTmp}
                        setValue={setMessageTmp}
                        enableAdvanceEditor={true}
                        placeholder="Message"
                        height={550 - topHeight}
                      />
                    </div>
                    <div className="d-flex align-items-center justify-content-end">
                      <button className="btn btn-silver hover-gold p-3 px-5 ls-3 text-uppercase" disabled={formEdit} onClick={handleEdit}>
                        Update {formEdit && <CircularProgress size={20} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Dialog>
        </div>
      ) : (
        <>
          {userListLoading ? (
            <div className="flex-center-center">
              <CircularProgress />
            </div>
          ) : (
            <div className="no-contact-selected">
              <span className="alert alert-secondary">Select a contact to view messages</span>
            </div>
          )}
        </>

      )}
    </>
  );
};

export default ChatBox;
