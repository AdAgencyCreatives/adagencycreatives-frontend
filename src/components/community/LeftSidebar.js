import {
  IoBookmarkOutline,
  IoFileTrayOutline,
  IoHomeOutline,
  IoNotificationsOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSettingsOutline,
  IoTrendingUpOutline,
} from "react-icons/io5";
import { HiOutlineUserGroup } from "react-icons/hi2";

import { Link } from "react-router-dom";

const LeftSidebar = () => {
  return (
    <div className="community-sidebar">
      <div className="sidebar-menu">
        <ul className="menu-container">
          <li className="menu-item">
            <Link to="#">
              <IoHomeOutline />
              <div className="item-name">Home</div>
            </Link>
          </li>

          <li className="menu-item">
            <Link to="/community-members">
              <IoPersonOutline />
              <div className="item-name">Members</div>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/username/friends">
              <IoPeopleOutline />
              <div className="item-name">Friends</div>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/groups">
              <HiOutlineUserGroup />
              <div className="item-name">Groups</div>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/messages">
              <IoFileTrayOutline />
              <div className="item-name">Messages</div>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="#">
              <IoNotificationsOutline />
              <div className="item-name">Notifications</div>
            </Link>
          </li>
        </ul>
        <hr class="hr" />

        <ul className="menu-container">
          <li className="menu-item">
            <Link to="#">
              <IoBookmarkOutline />
              <div className="item-name">Bookmarks</div>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="#">
              <IoTrendingUpOutline />
              <div className="item-name">Activities</div>
            </Link>
          </li>
          <li className="menu-item">
            <Link to="#">
              <IoSettingsOutline />
              <div className="item-name">Settings</div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
