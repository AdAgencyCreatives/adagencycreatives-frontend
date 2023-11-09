import {
  IoClose,
  IoFileTrayOutline,
  IoPeopleOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";

import { HiOutlineUserGroup } from "react-icons/hi2";
import "../../styles/Chat.scss";
import { useState, useEffect, useContext } from "react";
import ChatBox from "../chat/ChatBox";
import { Context } from "../../context/ChatContext";
import UserList from "../chat/UserList";
import { getMyFriends } from "../../context/FriendsDataContext";

const Chat = () => {
  const {
    state: { contacts },
    getMessages,
    getContacts,
  } = useContext(Context);

  const [search, setSearch] = useState();
  const [tab, setTab] = useState("messages");
  const [chatBox, setChatBox] = useState("list");
  const [userListMobile, setUserListMobile] = useState("");
  const [chatBoxMobile, setChatBoxMobile] = useState("mobile-hide");
  const [contactsList, setContactsList] = useState([]);
  const [contact, setContact] = useState({});
  const [friends, setFriends] = useState([]);

  console.log(friends)
  useEffect(() => {
    getContacts("private");
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getMyFriends();
      setFriends(data.map((item) =>  item.user.uuid ));
    })();
  }, []);

  useEffect(() => {
    setContactsList(contacts);
  }, [contacts]);

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

  const switchTab = (name) => {
    let updatedList = contacts.filter((item) => {
      if (name == "messages") return true;
      else if (name == "friends") {
        return friends.includes(item.contact.uuid)
      } else return item.type == name;
    });
    setContactsList([...updatedList]);
    setTab(name);
  };

  const chatBoxProps = {
    contact,
    chatBox,
    chatBoxMobile,
    handleBackButton,
    setContact
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
                  onClick={() => switchTab("messages")}
                >
                  <IoFileTrayOutline /> Messages
                </div>
                <div
                  className={"tab" + (tab == "friends" ? " active" : "")}
                  onClick={() => switchTab("friends")}
                >
                  <IoPeopleOutline /> Friends
                </div>
                <div
                  className={"tab" + (tab == "groups" ? " active" : "")}
                  onClick={() => switchTab("groups")}
                >
                  <HiOutlineUserGroup /> Groups
                </div>
              </div>
            </div>
            <div className="box-content">
              <UserList data={contactsList} handleItemClick={handleItemClick} />
            </div>
          </div>
        </div>
        <div className="col-md-8 col-12">
          <ChatBox page="lounge" {...chatBoxProps} />
        </div>
      </div>
    </div>
  );
};

export default Chat;

import {
  IoClose,
  IoFileTrayOutline,
  IoPeopleOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";

import { HiOutlineUserGroup } from "react-icons/hi2";
import "../../styles/Chat.scss";
import { useState, useEffect, useContext } from "react";
import ChatBox from "../chat/ChatBox";
import { Context } from "../../context/ChatContext";
import UserList from "../chat/UserList";
import { getMyFriends } from "../../context/FriendsDataContext";

const Chat = () => {
  const {
    state: { contacts },
    getMessages,
    getContacts,
  } = useContext(Context);

  const [search, setSearch] = useState();
  const [tab, setTab] = useState("messages");
  const [chatBox, setChatBox] = useState("list");
  const [userListMobile, setUserListMobile] = useState("");
  const [chatBoxMobile, setChatBoxMobile] = useState("mobile-hide");
  const [contactsList, setContactsList] = useState([]);
  const [contact, setContact] = useState({});
  const [friends, setFriends] = useState([]);

  console.log(friends)
  useEffect(() => {
    getContacts("private");
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getMyFriends();
      setFriends(data.map((item) =>  item.user.uuid ));
    })();
  }, []);

  useEffect(() => {
    setContactsList(contacts);
  }, [contacts]);

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

  const switchTab = (name) => {
    let updatedList = contacts.filter((item) => {
      if (name == "messages") return true;
      else if (name == "friends") {
        return friends.includes(item.contact.uuid)
      } else return item.type == name;
    });
    setContactsList([...updatedList]);
    setTab(name);
  };

  const chatBoxProps = {
    contact,
    chatBox,
    chatBoxMobile,
    handleBackButton,
    setContact
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
                  onClick={() => switchTab("messages")}
                >
                  <IoFileTrayOutline /> Messages
                </div>
                <div
                  className={"tab" + (tab == "friends" ? " active" : "")}
                  onClick={() => switchTab("friends")}
                >
                  <IoPeopleOutline /> Friends
                </div>
                <div
                  className={"tab" + (tab == "groups" ? " active" : "")}
                  onClick={() => switchTab("groups")}
                >
                  <HiOutlineUserGroup /> Groups
                </div>
              </div>
            </div>
            <div className="box-content">
              <UserList data={contactsList} handleItemClick={handleItemClick} />
            </div>
          </div>
        </div>
        <div className="col-md-8 col-12">
          <ChatBox page="lounge" {...chatBoxProps} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
