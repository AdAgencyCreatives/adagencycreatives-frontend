import { useContext, useState } from "react";
import JobChat from "../../components/user/Dashboard/JobChat";
import { Context as ChatContext } from "../../context/ChatContext";
import { useEffect } from "react";

const JobMessages = () => {

  const [messageType, setMessageType] = useState("job,private");

  const { getContacts, } = useContext(ChatContext);

  useEffect(() => {
    getContacts(messageType);
  }, []);

  return (
    <div className="agency-page-myjobs">
      <h3 className="page-title">Messages</h3>
      <JobChat messageType={messageType} />
    </div>
  );
};

export default JobMessages;
