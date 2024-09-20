import { Link, NavLink } from "react-router-dom";
import Placeholder from "../../assets/images/placeholder.png";
import "../../styles/AgencyDashboard/Sidebar.scss";
import { useContext, useState } from "react";
import { Box, Drawer } from "@mui/material";
import { Context as AuthContext } from "../../context/AuthContext";
import UserLocation from "../UserLocation";
import CreativeImageLoader from "../CreativeImageLoader";
import AgencyImageLoader from "../AgencyImageLoader";
import AvatarImageLoader from "../AvatarImageLoader";

const Sidebar = ({ nav, user, window, mobileOpen, setMobileOpen }) => {
  const {
    state: {
      role,
    } } = useContext(AuthContext);

  const isAdmin = role == "admin";
  const isAdvisor = role == "advisor";
  const isAgency = role == "agency";

  const profileLink = user?.type == "creatives" ? "/creative/" : "/agency/";

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawerWidth = "75%";

  const getSidebar = () => (
    <div className="agency-sidebar">
      {user && (
        <div className="sidebar-top">
          <div className="user-logo">
            <div className="employer-logo">
              <Link to={profileLink + user.slug}>
                {/* {user?.type == "creatives" && user?.name?.length > 0 && (
                  <CreativeImageLoader creative={user} width={90} height={90} />
                )}
                {user?.type == "agencies" && user?.name?.length > 0 && (
                  <AgencyImageLoader agency={user} height={90} width={90} />
                )} */}
                <AvatarImageLoader user={user} height={90} width={90} />
              </Link>
            </div>
          </div>
          <div className="inner">
            <h3 className="title">
              <Link to={profileLink + user.slug}>{user.name}</Link>
            </h3>
            {user?.location && (
              <>
                <div className="employer-location">
                  <UserLocation location={user?.location} hideIcon={true} />
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
                <NavLink to={item.link} onClick={() => setMobileOpen(false)}>{item.name}</NavLink>
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
