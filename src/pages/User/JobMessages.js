import { useContext } from "react";
import JobChat from "../../components/user/Dashboard/JobChat";
import { Context as ChatContext } from "../../context/ChatContext";
import { useEffect } from "react";

const JobMessages = () => {
  const { getContacts, getMessages } = useContext(ChatContext);

  useEffect(() => {
    getContacts("job");
  }, []);

  return (
    <div className="agency-page-myjobs">
      <h3 className="page-title">Messages</h3>
      <JobChat getMessages={getMessages} />
    </div>
  );
};

export default JobMessages;
