import { Link, NavLink } from "react-router-dom";
import Placeholder from "../../assets/images/placeholder.png";
import "../../styles/AgencyDashboard/Sidebar.scss";
import { useContext, useState } from "react";
import { Box, Drawer } from "@mui/material";
// import { Context } from "../../context/AuthContext";

const Sidebar = ({ nav, user, window, mobileOpen, setMobileOpen }) => {
  // const {state:{user}} = useContext(Context)
  const profileLink = user?.type == "creatives" ? "/creative/" : "/agency/";

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawerWidth = "85%";

  const getSidebar = () => (
    <div className="agency-sidebar">
      {user && (
        <div className="sidebar-top">
          <div className="user-logo">
            <div className="employer-logo">
              <Link to={profileLink + user.slug}>
                <img
                  width="150"
                  height="150"
                  src={
                    (user.type == "creatives"
                      ? user.profile_image
                      : user.logo) || Placeholder
                  }
                  onError={(e) => {
                    e.target.src = Placeholder; // Set the backup image source
                  }}
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
                    {user.location.state}, {user.location.city}
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

  const getDrawer = () => (
    <Drawer
      container={container}
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { sm: "block", md: "none" },
        "& .MuiDrawer-paper": {
          //boxSizing: "border-box",
          width: drawerWidth,
        },
      }}
    >
      {getSidebar()}
    </Drawer>
  );
  return (
    <>
      <div className="d-md-block d-none">{getSidebar()}</div>
      {getDrawer()}
    </>
  );
};
export default Sidebar;
