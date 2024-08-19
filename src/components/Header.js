import "../styles/Header.css";
import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Logo from "../assets/images/logo.png";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AiOutlineUser, AiOutlineBell, AiOutlineClose } from "react-icons/ai";
import { FaLinkedinIn, FaInstagramSquare } from "react-icons/fa";
import { NavLink, Link, useNavigate } from "react-router-dom";
import ScrollToHash from "./ScrollToHash";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { navItems } from "../nav/NavItems";
import AuthModal from "./modals/AuthModal";
import { Context as AuthContext } from "../context/AuthContext";
import { checkCookie } from "../helpers/functions";
import { Context as AlertContext } from "../context/AlertContext";
import { Context as SubscriptionContext } from "../context/SubscriptionContext";
import Placeholder from "../assets/images/placeholder.png";
import { agencyNav, creativeNav } from "../nav/DashboardNav";

import SlidingMessage from "./SlidingMessage";
import ScrollButton from "./ScrollButton";

const drawerWidth = "85%";

function Header(props) {

  const navigate = useNavigate();

  const { window: windowFn } = props;
  const { state, resetConversationUpdated } = React.useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [childLink, setChildLink] = useState("hashLink");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const handleOpen = () => setAuthModalOpen(true);
  const handleClose = () => setAuthModalOpen(false);

  const anchor = window.location.hash.slice(1);

  const [loggedInNav, setLoggedInNav] = useState(agencyNav);
  const instagram = "https://www.instagram.com/adagencycreativescommunity";
  const linkedIn = "https://www.linkedin.com/company/adagencycreatives";

  const {
    state: { message },
    showAlert,
  } = useContext(AlertContext);

  const {
    state: { subscription },
    getSubscription,
  } = useContext(SubscriptionContext);

  useEffect(() => {
    if (state.user && state.role && state.role == "agency") {
      getSubscription();
    }
  }, [state.user, state.role]);

  useEffect(() => {
    if (state?.conversation_updated_notifications?.length > 0) {
      let notificationText = '';
      for (let index = 0; index < state.conversation_updated_notifications.length; index++) {
        const element = state.conversation_updated_notifications[index];
        notificationText += element.message + '<br />\n';
      }
      showAlert(notificationText);
      resetConversationUpdated();
    }
  }, [state.conversation_updated_notifications]);

  useEffect(() => {
    if (state.token !== null) {
      setLoggedInNav(state.role === "creative" ? creativeNav : agencyNav);
    }
  }, [state.token]);

  const cc = () => {
    let cookie_token = checkCookie("cookie_token");
    // console.log("cookie_token: " + cookie_token);
    // console.log("react_token: ");
    // console.log(state?.token);
    // console.log("check:" + (state?.token && state.token != cookie_token));
    if (state?.token && state.token != cookie_token) {
      navigate("/logout");
    }
  };

  useEffect(() => {
    const timer = setInterval(cc, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [state.token]);

  useEffect(() => {
    if (anchor && anchor.length && (anchor.indexOf("register_") == 0 || anchor.indexOf("login") == 0)) {
      setAuthModalOpen(true);
    }
  }, [anchor]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  let location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path == "/") {
      setChildLink("hashLink");
    } else {
      setChildLink("link");
    }
  }, [location]);

  const validateAccess = (e, item) => {
    if (item && item.roles && item.roles.length > 0) {
      for (let index = 0; index < item.roles.length; index++) {
        const role = item.roles[index];
        if (state.role == role) {
          return true;
        }
      }
      showAlert(item.restrictedMessage);
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    return true;
  };

  const validateChildren = (item) => {
    if (item && item.children && item.children.length > 0) {
      if (item.roles_children && item.roles_children.length > 0) {
        for (let index = 0; index < item.roles_children.length; index++) {
          const role = item.roles_children[index];
          if (state.role == role) {
            return true;
          }
        }
        return false;
      }
      return true;
    }
    return false;
  };

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <ScrollToHash />
      <Grid container justifyContent="space-between" alignItems="center" backgroundColor="white" sx={{ paddingY: 3, paddingX: 1 }}>
        <Grid item xs={9}>
          <Link className="site-logo" to="/">
            <img className="" src={Logo} alt="Adagency Creatives" />
          </Link>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: "right" }} className="right-menu">
          <Box sx={{ display: { sm: "none" } }}>
            <IconButton href="#" sx={{ mr: 1 }}>
              <AiOutlineUser />
            </IconButton>
            <AiOutlineClose size={22} />
          </Box>
        </Grid>
      </Grid>
      <Divider />
      <Box className="drawer-box">
        <List>
          {navItems.map((item) => (
            <ListItem key={item.name}>
              <NavLink to={item.link} className={item.name}>
                <ListItemButton className="drawer-menu-link">
                  <ListItemText primary={item.name} disableTypography={false} />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
        </List>
        <div className="follow">
          <div className="drawer-menu-link">Follow Us</div>
          <div className="social-box">
            <a href={linkedIn} className="social" target="__blank">
              <FaLinkedinIn />
            </a>
            <a href={instagram} className="social" target="__blank">
              <FaInstagramSquare />
            </a>
          </div>
        </div>
      </Box>
    </Box>
  );

  const container = windowFn !== undefined ? () => windowFn().document.body : undefined;

  const StyledButton = styled(Button)`
    padding: 6px 12px;
    font-size: 20px;
    font-weight: 400;
    text-transform: none;
    &:hover {
      background-color: transparent;
      color: var(--color-primary);
    }
    &:focus {
      background-color: transparent;
      color: var(--color-primary);
    }
  `;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar elevation={0} component="nav" id="top-nav-fixed" sx={{ backgroundColor: "#fff", padding: { sm: "10px 0", xs: "0" } }}>
          <Toolbar>
            <Grid container justifyContent="space-between" alignItems="center" className="header_container">
              <Grid item lg={3} md={2} xs={8} className="left-logo">
                <Link className="site-logo">
                  <img className="" src={Logo} alt="Adagency Creatives" />
                </Link>
              </Grid>
              <Grid item lg={9} md={10} xs={4} sx={{ textAlign: "right", padding: "10px" }} className="right-menu">
                <Box sx={{ display: { md: "none", display: "flex", alignItems: "center", justifyContent: "center" } }}>
                  <IconButton href={state.token ? "/dashboard" : "#"} color="primary" onClick={() => (!state.token ? setAuthModalOpen(true) : "")}>
                    <AiOutlineUser />
                  </IconButton>

                  {state.role == "creative" && (
                    <IconButton href="/notifications" color="primary">
                      <AiOutlineBell />
                    </IconButton>
                  )}

                  <Link
                    to="/post-a-job"
                    sx={{ backgroundColor: "#000", color: "white" }}
                    className="btn btn-dark btn-narrow"
                    onClick={(e) => validateAccess(e, { roles: ["admin", "agency", "advisor", "recruiter"], restrictedMessage: "Please login as an Agency to access" })}
                  >
                    P
                  </Link>

                  <IconButton aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ p: 0, ml: 1, textAlign: "right" }}>
                    <a href="#navbar-offcanvas" className="btn-showmenu flex-column d-flex text-end align-items-end">
                      <span className="inner1"></span>
                      <span className="inner2"></span>
                      <span className="inner3"></span>
                    </a>
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                    justifyContent: "end",
                    flexWrap: "wrap",
                  }}
                >
                  {navItems.map((item) => (
                    <>
                      {(!item?.mobile) && (
                        <div key={item.name} className={`nav-item${validateChildren(item) ? " has-children" : ""}`}>
                          <NavLink to={item.link}>
                            <StyledButton color="link" className={`menu-link-btn ${validateChildren(item) ? " dropdown-toggle" : ""}`} onClick={(e) => validateAccess(e, item)}>
                              {item.name}
                            </StyledButton>
                          </NavLink>
                          {validateChildren(item) && (
                            <div className="dropdown-menu show">
                              <ul className="dropdown-list">
                                {item.children.map((child) => (
                                  <li key={child.name}>
                                    <NavLink to={child[childLink]} className={() => ""}>
                                      <span className={"list-item-text" + (child.name.toLowerCase()[0] == 'j' ? ' j-fix' : '')}>{child.name}</span>
                                    </NavLink>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ))}
                  <Button
                    href="/post-a-job"
                    sx={{ backgroundColor: "#000", color: "white" }}
                    className="post-job-link"
                    onClick={(e) => validateAccess(e, { roles: ["admin", "agency", "advisor", "recruiter"], restrictedMessage: "Please login as an Agency to access" })}
                  >
                    Post A Job
                  </Button>
                  {state.token ? (
                    <div className="nav-item has-children ms-2">
                      <div className="logged-in-menu">
                        <img
                          src={state.user?.user_thumbnail || state.user.image || Placeholder}
                          height="50"
                          width="50"
                          className="avatar-rounded rounded-circle object-fit-cover"
                          onError={(e) => {
                            e.target.src = Placeholder; // Set the backup image source
                          }}
                        />
                        <div className="username">
                          {state.user.first_name} {state.user.last_name}
                        </div>
                      </div>
                      <div className="dropdown-menu logged-in-dropdown show">
                        <ul className="dropdown-list">
                          {loggedInNav.map((item, index) => (
                            <li key={`liul${index}`} className="testing">
                              <Link to={item.link}>
                                <span className={"list-item-text" + (item.name.toLowerCase()[0] == 'j' ? ' j-fix' : '')}>{item.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <Button color="link" className="login-btn" onClick={() => setAuthModalOpen(true)}>
                      Login/Register
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Box component="nav">
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
                background: "black",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
      <AuthModal open={authModalOpen} handleClose={handleClose} />
      <SlidingMessage message={message} />
      <ScrollButton />
    </>
  );
}

Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Header;
