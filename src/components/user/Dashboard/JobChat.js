import {
  IoAdd,
  IoClose,
  IoFileTrayOutline,
  IoPeopleOutline,
  IoSearchOutline,
  IoSend,
  IoArrowBack,
} from "react-icons/io5";
import { FaPaperclip, FaRegEdit, FaRegSmile } from "react-icons/fa";
import EmojiPicker, { Emoji } from "emoji-picker-react";

import { HiOutlineUserGroup } from "react-icons/hi2";
import Avatar from "../../../assets/images/user1.jpg";
import "../../../styles/Chat.scss";
import { useState } from "react";
import ContentEditable from "react-contenteditable";
import moment from "moment";

const JobChat = ({ contacts, messages, getMessages, user, sendMessage }) => {
  /*  const tabs = {
    messages: [
      {
        avatar: Avatar,
        username: "John Doe",
        time: "1:40PM",
        message: "Lorem ipsum dolor sit amet, consectetur",
      },
      {
        avatar: Avatar,
        username: "John Doe",
        time: "3:10PM",
        message: "Lorem ipsum dolor sit amet, consectetur",
      },
      {
        avatar: Avatar,
        username: "John Doe",
        time: "4:20PM",
        message: "Lorem ipsum dolor sit amet, consectetur",
      },
      {
        avatar: Avatar,
        username: "John Doe",
        time: "4:20PM",
        message: "Lorem ipsum dolor sit amet, consectetur",
      },
      {
        avatar: Avatar,
        username: "John Doe",
        time: "4:20PM",
        message: "Lorem ipsum dolor sit amet, consectetur",
      },
      {
        avatar: Avatar,
        username: "John Doe",
        time: "4:20PM",
        message: "Lorem ipsum dolor sit amet, consectetur",
      },
    ],
    groups: [
      {
        avatar: Avatar,
        username: "Creative Directors",
        time: "1:40PM",
        message: "Lorem ipsum dolor sit amet, consectetur",
      },
      {
        avatar: Avatar,
        username: "Agencies",
        time: "3:10PM",
        message: "Lorem ipsum dolor sit amet, consectetur",
      },
    ],
    friends: [
      {
        avatar: Avatar,
        username: "Ad Agency Creatives",
        time: "1:40PM",
        message: "Lorem ipsum dolor sit amet, consectetur",
      },
    ],
  }; */
  const [search, setSearch] = useState();
  const [tab, setTab] = useState("messages");
  const [chatBox, setChatBox] = useState("list");
  const [content, setContent] = useState("");
  const [userListMobile, setUserListMobile] = useState("");
  const [chatBoxMobile, setChatBoxMobile] = useState("mobile-hide");
  const [contact, setContact] = useState({});

  const handleItemClick = (item) => {
    setChatBox("list");
    setUserListMobile("mobile-hide");
    setChatBoxMobile("");
    getMessages(item.uuid);
    setContact(item);
  };

  const handleBackButton = () => {
    setUserListMobile("");
    setChatBoxMobile("mobile-hide");
  };

  const handleMessageChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
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
                  className={"tab" + (tab == "messages" ? " active" : "")}
                  onClick={() => setTab("messages")}
                >
                  All
                </div>
                <div
                  className={"tab" + (tab == "read" ? " active" : "")}
                  onClick={() => setTab("read")}
                >
                  Read
                </div>
                <div
                  className={"tab" + (tab == "unread" ? " active" : "")}
                  onClick={() => setTab("unread")}
                >
                  Unread
                </div>
              </div>
            </div>
            <div className="box-content">
              <ul className="users-list">
                {contacts.map((item) => (
                  <li className="" onClick={() => handleItemClick(item)} key={item.id}>
                    <img src={Avatar} height={40} width={40} />
                    <div className="user-details">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="username">
                          {item.first_name} {item.last_name}
                        </div>
                        <div className="message-time unread">1:40PM</div>
                      </div>
                      <div className="user-message">
                        Lorem ipsum dolor sit amet, consectetur
                      </div>
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
              <div className="chat-area">
                {messages.map((item) => {
                  const sender = item.message_type == "sent" ? user : contact;
                  const time = parseDate(item.created_at);
                  return (
                    <div className="chat-item" key={item.id}>
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
                        <div className="text">{item.message}</div>
                      </div>
                    </div>
                  );
                })}
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
