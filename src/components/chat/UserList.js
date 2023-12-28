import moment from "moment";
import Avatar from "../../assets/images/placeholder.png";
import { useContext } from "react";
import { Context } from "../../context/ChatContext";

const UserList = ({ data, handleItemClick }) => {
  const parseDateShort = (dateString) => {
    const parsedDate = moment(dateString);

    const currentDate = moment();

    let result = "";

    if (currentDate.isSame(parsedDate, "day")) {
      result = `${parsedDate.format("h:mm a")}`;
    } else if (currentDate.isSame(parsedDate, "week")) {
      result = `${parsedDate.format("dddd")}`;
    } else {
      result = `${parsedDate.format("M/D/YYYY")}`;
    }
    return result;
  };
  const { state: { activeContact } } = useContext(Context)
  function sanitizeText(text) {
    // Remove links with <br/>
    const sanitizedText = text.replace(/<br\/>.*?s3\.amazonaws\.com.*?(\s|$)/g, ' ');

    // Remove any extra whitespace
    return sanitizedText;
  }

  const getShortMessage = (messageText) => {
    let newMessage = messageText;
    while (newMessage.indexOf("<br>") >= 0 || newMessage.indexOf("<br/>") >= 0 || newMessage.indexOf("<br />") >= 0) {
      newMessage = newMessage.replace("<br>", "\n");
      newMessage = newMessage.replace("<br/>", "\n");
      newMessage = newMessage.replace("<br />", "\n");
    }

    while (newMessage.indexOf("<div>") >= 0 || newMessage.indexOf("</div>") >= 0) {
      newMessage = newMessage.replace("<div>", "\n");
      newMessage = newMessage.replace("</div>", "\n");
    }

    while (newMessage.indexOf("<p>") >= 0 || newMessage.indexOf("</p>") >= 0) {
      newMessage = newMessage.replace("<p>", "\n");
      newMessage = newMessage.replace("</p>", "\n");
    }

    while (newMessage.indexOf("\n\n") >= 0) {
      newMessage = newMessage.replace("\n\n", "\n");
    }

    let lines = newMessage.indexOf("\n") >= 0 ? newMessage.split('\n') : [newMessage];
    let shortMessage = (lines.length > 3 ? lines.slice(0, 3) : lines).join("<br />");

    return shortMessage;
  };

  return (
    <ul className="users-list">
      {data.map((item) => (
        <li data-id={item.contact.uuid}
          className={(item.contact.uuid == activeContact) ? "active" : ""}
          onClick={() => handleItemClick(item.contact, 'job,private')}
          key={item.id}
        >
          <img src={item.contact.image || Avatar} height={40} width={40} alt="" />
          <div className="user-details">
            <div className="d-flex justify-content-between align-items-center">
              <div className="username">
                {item.contact.first_name} {item.contact.last_name}
              </div>
              <div className={"message-time" + ((item.read_at || item.message_type == "sent") ? "" : " unread")}>
                {parseDateShort(item.created_at)}
              </div>
            </div>
            <div className="user-message" dangerouslySetInnerHTML={{ __html: getShortMessage(sanitizeText(item.message)) }}></div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
