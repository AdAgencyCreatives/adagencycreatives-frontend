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
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as ChatContext } from "../../context/ChatContext";

import UserList from "../chat/UserList";
import { getMyFriends } from "../../context/FriendsDataContext";

import { useNavigate, useParams } from "react-router-dom";

const Chat = ({ messageType }) => {

  const { contact_uuid } = useParams();
  const navigate = useNavigate();

  const {
    state: { conversation_updated_notifications },
  } = useContext(AuthContext);


  const {
    state: { contacts },
    getMessages, getContacts,
  } = useContext(ChatContext);

  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("messages");
  const [chatBox, setChatBox] = useState("list");
  const [userListMobile, setUserListMobile] = useState("");
  const [chatBoxMobile, setChatBoxMobile] = useState("mobile-hide");
  const [contactsList, setContactsList] = useState([]);
  const [contact, setContact] = useState({});
  const [type, setType] = useState(messageType);
  const [friends, setFriends] = useState([]);
  const [checkClick, setCheckClick] = useState(false);
  const [userSelected, setUserSelected] = useState(null);
  const [paged, setPaged] = useState(2);
  const [hasMoreData, setHasMoreData] = useState(false);
  const [messageData, setMessageData] = useState([]);

  useEffect(() => {
    getContacts(type);
  }, [type]);

  useEffect(() => {
    if (contact_uuid?.length > 0) {
      if (contactsList?.length > 0) {
        let filtered = contactsList.filter(item => item.contact.uuid == contact_uuid);
        if (filtered?.length > 0) {
          handleItemClick(filtered[0].contact, type);
        } else {
          setChatBox("new");
        }
      } else {
        setChatBox("new");
      }
    }
  }, [contact_uuid, contactsList]);

  useEffect(() => {
    (async () => {
      const data = await getMyFriends();
      setFriends(data.map((item) => item.user.uuid));
    })();
  }, []);

  useEffect(() => {
    setContactsList(contacts);
  }, [contacts]);

  useEffect(() => {
    if (conversation_updated_notifications?.length > 0) {
      (async () => {
        let typeTmp = type;
        let contactTmp = contact;
        refreshContacts();
        getMessages(contactTmp.uuid, typeTmp);
      })();
    }
  }, [conversation_updated_notifications]);

  const handleItemClick = (item, type) => {
    setChatBox("list");
    setUserListMobile("mobile-hide");
    setChatBoxMobile("");
    setCheckClick(true);
    setPaged(2);
    setHasMoreData(false);
    if (item.uuid != contact.uuid) {
      console.log("item.uuid", item.uuid);
      setMessageData([]);
      getMessages(item.uuid, type);
      setContact(item);
      setType(type);
    }
    refreshContacts();

    if (contact_uuid?.length > 0) {
      let url = window.location.pathname.replace("/" + contact_uuid, "");
      navigate(url);
    }

  };

  const refreshContacts = async () => {
    await getContacts(messageType);
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
    refreshContacts,
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
              <UserList messageType={type} page="lounge" data={contactsList} handleItemClick={handleItemClick} refreshContacts={refreshContacts} setMessageData={setMessageData} />
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
