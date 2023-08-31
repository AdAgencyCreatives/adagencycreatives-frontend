import {
  IoAdd,
  IoClose,
  IoFileTrayOutline,
  IoPeopleOutline,
  IoSearchOutline,
  IoSend,
} from "react-icons/io5";
import { HiOutlineUserGroup } from "react-icons/hi2";
import Avatar from "../assets/images/user1.jpg";
import "../styles/Chat.scss";
import { useState } from "react";

const Chat = () => {
  const tabs = {
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
  };
  const [search, setSearch] = useState();
  const [tab, setTab] = useState("messages");

  return (
    <div className="chat-container">
      <div className="row g-0">
        <div className="col-md-4 col-12">
          <div className="users-box">
            <div className="box-header">
              {/* <div className="box-title">Direct Messages</div>
              <div className="new-chat">
                <IoAdd />
              </div> */}
              <div className="message-search-box">
                <IoSearchOutline />
                <input
                  className="message-search-input"
                  value={search}
                  placeholder="Search messages..."
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && <IoClose className="clear-message" />}
              </div>
              <div className="message-tabs">
                <div
                  className={"tab" + ((tab == "messages") ? " active": "")}
                  onClick={() => setTab("messages")}
                >
                  <IoFileTrayOutline /> Messages
                </div>
                <div
                  className={"tab" + ((tab == "friends") ? " active": "")}
                  onClick={() => setTab("friends")}
                >
                  <IoPeopleOutline /> Friends
                </div>
                <div
                  className={"tab" + ((tab == "groups") ? " active": "")}
                  onClick={() => setTab("groups")}
                >
                  <HiOutlineUserGroup /> Groups
                </div>
              </div>
            </div>
            <div className="box-content">
              <ul className="users-list">
                {tabs[tab].map((item) => (
                  <li className="">
                    <img src={Avatar} height={40} width={40} />
                    <div className="user-details">
                      <div className="username">{item.username}</div>
                      <div className="user-message">{item.message}</div>
                    </div>
                    <div className="message-time unread">{item.time}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-8 col-12">
          <div className="chat-box">
            <div className="chat-area">
              <div className="chat-item">
                <img
                  src={Avatar}
                  height={35}
                  width={35}
                  className="chat-avatar"
                />
                <div className="details">
                  <div className="sender">
                    John Doe<span className="time">1:40pm</span>
                  </div>
                  <div className="text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </div>
                </div>
              </div>
              <div className="chat-item">
                <img
                  src={Avatar}
                  height={35}
                  width={35}
                  className="chat-avatar"
                />
                <div className="details">
                  <div className="sender">
                    John Doe<span className="time">1:40pm</span>
                  </div>
                  <div className="text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </div>
                </div>
              </div>
            </div>
            <div className="chat-footer">
              <div className="message-input">
                <input
                  className="message form-control"
                  placeholder="Enter your message"
                />
              </div>
              <button className="btn send-message">
                <IoSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
