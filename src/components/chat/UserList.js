import moment from "moment";
import Avatar from "../../assets/images/placeholder.png";

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

  return (
    <ul className="users-list">
      {data.map((item) => (
        <li
          className=""
          onClick={() => handleItemClick(item.contact)}
          key={item.id}
        >
          <img src={item.contact.image || Avatar} height={40} width={40} />
          <div className="user-details">
            <div className="d-flex justify-content-between align-items-center">
              <div className="username">
                {item.contact.first_name} {item.contact.last_name}
              </div>
              <div className={"message-time" + (item.read_at ? "" : " unread")}>
                {parseDateShort(item.created_at)}
              </div>
            </div>
            <div className="user-message">{item.message}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
