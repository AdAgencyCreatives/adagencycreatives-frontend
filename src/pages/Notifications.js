import LeftSidebar from "../components/community/LeftSidebar";
import Nathan from "../assets/images/NathanWalker_ProfilePic-150x150.jpg";
import { IoEyeOutline, IoTimeOutline, IoTrashOutline } from "react-icons/io5";
import { IconButton, Tooltip } from "@mui/material";
import "../styles/Notifications.scss";
import { Link } from "react-router-dom";

const notifications = [
  {
    avatar: Nathan,
    username: "Ad Agency Creatives",
    time: "6 hours ago",
    content: "Ad Agency Creatives sent you a new private message",
  },
  {
    avatar: Nathan,
    username: "Ad Agency Creatives",
    time: "6 hours ago",
    content: "Ad Agency Creatives sent you a new private message",
    link: "#",
  },
  {
    avatar: Nathan,
    username: "Ad Agency Creatives",
    time: "6 hours ago",
    content: "Ad Agency Creatives sent you a new private message",
    link: "#",
  },
  {
    avatar: Nathan,
    username: "Ad Agency Creatives",
    time: "6 hours ago",
    content: "Ad Agency Creatives sent you a new private message",
    link: "#",
  },
  {
    avatar: Nathan,
    username: "Ad Agency Creatives",
    time: "6 hours ago",
    content: "Ad Agency Creatives sent you a new private message",
    link: "#",
  },
];
const Notifications = () => {
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
              {notifications.map((item, index) => {
                return (
                  <div className="notif-item" key={`ag-${index}`}>
                    <div className="user-avatar">
                      <img src={item.avatar} height={50} width={50} />
                    </div>
                    <div className="notif-details">
                      <div className="username">{item.username}</div>
                      <div className="notif-time">
                        <IoTimeOutline />
                        {item.time}
                      </div>
                      <Link to={item.link} className="notif-content text-dark">
                        {item.content}
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
