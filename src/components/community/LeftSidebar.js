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

import { NavLink } from "react-router-dom";

const LeftSidebar = () => {
  return (
    <div className="community-sidebar">
      <div className="sidebar-menu">
        <ul className="menu-container">
          <li className="menu-item">
            <NavLink to="/community">
              <IoHomeOutline />
              <div className="item-name">Home</div>
            </NavLink>
          </li>

          <li className="menu-item">
            <NavLink to="/community-members">
              <IoPersonOutline />
              <div className="item-name">Members</div>
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/friends">
              <IoPeopleOutline />
              <div className="item-name">Friends</div>
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/groups">
              <HiOutlineUserGroup />
              <div className="item-name">Groups</div>
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/messages">
              <IoFileTrayOutline />
              <div className="item-name">Messages</div>
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/notifications">
              <IoNotificationsOutline />
              <div className="item-name">Notifications</div>
              {/* <span className="count">2</span> */}
            </NavLink>
          </li>
        </ul>
        <hr className="hr" />

        <ul className="menu-container">
          <li className="menu-item">
            <NavLink to="/bookmarks">
              <IoBookmarkOutline />
              <div className="item-name">Bookmarks</div>
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="activities">
              <IoTrendingUpOutline />
              <div className="item-name">Activities</div>
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/settings">
              <IoSettingsOutline />
              <div className="item-name">Settings</div>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
