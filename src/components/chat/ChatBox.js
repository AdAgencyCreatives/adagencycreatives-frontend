import ContentEditable from "react-contenteditable";
import Loader from "../Loader";
import { IoArrowBack } from "react-icons/io5";
import Avatar from "../../assets/images/placeholder.png";
import UploadPlaceholder from "../../assets/images/Mischief-1.png";
import { useEffect, useState, useRef, useContext } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as ChatContext } from "../../context/ChatContext";
import { Context as AlertContext } from "../../context/AlertContext";
import moment from "moment";
import NewChat from "./NewChat";
import { FaRegSmile, FaPaperclip } from "react-icons/fa";
import EmojiPicker, { Emoji } from "emoji-picker-react";

const ChatBox = ({
  page,
  chatBoxMobile,
  handleBackButton,
  contact,
  type,
  chatBox,
  setChatBox,
  setContact,
  getMessages
}) => {
  const {
    state: { messages, loading, contacts, attachments },
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
  const [messageData, setMessageData] = useState([]);
  const [content, setContent] = useState("");
  const containerRef = useRef();
  const uploadRef = useRef();
  const logoRef = useRef();
  const [dataId, setDataId] = useState(0);

  useEffect(() => {
    if (!Object.keys(contact).length && contacts.length) {
      let item = contacts[0].contact;
      setContact(item)
      getMessages(item.uuid, type);
    }
  }, [contacts, contact]);

  useEffect(() => {
    setMessageData(messages);
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messageData]);

  const scrollToBottom = () => {
    if (containerRef.current)
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
  };

  const handleMessageChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    setContent("");
    /* setMessageData((prev) => [
      ...prev,
      {
        created_at: Date.now(),
        message: content,
        message_type: "sent",
      },
    ]); */
    let messageBody = content;
    if (attachments.length) {
      attachments.forEach((item) => {
        messageBody += "<br/>";
        messageBody += item.url;
      });
    }

    const type = messageData.slice(-1).pop()?.type ?? 'job';
    await sendMessage(user.uuid, contact.uuid, messageBody, type);
    showAlert("Message sent");
    const id = contact.uuid;

    let existingObject = contacts.find((obj) => obj.contact.uuid === id);
    if (!existingObject) {
      setChatBox("list");
      getMessages(id, type);
      await getContacts("private");
    }
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
    if (file) {
      const src = URL.createObjectURL(file);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user_id", user.uuid);
      formData.append("resource_type", "message");
      await uploadAttachment(formData, src);
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

    lines.forEach((line) => {
      if (line.includes("s3.amazonaws.com")) {
        // Check if the line contains a link
        result.attachments.push(line.trim()); // Trim to remove any extra spaces
      } else {
        // If it's not a link, consider it as text
        result.message +=
          result.message !== "" ? ` ${line.trim()}` : line.trim();
      }
    });

    return result;
  }
  let paged = 1;
  const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
      const loadMoreMessages = async () => {
        if (containerRef.current && containerRef.current.scrollTop === 0) {
          paged++;
          const type = messages.slice(-1).pop()?.type ?? 'job';
          appendMessages(contact.uuid, type, paged);
        }
      };

      // Bắt sự kiện scroll trên khung chat
      const handleScroll = () => {
        // loadMoreMessages();
      };
      if(containerRef.current)
        containerRef.current.addEventListener('scroll', handleScroll);
      return () => {
        if(containerRef.current)
          containerRef.current.removeEventListener('scroll', handleScroll);
      };
    }, [messages]);

  return (
    <div className={`chat-box ${chatBoxMobile}`}>
      <div className="chat-mobile-top d-md-none d-flex">
        <IoArrowBack size={20} onClick={handleBackButton} />
        <div className="name">{contact.first_name + " " + contact.last_name}</div>
      </div>
      <div className="chat-top">
        {chatBox == "new" ? (
          <NewChat setContact={setContact} contacts={contacts} />
        ) : (
          <div ref={containerRef} className="chat-area">
            {loading ? (
              <Loader fullHeight={false} />
            ) : (
              messages.map((item, index) => {
                const elements = document.querySelectorAll('.users-list .active');
                let dataIdValue = 0;
                elements.forEach((element) => {
                   dataIdValue = element.getAttribute('data-id');
                });
                const sender = item.message_type == "sent" ? user : contact;
                const time = parseDate(item.created_at);
                const created_at = parseDateShort(item.created_at);
                const { message, attachments } = parseMessage(item.message);
                if(item.message_type == 'received'){
                  if(item.sender_id != dataIdValue){
                    const myDiv = document.querySelector('[data-id="'+item.sender_id+'"]');
                    if (myDiv) {
                      const childElement = myDiv.querySelector('.message-time');

                      if (childElement) {
                        childElement.classList.add('unread');
                        childElement.innerHTML =  created_at;
                      }
                      const childMess = myDiv.querySelector('.user-message');

                      if (childMess) {
                        childMess.innerHTML = item.message;
                      }
                    }
                    // console.log(myDiv,'myDiv');
                    return null;
                  }
                }
                
                return (
                  <div className="chat-item" key={"message" + index}>
                    <img
                      src={sender.image || Avatar}
                      height={35}
                      width={35}
                      className="chat-avatar"
                    />
                    <div className="details">
                      <div className="sender">
                        {sender.first_name + " " + sender.last_name}
                        <span className="time">{time}</span>
                      </div>
                      <div className="text">
                        <div
                          dangerouslySetInnerHTML={{ __html: message }}
                        ></div>
                        <div className="message_attachments">
                          {attachments.length > 0 &&
                            attachments.map((item, index) => (
                              <a href={item} target="_blank" key={index}>
                                <img src={item} />
                              </a>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
      <div className="chat-footer">
        <div className="message-box">
          <div className="message-input">
            <ContentEditable
              className="message"
              placeholder="Enter your message..."
              html={content}
              onChange={handleMessageChange}
            />
          </div>
        </div>
        {attachments.length > 0 && (
          <div className="attachments">
            {attachments.map((item, index) => (
              <div className="item" key={"at_" + index}>
                {!item.uploaded ? (
                  <Loader fullHeight={false} />
                ) : (
                  <img src={item.src} />
                )}
              </div>
            ))}
          </div>
        )}
        <div className="message-actions">
          {page == "lounge" && (
            <>
              <FaRegSmile onClick={() => setShowPicker((val) => !val)} />
              {showPicker && (
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
            <button className="btn btn-send" onClick={handleSubmit}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
