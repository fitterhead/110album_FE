import * as React from "react";
import useAuth from "../hooks/useAuth";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LoginModal from "../components/item/LoginModal";
import { getContent } from "../features/content/contentSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeColorContext } from "../contexts/ThemeContext";
import Menu from "@mui/icons-material/Menu";
import { MenuItem } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";

function MainHeader() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    console.log("nav clicked");
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  /* ---------------------------------- menu ---------------------------------- */

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [themeColor, setThemeColor] = React.useState("light");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useAuth();
  const auth = useAuth();
  const toggleTheme = useContext(ThemeColorContext);

  return (
    <Box
    // sx={{ flexGrow: 1 }}
    >
      <LoginModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
      {/* <RegisterModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      /> */}

      <AppBar position="static">
        <Toolbar>
          {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Box> */}
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}

          <Typography
            onClick={() => {
              navigate("/");
            }}
            variant="h7"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", sm: "flex" } }}
          >
            Top 120 Albums
          </Typography>

          {user ? (
            <>
              {" "}
              <Button
                sx={{
                  fontSize: "16px",
                  color: "white",
                  display: { xs: "none", sm: "flex" },
                }}
                variant="button"
                onClick={() => auth.logout(() => navigate("/"))}
              >
                LOGOUT
              </Button>
              <Button
                sx={{
                  fontSize: "16px",
                  color: "black",
                  display: { xs: "none", md: "flex" },
                }}
                variant="button"
                onClick={() => navigate("/account")}
              >
                ACCOUNT
              </Button>
            </>
          ) : (
            <Button
              sx={{ fontSize: "16px", display: { xs: "none", sm: "flex" } }}
              variant="button"
              onClick={handleOpen}
            >
              LOGIN
            </Button>
          )}
          <Button
            sx={{ fontSize: "16px", display: { xs: "none", sm: "flex" } }}
            variant="button"
            onClick={async () => toggleTheme.toggleThemeFunction()}
          >
            TOGGLE THEME
          </Button>
          <Button
            sx={{ fontSize: "16px", display: { xs: "none", sm: "flex" } }}
            variant="button"
            onClick={() => navigate("/search")}
          >
            SEARCH
          </Button>
          <Button
            sx={{ fontSize: "16px", display: { xs: "none", sm: "flex" } }}
            variant="button"
            onClick={() => navigate("/payment")}
          >
            CART
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;
