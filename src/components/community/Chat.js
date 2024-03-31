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

const Chat = ({ messageType }) => {
  const {
    state: { contacts },
    getMessages, getContacts,
  } = useContext(Context);

  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("messages");
  const [chatBox, setChatBox] = useState("list");
  const [userListMobile, setUserListMobile] = useState("");
  const [chatBoxMobile, setChatBoxMobile] = useState("mobile-hide");
  const [contactsList, setContactsList] = useState([]);
  const [contact, setContact] = useState({});
  const [type, setType] = useState(messageType);
  const [friends, setFriends] = useState([]);

  const [userSelected, setUserSelected] = useState(null);
  const [paged, setPaged] = useState(2);
  const [hasMoreData, setHasMoreData] = useState(false);

  useEffect(() => {
    getContacts(type);
  }, [type]);

  useEffect(() => {
    (async () => {
      const data = await getMyFriends();
      setFriends(data.map((item) => item.user.uuid));
    })();
  }, []);

  useEffect(() => {
    setContactsList(contacts);
  }, [contacts]);

  const handleItemClick = (item, type) => {
    setChatBox("list");
    setUserListMobile("mobile-hide");
    setChatBoxMobile("");
    if (item.uuid != contact.uuid) {
      getMessages(item.uuid, type);
      setContact(item);
      setType(type);
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
        return friends.includes(item.contact.uuid);
      } else return item.type == name;
    });
    setContactsList([...updatedList]);
    setTab(name);
  };

  const filterContacts = (value) => {
    setSearch(value);
    let updatedList = contacts.filter((item) => {
      let name = value.toLowerCase();
      let contact = item.contact;
      let fname = contact.first_name.toLowerCase();
      let lname = contact.last_name.toLowerCase();
      return fname.includes(name) || lname.includes(name);
    });
    setContactsList([...updatedList])
  };

  const [messageData, setMessageData] = useState([]);

  const chatBoxProps = {
    contact,
    type,
    chatBox,
    chatBoxMobile,
    setChatBox,
    handleBackButton,
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
                  <FaRegEdit onClick={() => {
                    setChatBox("new");
                    setUserListMobile("mobile-hide");
                    setChatBoxMobile("");
                    setUserSelected(null);
                  }} />
                </div>
              </div>
              <div className="message-search-box">
                <IoSearchOutline />
                <input
                  className="message-search-input"
                  value={search}
                  placeholder="Search messages..."
                  onChange={(e) => filterContacts(e.target.value)}
                />
                {search && <IoClose className="clear-message" onClick={() => filterContacts("")} />}
              </div>
              <div className="message-tabs">
                <div
                  className={"tab" + (tab == "messages" ? " active" : "")}
                  onClick={() => switchTab("messages")}
                >
                  <IoFileTrayOutline /> Messages
                </div>
                {/* <div
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
                </div> */}
              </div>
            </div>
            <div className="box-content">
              <UserList messageType={type} page="lounge" data={contactsList} handleItemClick={handleItemClick} />
            </div>
          </div>
        </div>
        <div className="col-md-8 col-12">
          <ChatBox messageType={type} page="lounge" {...chatBoxProps} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
