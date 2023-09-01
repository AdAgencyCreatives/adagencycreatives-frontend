import { useState } from "react";
import Avatar from "../../assets/images/user1.jpg";

const users = [
  {
    avatar: Avatar,
    username: "John Doe",
    postition: "Senior Director Executive",
  },
  {
    avatar: Avatar,
    username: "Ad Agency Creatives",
    postition: "Senior Director Executive",
  },
  {
    avatar: Avatar,
    username: "Amber K.",
    postition: "Senior Director Executive",
  },
  {
    avatar: Avatar,
    username: "Nathan Walker",
    postition: "Senior Director Executive",
  },
];

const NewChat = () => {
  const [search, setSearch] = useState();

  const handleOnChange = (e) => {
    let value = e.target.value;
    setSearch(value);
  };

  return (
    <div className="new-chat-box">
      <div className="title">New Message</div>
      <div className="search-users">
        <input
          className="form-control"
          placeholder="Start typing to search members"
          onChange={handleOnChange}
        />
      </div>
      <div className="users-list">
        {search &&
          users
            .filter((user) => user.username.toLowerCase().includes(search.toLowerCase()))
            .map((item) => (
              <div className="item">
                <div className="user-avatar">
                  <img src={item.avatar} height={40} width={40} />
                </div>
                <div className="user-details">
                  <div className="username">{item.username} </div>
                  <div className="user-meta">{item.postition} </div>
                </div>
              </div>
            ))}
      </div>
      <div className="chat-area"></div>
    </div>
  );
};

export default NewChat;
