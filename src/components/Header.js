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
import { NavLink, Link } from "react-router-dom";
import ScrollToHash from "./ScrollToHash";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { navItems } from "../nav/NavItems";
import AuthModal from "./modals/AuthModal";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as AlertContext } from "../context/AlertContext";
import { Context as SubscriptionContext } from "../context/SubscriptionContext";
import Placeholder from "../assets/images/placeholder.png";
import { agencyNav, creativeNav } from "../nav/DashboardNav";

import SlidingMessage from "./SlidingMessage";
import ScrollButton from "./ScrollButton";

const drawerWidth = "85%";

function Header(props) {

  const { window } = props;
  const { state } = React.useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [childLink, setChildLink] = useState("hashLink");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const handleOpen = () => setAuthModalOpen(true);
  const handleClose = () => setAuthModalOpen(false);

  const [loggedInNav, setLoggedInNav] = useState(agencyNav);
  const instagram = "https://www.instagram.com/adagencycreativescommunity";
  const linkedIn = "https://www.linkedin.com/company/adagencycreatives";

  const { state: { message }, showAlert } = useContext(AlertContext);

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
    if (state.token !== null) {
      setLoggedInNav(state.role === "creative" ? creativeNav : agencyNav);
    }
  }, [state.token]);

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

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <ScrollToHash />
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        backgroundColor="white"
        sx={{ paddingY: 3, paddingX: 1 }}
      >
        <Grid item xs={8}>
          <Link className="site-logo" to="/">
            <img className="" src={Logo} alt="Adagency Creatives" />
          </Link>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: "right" }} className="right-menu">
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
            <ListItem key={item.name} disablePadding>
              <NavLink to={item.link}>
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

  const container =
    window !== undefined ? () => window().document.body : undefined;

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
        <AppBar
          elevation={0}
          component="nav"
          id="top-nav-fixed"
          sx={{ backgroundColor: "#fff", padding: { sm: "10px 0", xs: "0" } }}
        >
          <Toolbar>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item lg={3} md={2} xs={6}>
                <Link className="site-logo">
                  <img className="" src={Logo} alt="Adagency Creatives" />
                </Link>
              </Grid>
              <Grid
                item
                lg={9}
                md={10}
                xs={6}
                sx={{ textAlign: "right", padding: "10px" }}
                className="right-menu"
              >
                <Box sx={{ display: { md: "none" } }}>
                  <IconButton
                    href={state.token ? "/dashboard" : "#"}
                    color="primary"
                    onClick={() => (!state.token ? setAuthModalOpen(true) : "")}
                  >
                    <AiOutlineUser />
                  </IconButton>

                  <IconButton href="#" color="primary">
                    <AiOutlineBell />
                  </IconButton>

                  <Link
                    to="/post-a-job"
                    sx={{ backgroundColor: "#000", color: "white" }}
                    className="btn btn-dark btn-narrow"
                    onClick={(e) => validateAccess(e, { roles: ["admin", "agency"], restrictedMessage: 'Please login as Agency to access' })}
                  >
                    P
                  </Link>

                  <IconButton
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ p: 0, ml: 1, textAlign: "right" }}
                  >
                    <a
                      href="#navbar-offcanvas"
                      className="btn-showmenu flex-column d-flex text-end align-items-end"
                    >
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
                    <div
                      key={item.name}
                      className={`nav-item${item.children ? " has-children" : ""
                        }`}
                    >
                      <NavLink to={item.link}>
                        <StyledButton
                          color="link"
                          className={`menu-link-btn ${item.children ? " dropdown-toggle" : ""
                            }`}
                          onClick={(e) => validateAccess(e, item)}
                        >
                          {item.name}
                        </StyledButton>
                      </NavLink>
                      {item.children && item.children.length > 0 && (
                        <div className="dropdown-menu show">
                          <ul className="dropdown-list">
                            {item.children.map((child) => (
                              <li key={child.name}>
                                <NavLink
                                  to={child[childLink]}
                                  className={() => ""}
                                >
                                  {child.name}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                  <Button
                    href="/post-a-job"
                    sx={{ backgroundColor: "#000", color: "white" }}
                    className="post-job-link"
                    onClick={(e) => validateAccess(e, { roles: ["admin", "agency"], restrictedMessage: 'Please login as Agency to access' })}
                  >
                    Post A Job
                  </Button>
                  {state.token ? (
                    <div className="nav-item has-children">
                      <div className="logged-in-menu">
                        <img
                          src={state.user.image || Placeholder}
                          height="50"
                          width="50"
                          className="avatar-rounded rounded-circle object-fit-cover"
                          onError={(e) => {
                            e.target.src = Placeholder; // Set the backup image source
                          }}
                        />
                        <div className="username">{state.user.first_name} {state.user.last_name}</div>
                      </div>
                      <div className="dropdown-menu logged-in-dropdown show">
                        <ul className="dropdown-list">
                          {loggedInNav.map((item, index) => (
                            <li key={`liul${index}`} className="testing">
                              <Link to={item.link}>{item.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <Button
                      href="#"
                      color="link"
                      className="login-btn"
                      onClick={() => setAuthModalOpen(true)}
                    >
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
