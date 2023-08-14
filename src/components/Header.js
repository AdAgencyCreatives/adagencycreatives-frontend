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
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Logo from "../assets/images/logo.png";
import { Grid, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AiOutlineUser, AiOutlineBell, AiOutlineClose } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

const drawerWidth = "85%";
const navItems = ["Home", "Agencies", "Contact"];

function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        backgroundColor="white"
        sx={{ paddingY: 3, paddingX: 1 }}
      >
        <Grid item xs={8}>
          <Link className="site-logo">
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
            <ListItem key={item} disablePadding>
              <ListItemButton href="#" className="drawer-menu-link">
                <ListItemText primary={item} disableTypography="true" />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <div className="follow">
          <div className="drawer-menu-link">Follow Us</div>
          <div className="social">
            <FaLinkedinIn />
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
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        elevation={0}
        position="sticky"
        component="nav"
        sx={{ backgroundColor: "#fff", padding: { sm: "10px 0", xs: "0" } }}
      >
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item md={4} xs={6}>
              <Link className="site-logo">
                <img className="" src={Logo} alt="Adagency Creatives" />
              </Link>
            </Grid>
            <Grid
              item
              md={8}
              xs={6}
              sx={{ textAlign: "right", padding: "10px" }}
              className="right-menu"
            >
              <Box sx={{ display: { sm: "none" } }}>
                <IconButton href="#" color="primary">
                  <AiOutlineUser />
                </IconButton>

                <IconButton href="#" color="primary">
                  <AiOutlineBell />
                </IconButton>

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
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {navItems.map((item) => (
                  <StyledButton href="#" key={item} color="link">
                    {item}
                  </StyledButton>
                ))}
                <Button
                  href="#"
                  sx={{ backgroundColor: "#000", color: "white" }}
                  className="post-job-link"
                >
                  Post A Job
                </Button>
                <Button href="#" color="link" className="login-btn">
                  Login/Register
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
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
            display: { xs: "block", sm: "none" },
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
