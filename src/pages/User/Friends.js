import { Link, useParams } from "react-router-dom";
import Header from "../../components/user/Header";
import "../../styles/User.scss";
import LeftSidebar from "../../components/community/LeftSidebar";
import {
  IoArrowBack,
  IoArrowForward,
  IoLocationOutline,
  IoMailOpen,
  IoPersonAdd,
} from "react-icons/io5";
import Placeholder from "../../assets/images/placeholder.jpeg";
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

const Friends = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [myFriends, setMyFriends] = useState(null);
  const [myFriendShips, setMyFriendShips] = useState(null);

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
      } else if (friendshipsParam == "requests") {
        getFriendRequestsAsync(user.uuid);
      } else {
        getMyFriendShipsAsync(user.uuid, friendshipsParam);
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

  return (
    <>
      {token && role && (role == "admin" || role == "creative") ? (
        <div className="dark-container">
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
                  {isLoading ? (
                    <div className="center-page">
                      <CircularProgress />
                      <span>Loading ...</span>
                    </div>
                  ) : (<>
                    {!(friendshipsParam && friendshipsParam.length) &&
                      myFriends &&
                      myFriends.map((my_friend, index) => {
                        return (
                          <MyFriendWidget
                            key={"my-friend-" + my_friend.user.uuid}
                            my_friend={my_friend}
                          />
                        );
                      })}

                    {friendshipsParam &&
                      friendshipsParam.length &&
                      myFriendShips &&
                      myFriendShips.map((my_friendship, index) => {
                        return (
                          <MyFriendWidget
                            key={"my-friendship-" + my_friendship.user.uuid}
                            my_friend={my_friendship}
                          />
                        );
                      })}
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
