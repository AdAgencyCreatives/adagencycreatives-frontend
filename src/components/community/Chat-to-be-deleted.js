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
import Avatar from "../../assets/images/user1.jpg";
import "../../styles/Chat.scss";
import { useState } from "react";
import ContentEditable from "react-contenteditable";
import NewChat from "../chat/NewChat";

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
  };
  const [search, setSearch] = useState();
  const [tab, setTab] = useState("messages");
  const [chatBox, setChatBox] = useState("list");
  const [showPicker, setShowPicker] = useState(false);
  const [content, setContent] = useState("");
  const [userListMobile, setUserListMobile] = useState("");
  const [chatBoxMobile, setChatBoxMobile] = useState("mobile-hide");

  const selectEmoji = (emojiData) => {
    setContent((prev) => (prev += emojiData.emoji));
    setShowPicker(false);
  };

  const handleItemClick = () => {
    setChatBox("list");
    setUserListMobile("mobile-hide");
    setChatBoxMobile("");
  };

  const handleBackButton = () => {
    setUserListMobile("");
    setChatBoxMobile("mobile-hide");
  };

  return (
    <div className="chat-container">
      <div className="row g-0">
        <div className="col-md-4 col-12">
          <div className={`users-box ${userListMobile}`}>
            <div className="box-header">
              <div className="header-top d-flex justify-space-between">
                <div className="box-title">Messaging</div>
                <div className="new-chat">
                  <FaRegEdit onClick={() => setChatBox("new")} />
                </div>
              </div>
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
                  className={"tab" + (tab == "messages" ? " active" : "")}
                  onClick={() => setTab("messages")}
                >
                  <IoFileTrayOutline /> Messages
                </div>
                <div
                  className={"tab" + (tab == "friends" ? " active" : "")}
                  onClick={() => setTab("friends")}
                >
                  <IoPeopleOutline /> Friends
                </div>
                <div
                  className={"tab" + (tab == "groups" ? " active" : "")}
                  onClick={() => setTab("groups")}
                >
                  <HiOutlineUserGroup /> Groups
                </div>
              </div>
            </div>
            <div className="box-content">
              <ul className="users-list">
                {tabs[tab].map((item) => (
                  <li className="" onClick={handleItemClick}>
                    <img src={Avatar} height={40} width={40} />
                    <div className="user-details">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="username">{item.username}</div>{" "}
                        <div className="message-time unread">{item.time}</div>
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
              {chatBox == "new" ? (
                <NewChat />
              ) : (
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </div>
                    </div>
                  </div>
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
                  />
                </div>
              </div>
              <div className="message-actions">
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
                <FaPaperclip />
                <div className="send-message">
                  <button className="btn btn-send">Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
