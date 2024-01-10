import Placeholder from "../assets/images/placeholder.png";
import LeftSidebar from "../components/community/LeftSidebar";
import Nathan from "../assets/images/NathanWalker_ProfilePic-150x150.jpg";
import { IoEyeOutline, IoTimeOutline, IoTrashOutline } from "react-icons/io5";
import { IconButton, Tooltip } from "@mui/material";
import "../styles/Notifications.scss";
import { Link } from "react-router-dom";
import { Context as AuthContext } from "../context/AuthContext";
import { getCreativeById } from "../context/CreativesDataContext";

import { useState, useEffect, useContext } from "react";
import TimeAgo from "../components/TimeAgo";
import UtcToLocalDateTime from "../components/UtcToLocalDateTime";
import NotificationWidget from "../components/community/NotificationWidget";
import { CircularProgress } from "@mui/material";
import RestrictedLounge from "../components/RestrictedLounge";
import useNotifications from "../hooks/useNotifications";
import { useScrollLoader } from "../hooks/useScrollLoader";

const Notifications = () => {
  const { notifications, loading, loadMore, updateNotifications } = useNotifications('lounge');
  useScrollLoader(loading, loadMore);

  const [isLoading, setIsLoading] = useState(true);
  const [creative, setCreative] = useState([]);

  const {
    state: { role, user, token, notifications_count },
    getNotificationsCount,
  } = useContext(AuthContext);

  const getCreativeByIdAsync = async (user) => {
    let result = await getCreativeById(user.uuid);
    setCreative(result);
  };

  useEffect(() => {
    if (role && user) {
      getCreativeByIdAsync(user);
    }
  }, [user]);

  useEffect(() => {
    setIsLoading(false);
  }, [notifications]);

  const onDelete = (notification) => {
    let remainingNotifications = notifications.filter((notif)=>notif.uuid != notification.uuid);
    updateNotifications(remainingNotifications);
    getNotificationsCount(user.uuid);
  };

  return (
    <>
      {token && role && (role == "admin" || role == "creative") ? (
        <div className="dark-container mb-0">
          <div className="container-fluid px-2 px-md-5">
            {/* <div className="row">
          <div className="col-12">
            <Header username={username} />
          </div>
        </div> */}
            <div className="row">
              <div className="col-md-2 mb-3">
                <LeftSidebar />
              </div>
              <div className="col-md-10">
                {isLoading ? (
                  <div className="center-page">
                    <CircularProgress />
                    <span>Loading ...</span>
                  </div>
                ) : (
                  <>
                    {notifications && notifications.length ? (
                      <div className="notif-list">
                        {notifications &&
                          notifications.map((notification, index) => {
                            return (
                              <NotificationWidget
                                key={"notification-" + notification.id}
                                notification={notification}
                                creative={creative}
                                onDelete={onDelete}
                              />
                            );
                          })}
                      </div>
                    ) : (
                      <div className="center-page">Sorry, nothing here.</div>
                    )}
                  </>
                )}
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

export default Notifications;
