import { IoClose, IoSearchOutline } from "react-icons/io5";

import "../../../styles/Chat.scss";
import { useEffect, useState, useContext } from "react";
import moment from "moment";
import UserList from "../../chat/UserList";
import ChatBox from "../../chat/ChatBox";
import { Context } from "../../../context/ChatContext";

const JobChat = ({ messageType, getMessages, getContacts }) => {
  const {
    state: { contacts }
  } = useContext(Context);
  const [search, setSearch] = useState();
  const [tab, setTab] = useState("all");
  const [chatBox, setChatBox] = useState("list");
  const [userListMobile, setUserListMobile] = useState("");
  const [chatBoxMobile, setChatBoxMobile] = useState("mobile-hide");
  const [contact, setContact] = useState({});
  const [type, setType] = useState(messageType);
  const [contactsList, setContactsList] = useState([]);
  const [checkClick, setCheckClick] = useState(false);
  const [paged, setPaged] = useState(2);
  const [hasMoreData, setHasMoreData] = useState(false);
  const [messageData, setMessageData] = useState([]);

  useEffect(() => {
    setContactsList(contacts);
  }, [contacts]);

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
  };

  const refreshContacts = async ()=> {
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
      else return (!item.read_at && item.message_type != "sent");
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
    setPaged,
    paged,
    setHasMoreData,
    hasMoreData,
    messageData,
    setMessageData,
    refreshContacts,
  };

  return (
    <div className="chat-container mb-4 bbb">
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
              <UserList messageType={type} page="job" data={contactsList} handleItemClick={handleItemClick} refreshContacts={refreshContacts} setMessageData={setMessageData} />
            </div>
          </div>
        </div>
        <div className="col-md-8 col-12">
          <ChatBox messageType={type} page="job" {...chatBoxProps} />
        </div>
      </div>
    </div>
  );
};

export default JobChat;
