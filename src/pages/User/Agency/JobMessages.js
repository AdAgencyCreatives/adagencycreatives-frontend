import { useContext } from "react";
import JobChat from "../../../components/user/Dashboard/JobChat";
import { Context as ChatContext } from "../../../context/ChatContext";
import { Context as AuthContext } from "../../../context/AuthContext";
import { useEffect } from "react";

const JobMessages = () => {
  const {
    state: { contacts, messages },
    getContacts,
    getMessages,
    sendMessage,
  } = useContext(ChatContext);

  const {
    state: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className="agency-page-myjobs">
      <h3 className="page-title">Messages</h3>
      <JobChat
        contacts={contacts}
        getMessages={getMessages}
        messages={messages}
        user={user}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default JobMessages;
