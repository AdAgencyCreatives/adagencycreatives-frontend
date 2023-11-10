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

  const {state:{activeContact}} = useContext(Context)
  function sanitizeText(text) {
    // Remove links with <br/>
    const sanitizedText = text.replace(/<br\/>.*?s3\.amazonaws\.com.*?(\s|$)/g, ' ');
  
    // Remove any extra whitespace
    return sanitizedText;
  }
  
  return (
    <ul className="users-list">
      {data.map((item) => (
        <li
          className={(item.contact.uuid == activeContact) ? "active" : ""}
          onClick={() => handleItemClick(item.contact)}
          key={item.id}
        >
          <img src={item.contact.image || Avatar} height={40} width={40} />
          <div className="user-details">
            <div className="d-flex justify-content-between align-items-center">
              <div className="username">
                {item.contact.first_name} {item.contact.last_name}
              </div>
              <div className={"message-time" + ((item.read_at || item.message_type == "sent") ? "" : " unread")}>
                {parseDateShort(item.created_at)}
              </div>
            </div>
            <div className="user-message">{sanitizeText(item.message)}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
