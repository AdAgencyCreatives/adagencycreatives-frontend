import { useContext, useEffect, useState } from "react";
import Chat from "../components/community/Chat";
import LeftSidebar from "../components/community/LeftSidebar";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as ChatContext } from "../context/ChatContext";
import Loader from "../components/Loader";
import RestrictedLounge from "../components/RestrictedLounge";

const Messages = () => {

  const [messageType, setMessageType] = useState("private");

  const {
    state: { role, user, token },
  } = useContext(AuthContext);

  const { getContacts, } = useContext(ChatContext);

  useEffect(() => {
    getContacts(messageType);
  }, []);

  return (
    <>
      {token && role && (role == "admin" || role == "creative") ? (
        <div className="dark-container page-messages mb-0">
          <h1 className="community-title">Messages</h1>
          <div className="container-fluid mt-4 px-2 px-md-5">
            <div className="row gy-3">
              <div className="col-lg-2">
                <LeftSidebar />
              </div>
              <div className="col-lg-10">{token ? <Chat messageType={messageType} /> : <Loader />}</div>
            </div>
          </div>
        </div>
      ) : (
        <RestrictedLounge />
      )}
    </>
  );
};

export default Messages;
