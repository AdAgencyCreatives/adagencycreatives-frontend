import Placeholder from "../assets/images/placeholder.png";
import LeftSidebar from "../components/community/LeftSidebar";
import Nathan from "../assets/images/NathanWalker_ProfilePic-150x150.jpg";
import { IoEyeOutline, IoTimeOutline, IoTrashOutline } from "react-icons/io5";
import { IconButton, Tooltip } from "@mui/material";
import "../styles/Notifications.scss";
import { Link } from "react-router-dom";
import { Context as AuthContext } from "../context/AuthContext";

import { getNotifications } from "../context/NotificationsDataContext";
import { useState, useEffect, useContext } from "react";
import TimeAgo from "../components/TimeAgo";
import UtcToLocalDateTime from "../components/UtcToLocalDateTime";

const Notifications = () => {

  const [notifications, setNotifications] = useState([]);

  const {
    state: { role, user, token },
} = useContext(AuthContext);

  const getNotificationsAsync = async (creative) => {
    let result = await getNotifications();
    setNotifications(result);
  };

  useEffect(() => {
        if (user) {
          getNotificationsAsync();
        }
    }, [user]);

  return (
    <div className="dark-container">
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
            <div className="notif-list">
              {notifications && notifications.map((item, index) => {
                return (
                  <div className="notif-item" key={`ag-${index}`}>
                    <div className="user-avatar">
                      <img src={item.user.image || Placeholder} alt="" height={50} width={50} />
                    </div>
                    <div className="notif-details">
                      <div className="username">{item.user.username}</div>
                      <div className="notif-time">
                        <IoTimeOutline />
                        <TimeAgo datetime={item.created_at} />
                        <UtcToLocalDateTime datetime={item.created_at} />
                      </div>
                      <Link to={item.link} className="notif-content text-dark">
                        {item.message}
                      </Link>
                    </div>
                    <div className="notif-actions">
                      <Tooltip title="Mark as Read">
                        <IconButton>
                          <IoEyeOutline />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton>
                          <IoTrashOutline />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
