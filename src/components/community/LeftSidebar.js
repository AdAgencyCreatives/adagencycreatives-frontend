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
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as CommunityContext } from "../../context/CommunityContext";

import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

const LeftSidebar = (props) => {

  const [refreshCounts, setRefreshCounts] = useState({ num: 0 });
  const [messagesCount, setMessagesCount] = useState(0);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [activitiesCount, setActivitiesCount] = useState(0);

  const {
    state: { role, user, token, messages_count, notifications_count, activities_count },
    getMessagesCount, getNotificationsCount, getActivitiesCount
  } = useContext(AuthContext);

  const {
    state: { friends_count },
    getFriendsCount
  } = useContext(CommunityContext);

  useEffect(() => {
    if (user) {
      getMessagesCount(user.uuid, 'private');
      getNotificationsCount(user.uuid);
      // getActivitiesCount(user.uuid);
      getFriendsCount();
    }
  }, [user, refreshCounts]);

  useEffect(() => {
    setMessagesCount(messages_count);
  }, [messages_count]);

  useEffect(() => {
    setNotificationsCount(notifications_count);
  }, [notifications_count]);

  useEffect(() => {
    setActivitiesCount(activities_count);
  }, [activities_count]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshCounts((prevState) => {
        return {
          num: prevState.num + 1,
        };
      });
      // Reload posts after 10 seconds
    }, 15 * 1000);

    return () => clearInterval(interval);
  }, []);


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
              <span className="count">{friends_count ? friends_count : 0}</span>
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
              <span className="count">{messagesCount ? messagesCount : 0}</span>
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/notifications">
              <IoNotificationsOutline />
              <div className="item-name">Notifications</div>
              <span className="count">{notificationsCount ? notificationsCount : 0}</span>
            </NavLink>
          </li>
        </ul>
        <hr className="hr" />

        <ul className="menu-container">
          {/* <li className="menu-item">
            <NavLink to="/bookmarks">
              <IoBookmarkOutline />
              <div className="item-name">Bookmarks</div>
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/activities">
              <IoTrendingUpOutline />
              <div className="item-name">Activities</div>
              <span className="count">{activitiesCount ? activitiesCount : 0}</span>
            </NavLink>
          </li> */}
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
