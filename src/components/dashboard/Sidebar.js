import { Link, NavLink } from "react-router-dom";
import Placeholder from "../../assets/images/placeholder.png";
import "../../styles/AgencyDashboard/Sidebar.scss";
import { useContext } from "react";
// import { Context } from "../../context/AuthContext";

const Sidebar = ({ nav, user }) => {
  // const {state:{user}} = useContext(Context)
  const profileLink = user?.type == "creatives" ? "/creative/" : "/agency/";
  return (
    <div className="agency-sidebar">
      {user && (
        <div className="sidebar-top">
          <div className="user-logo">
            <div className="employer-logo">
              <Link to={profileLink + user.slug}>
                <img
                  width="150"
                  height="150"
                  src={user.profile_image || Placeholder}
                />
              </Link>
            </div>
          </div>
          <div className="inner">
            <h3 className="title">
              <Link to={profileLink + user.slug}>{user.name}</Link>
            </h3>
            {user.location && (
              <>
                <div className="employer-location">
                  <div className="value">
                    {user.location.state},{user.location.city}
                  </div>
                </div>
                <div className="view-profile">
                  <Link
                    to={profileLink + user.slug}
                    className="btn btn-dark btn-hover-primary"
                  >
                    View Profile
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <div className="sidebar-menu">
        <ul className="menu">
          {nav.map((item, index) => {
            return (
              <li key={index}>
                <NavLink to={item.link}>{item.name}</NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
