import { Link, useParams } from "react-router-dom";
import Header from "../../components/user/Header";
import "../../styles/User.scss";
import LeftSidebar from "../../components/community/LeftSidebar";
import { useContext, useEffect, useState } from "react";
import RestrictedLounge from "../../components/RestrictedLounge";
import { Context as AuthContext } from "../../context/AuthContext";
import {
  getMyFriends,
  getMyFriendShips,
  getFriendRequests,
} from "../../context/FriendsDataContext";

import MyFriendWidget from "../../components/community/MyFriendWidget";
import { CircularProgress } from "@mui/material";
import { useHistoryState } from "../../hooks/useHistoryState";
import SearchBarCommon from "../../components/SearchBarCommon";

const Friends = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [myFriends, setMyFriends] = useState(null);
  const [myFriendShips, setMyFriendShips] = useState(null);
  const [input, setInput] = useHistoryState("input", "");
  const [searchedFriends, setSearchedFriends] = useState([]);
  const [searchApplied, setSearchApplied] = useState(false);

  const {
    state: { role, user, token },
  } = useContext(AuthContext);

  const queryParams = new URLSearchParams(window.location.search);
  const friendshipsParam = queryParams.get("friendships");

  const { username } = useParams();

  const getMyFriendsAsync = async () => {
    let result = await getMyFriends();
    setMyFriends(result);
  };

  const getMyFriendShipsAsync = async (id, status) => {
    let result = await getMyFriendShips(id, status);
    setMyFriendShips(result);
  };

  const getFriendRequestsAsync = async (id) => {
    let result = await getFriendRequests(id);
    setMyFriendShips(result);
  };

  useEffect(() => {
    if (user) {
      if (
        !friendshipsParam ||
        !(
          friendshipsParam == "requests" ||
          friendshipsParam == "pending" ||
          friendshipsParam == "accepted" ||
          friendshipsParam == "declined" ||
          friendshipsParam == "cancelled"
        )
      ) {
        getMyFriendsAsync();
        setInput("");
        setSearchApplied(false);
      } else if (friendshipsParam == "requests") {
        getFriendRequestsAsync(user.uuid);
        setInput("");
        setSearchApplied(false);
      } else {
        getMyFriendShipsAsync(user.uuid, friendshipsParam);
        setInput("");
        setSearchApplied(false);
      }

    }
  }, [user, friendshipsParam]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (user && myFriends) {
      setIsLoading(false);
    }
  }, [user, myFriends]);

  useEffect(() => {
    if (user && myFriendShips) {
      setIsLoading(false);
    }
  }, [user, myFriendShips]);

  const searchFriends = (searchText) => {
    if (searchText?.length > 0) {
      let searchResults = (friendshipsParam?.length > 0 ? myFriendShips : myFriends).filter(item => (item.user.first_name + ' ' + item.user.last_name).toLowerCase().indexOf(searchText.toLowerCase()) >= 0);
      setSearchedFriends(searchResults);
      setSearchApplied(true);
    } else {
      setSearchedFriends([]);
      setSearchApplied(false);
    }
  };

  return (
    <>
      {token && role && (role == "admin" || role == "creative") ? (
        <div className="dark-container mb-0 community-friends">
          <div className="container-fluid px-2 px-md-5">
            <h1 className="community-title text-white text-center mb-4">
              Friends
            </h1>
            <div className="row">
              <div className="col-lg-2 col-md-3 col-sm-6 mb-3">
                <LeftSidebar />
              </div>
              <div className="col-lg-10 col-md-9 col-sm-6">
                <div className="row">
                  <div className="col-12">
                    <Header username={username} />
                  </div>
                </div>
                <div className="row">
                  <SearchBarCommon
                    input={input}
                    setInput={setInput}
                    placeholder={"Search by Name"}
                    onSearch={searchFriends}
                  />
                  {isLoading ? (
                    <div className="center-page">
                      <CircularProgress />
                      <span>Loading ...</span>
                    </div>
                  ) : (<>
                    {!(friendshipsParam?.length > 0) &&
                      (searchApplied ? searchedFriends : (myFriends?.length > 0 ? myFriends : [])).map((my_friend, index) => {
                        return (
                          <MyFriendWidget
                            key={"my-friend-" + my_friend.user.uuid}
                            my_friend={my_friend}
                          />
                        );
                      })}
                    {(!(friendshipsParam?.length > 0) && searchApplied && !(searchedFriends?.length > 0)) && (
                      <div className="no_result">
                        <p>Please try again. No exact results found.</p>
                      </div>
                    )}

                    {friendshipsParam?.length > 0 &&
                      myFriendShips?.length > 0 &&
                      (searchApplied ? searchedFriends : (myFriendShips?.length > 0 ? myFriendShips : [])).map((my_friendship, index) => {
                        return (
                          <MyFriendWidget
                            key={"my-friendship-" + my_friendship.user.uuid}
                            my_friend={my_friendship}
                          />
                        );
                      })}
                    {((friendshipsParam?.length > 0) && searchApplied && !(searchedFriends?.length > 0)) && (
                      <div className="no_result">
                        <p>Please try again. No exact results found.</p>
                      </div>
                    )}
                  </>)}
                </div>

                {/* <div className="row mt-3">
                  <div className="col-12">
                    <p className="user-count">Viewing 1 - 11 of 11 members</p>
                    <div className="user-pagination">
                      <div className="page next">
                        <IoArrowBack />
                      </div>
                      <div className="page current">1</div>
                      <div className="page">2</div>
                      <div className="page next">
                        <IoArrowForward />
                      </div>
                    </div>
                  </div>
                </div> */}

              </div>
            </div>
          </div>
        </div>
      ) : (
        <RestrictedLounge />
      )}
    </>
  );
};

export default Friends;
