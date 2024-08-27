import { useContext, useEffect, useState } from "react";
import Avatar from "../../assets/images/placeholder.png";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as CreativesContext } from "../../context/CreativesContext";
import Loader from "../Loader";
import { useLocation, useParams } from "react-router-dom";

const NewChat = ({ setContact, contacts, userSelected, setUserSelected }) => {

  const { contact_uuid } = useParams();

  const [search, setSearch] = useState();

  const {
    state: { user },
  } = useContext(AuthContext);

  const {
    state: { creatives, loading },
    searchCreatives, getCreativeById
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
    if (contact_uuid?.length > 0) {
      (async () => {
        await getCreativeById(contact_uuid, (data) => {
          selectUser(data);
        });
      })();
    }
  }, [contact_uuid]);

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
                src={userSelected?.user_thumbnail || userSelected.profile_image || Avatar}
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
              creatives?.length > 0 &&
              creatives
                .map((item, index) => {
                  return (
                    <div
                      className="item"
                      key={index}
                      onClick={() => selectUser(item)}
                    >
                      <div className="user-avatar">
                        <img
                          src={item?.user_thumbnail || item.profile_image || Avatar}
                          height={40}
                          width={40}
                        />
                      </div>
                      <div className="user-details">
                        <div className="username">{item.name} </div>
                        <div className="user-meta">{item.category} </div>
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
