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
            <a href="#">
              <IoHomeOutline />
              <div className="item-name">Home</div>
            </a>
          </li>

          <li className="menu-item">
            <Link to="/community-members">
              <IoPersonOutline />
              <div className="item-name">Members</div>
            </Link>
          </li>
          <li className="menu-item">
            <a href="/username/friends">
              <IoPeopleOutline />
              <div className="item-name">Friends</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="/username/groups">
              <HiOutlineUserGroup />
              <div className="item-name">Groups</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="#">
              <IoFileTrayOutline />
              <div className="item-name">Messages</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="#">
              <IoNotificationsOutline />
              <div className="item-name">Notifications</div>
            </a>
          </li>
        </ul>
        <hr class="hr" />

        <ul className="menu-container">
          <li className="menu-item">
            <a href="#">
              <IoBookmarkOutline />
              <div className="item-name">Bookmarks</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="#">
              <IoTrendingUpOutline />
              <div className="item-name">Activities</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="#">
              <IoSettingsOutline />
              <div className="item-name">Settings</div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
