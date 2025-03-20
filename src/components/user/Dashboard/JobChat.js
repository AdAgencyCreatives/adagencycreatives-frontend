import { IoClose, IoSearchOutline } from "react-icons/io5";

import "../../../styles/Chat.scss";
import { useEffect, useState, useContext } from "react";
import moment from "moment";
import UserList from "../../chat/UserList";
import ChatBox from "../../chat/ChatBox";
import { Context as AuthContext } from "../../../context/AuthContext";
import { Context as ChatContext } from "../../../context/ChatContext";
import { CircularProgress, FormControlLabel, FormGroup, Switch } from "@mui/material";

const JobChat = ({ messageType }) => {
  const anchor = window.location.hash.slice(1);

  const {
    state: { user, conversation_updated_notifications, formSubmit },
    updateEmailNotifications,
  } = useContext(AuthContext);

  const {
    state: { contacts, contacts_loading },
    getMessages, getContacts,
  } = useContext(ChatContext);

  const [search, setSearch] = useState();
  const [tab, setTab] = useState("all");
  const [chatBox, setChatBox] = useState("list");
  const [userListMobile, setUserListMobile] = useState("");
  const [chatBoxMobile, setChatBoxMobile] = useState("mobile-hide");
  const [contact, setContact] = useState({});
  const [type, setType] = useState(messageType);
  const [contactsList, setContactsList] = useState([]);
  const [checkClick, setCheckClick] = useState(false);
  const [userSelected, setUserSelected] = useState(null);
  const [paged, setPaged] = useState(2);
  const [hasMoreData, setHasMoreData] = useState(false);
  const [messageData, setMessageData] = useState([]);
  const [userListLoading, setUserListLoading] = useState(true);

  useEffect(() => {
    setContactsList(contacts);
    switchTab(tab == "unread" ? "read" : tab);
  }, [contacts]);

  useEffect(() => {
    if (anchor?.length > 0 && contacts.length > 0) {
      let params = new URLSearchParams(window.location.hash.replace("#", ""));
      let messages = params.get("messages")?.length > 0 ? params.get("messages") : "";
      // console.log(messages);
      let filtered = contacts.filter(item => item.contact.uuid == messages);
      //console.log(contacts);
      if (filtered?.length > 0) {
        handleItemClick(filtered[0].contact, type);
      } else {
        setChatBox("new");
      }
    } else {
      setChatBox("new");
    }
  }, [anchor, contacts]);

  useEffect(() => {
    setUserListLoading(contacts_loading);
  }, [contacts_loading]);

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
    // console.log(type);
    // console.log(item);
    setChatBox("list");
    setUserListMobile("mobile-hide");
    setChatBoxMobile("");
    setCheckClick(true);
    setPaged(2);
    setHasMoreData(false);
    if (item.uuid != contact.uuid) {
      // console.log("item.uuid", item.uuid);
      setMessageData([]);
      getMessages(item.uuid, type);
      setContact(item);
      setType(type);
    }
    //refreshContacts();
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
      if (name == "all") return true;
      else if (name == "read")
        return (item.read_at || item.message_type == "sent");
      else return (!(item.read_at || item.message_type == "sent"));
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

  const toggleJobNotificationsEnabled = async (_user) => {
    let data = { email_notifications_enabled: !_user.email_notifications_enabled };
    await updateEmailNotifications(_user.uuid, data, async () => {
      //success
    }, () => {
      // failure
    });
  };

  return (
    <div className="chat-container mb-4 bbb">
      <div className="row g-0">
        <div className="col-md-4 col-12">
          <div className={`users-box ${userListMobile}`}>
            <div className="box-header">
              <div className="header-top d-flex justify-space-between">
                <div className="box-title">Messaging</div>
                {user && (
                  <div className="box-title">
                    <FormGroup>
                      <FormControlLabel
                        control={formSubmit ? <CircularProgress size={25} style={{ marginRight: '10px', marginBottom: '13px' }} /> : <Switch />}
                        label={"Email Notifications"}
                        checked={user?.email_notifications_enabled == "1" ? true : false}
                        onChange={(e) => toggleJobNotificationsEnabled(user)}
                      />
                    </FormGroup>
                  </div>
                )}
              </div>
              <div className="message-search-box">
                <IoSearchOutline />
                <input
                  className="message-search-input"
                  value={search}
                  placeholder="Search Contacts..."
                  onChange={(e) => filterContacts(e.target.value)}
                />
                {search && <IoClose className="clear-message" onClick={() => filterContacts("")} />}
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
              <UserList
                messageType={type}
                page="job"
                data={contactsList}
                handleItemClick={handleItemClick}
                refreshContacts={refreshContacts}
                setMessageData={setMessageData}
                userListLoading={userListLoading}
                setUserListLoading={setUserListLoading}
              />
            </div>
          </div>
        </div>
        <div className="col-md-8 col-12">
          <ChatBox
            messageType={type}
            page="job"
            userListLoading={userListLoading}
            {...chatBoxProps}
          />
        </div>
      </div>
    </div>
  );
};

export default JobChat;
