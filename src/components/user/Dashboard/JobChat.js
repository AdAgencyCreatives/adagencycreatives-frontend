import {
  IoAdd,
  IoClose,
  IoFileTrayOutline,
  IoPeopleOutline,
  IoSearchOutline,
  IoSend,
  IoArrowBack,
} from "react-icons/io5";
import Loader from "../../Loader";
import { FaPaperclip, FaRegEdit, FaRegSmile } from "react-icons/fa";
import EmojiPicker, { Emoji } from "emoji-picker-react";

import { HiOutlineUserGroup } from "react-icons/hi2";
import Avatar from "../../../assets/images/placeholder.png";
import "../../../styles/Chat.scss";
import { useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import moment from "moment";
import { CircularProgress } from "@mui/material";

const JobChat = ({
  contacts,
  messages,
  getMessages,
  user,
  sendMessage,
  loading,
}) => {
  const [search, setSearch] = useState();
  const [tab, setTab] = useState("all");
  const [chatBox, setChatBox] = useState("list");
  const [content, setContent] = useState("");
  const [userListMobile, setUserListMobile] = useState("");
  const [chatBoxMobile, setChatBoxMobile] = useState("mobile-hide");
  const [contact, setContact] = useState({});
  const [messageData, setMessageData] = useState([]);
  const [contactsList, setContactsList] = useState([]);
  const containerRef = useRef();

  useEffect(() => {
    setMessageData(messages);
  }, [messages]);

  useEffect(() => {
    setContactsList(contacts);
  }, [contacts]);

  const scrollToBottom = () => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageData]);

  const handleItemClick = (item) => {
    setChatBox("list");
    setUserListMobile("mobile-hide");
    setChatBoxMobile("");
    if (item.uuid != contact.uuid) {
      getMessages(item.uuid);
      setContact(item);
    }
  };

  const handleBackButton = () => {
    setUserListMobile("");
    setChatBoxMobile("mobile-hide");
  };

  const handleMessageChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    setContent("");
    setMessageData((prev) => [
      ...prev,
      {
        created_at: Date.now(),
        message: content,
        message_type: "sent",
      },
    ]);
    sendMessage(user.uuid, contact.uuid, content);
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

  const switchTab = (name) => {
    let updatedList = contacts.filter((item) => {
      if (name == "all") return true;
      else if (name == "read") return item.read_at;
      else return true;
    });
    setContactsList([...updatedList]);
    setTab(name);
  };

  return (
    <div className="chat-container">
      <div className="row g-0">
        <div className="col-md-4 col-12">
          <div className={`users-box ${userListMobile}`}>
            <div className="box-header">
              <div className="header-top d-flex justify-space-between">
                <div className="box-title">Messaging</div>
              </div>
              <div className="message-search-box">
                <IoSearchOutline />
                <input
                  className="message-search-input"
                  value={search}
                  placeholder="Search Contacts..."
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && <IoClose className="clear-message" />}
              </div>
              <div className="message-tabs">
                <div
                  className={"tab" + (tab == "all" ? " active" : "")}
                  onClick={() => switchTab("all")}
                >
                  All
                </div>
                <div
                  className={"tab" + (tab == "read" ? " active" : "")}
                  onClick={() => switchTab("read")}
                >
                  Read
                </div>
                <div
                  className={"tab" + (tab == "unread" ? " active" : "")}
                  onClick={() => switchTab("unread")}
                >
                  Unread
                </div>
              </div>
            </div>
            <div className="box-content">
              <ul className="users-list">
                {contactsList.map((item) => (
                  <li
                    className=""
                    onClick={() => handleItemClick(item.contact)}
                    key={item.id}
                  >
                    <img
                      src={item.contact.image || Avatar}
                      height={40}
                      width={40}
                    />
                    <div className="user-details">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="username">
                          {item.contact.first_name} {item.contact.last_name}
                        </div>
                        <div
                          className={
                            "message-time" + (item.read_at ? "" : " unread")
                          }
                        >
                          {parseDateShort(item.created_at)}
                        </div>
                      </div>
                      <div className="user-message">{item.message}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-8 col-12">
          <div className={`chat-box ${chatBoxMobile}`}>
            <div className="chat-mobile-top d-md-none d-flex">
              <IoArrowBack size={20} onClick={handleBackButton} />
              <div className="name">John Doe</div>
            </div>
            <div className="chat-top">
              <div ref={containerRef} className="chat-area">
                {loading ? (
                  <Loader fullHeight={false} />
                ) : (
                  messageData.map((item, index) => {
                    const sender = item.message_type == "sent" ? user : contact;
                    const time = parseDate(item.created_at);
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
                              dangerouslySetInnerHTML={{ __html: item.message }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
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
              <div className="message-actions">
                <div className="send-message">
                  <button className="btn btn-send" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobChat;
