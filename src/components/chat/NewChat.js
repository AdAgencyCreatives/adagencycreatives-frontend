import { useContext, useEffect, useState } from "react";
import Avatar from "../../assets/images/placeholder.png";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as CreativesContext } from "../../context/CreativesContext";
import Loader from "../Loader";

const NewChat = ({ setContact, contacts, userSelected, setUserSelected }) => {
  const [search, setSearch] = useState();

  const {
    state: { user },
  } = useContext(AuthContext);

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

  const selectUser = (item) => {
    setUserSelected(item);
    setContact({ ...item, uuid: item.user_id });
  };

  useEffect(() => {
    if (!userSelected) {
      setSearch("");
    }
  }, [userSelected]);

  return (
    <div className="new-chat-box">
      <div className="title">
        {userSelected ? (
          <div className="d-flex align-items-center gap-2">
            <div className="user-avatar">
              <img
                src={userSelected.profile_image || Avatar}
                height={40}
                width={40}
              />
            </div>
            <div className="username">{userSelected.name}</div>
          </div>
        ) : (
          "New Message"
        )}
      </div>
      {!userSelected && (
        <>
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
              creatives
                .filter(
                  (creative) =>
                    !contacts.some(
                      (item) => item.contact.uuid === creative.user_id
                    )
                ) // Filter search results from users alreaddy in contact list
                .filter((creative) => creative.user_id != user.uuid) // Filter search results from current user
                .map((item, index) => {
                  return (
                    <div
                      className="item"
                      key={index}
                      onClick={() => selectUser(item)}
                    >
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
                  );
                })
            )}
          </div>
        </>
      )}
      <div className="chat-area"></div>
    </div>
  );
};

export default NewChat;
