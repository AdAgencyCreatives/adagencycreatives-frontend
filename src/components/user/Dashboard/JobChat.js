import { IoClose, IoSearchOutline } from "react-icons/io5";

import "../../../styles/Chat.scss";
import { useEffect, useState, useContext } from "react";
import moment from "moment";
import UserList from "../../chat/UserList";
import ChatBox from "../../chat/ChatBox";
import { Context } from "../../../context/ChatContext";

const JobChat = ({ getMessages, getContacts }) => {
  const {
    state: { contacts }
  } = useContext(Context);
  const [search, setSearch] = useState();
  const [tab, setTab] = useState("all");
  const [chatBox, setChatBox] = useState("list");
  const [userListMobile, setUserListMobile] = useState("");
  const [chatBoxMobile, setChatBoxMobile] = useState("mobile-hide");
  const [contact, setContact] = useState({});
  const [type, setType] = useState("job,private");
  const [contactsList, setContactsList] = useState([]);
  const [checkClick, setCheckClick] = useState(false);
  const [paged, setPaged] = useState(2);
  const [hasMoreData, setHasMoreData] = useState(false);

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
      if (name == "all") return true;
      else if (name == "read")
        return (item.read_at || item.message_type == "sent");
      else return (!item.read_at && item.message_type != "sent");
    });
    setContactsList([...updatedList]);
    setTab(name);
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
    hasMoreData
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
              <UserList data={contactsList} handleItemClick={handleItemClick} />
            </div>
          </div>
        </div>
        <div className="col-md-8 col-12">
          <ChatBox page="job" {...chatBoxProps} />
        </div>
      </div>
    </div>
  );
};

export default JobChat;
