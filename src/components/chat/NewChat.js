import { useContext, useEffect, useState } from "react";
import Avatar from "../../assets/images/placeholder.png";
import { Context as CreativesContext } from "../../context/CreativesContext";
import Loader from "../Loader";

const NewChat = ({setContact}) => {
  const [search, setSearch] = useState();

  const {
    state: { creatives, loading },
    searchCreatives,
  } = useContext(CreativesContext);

  const handleOnChange = (e) => {
    let value = e.target.value;
    setSearch(value);
    if (value.length >= 3) {
      searchCreatives(value);
    }
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
        {loading ? (
          <Loader fullHeight={false} />
        ) : (
          search &&
          creatives &&
          creatives.map((item, index) => (
            <div className="item" key={index} onClick={() => setContact(item)}>
              <div className="user-avatar">
                <img
                  src={item.profile_image || Avatar}
                  height={40}
                  width={40}
                />
              </div>
              <div className="user-details">
                <div className="username">{item.name} </div>
                <div className="user-meta">{item.title} </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="chat-area"></div>
    </div>
  );
};

export default NewChat;
