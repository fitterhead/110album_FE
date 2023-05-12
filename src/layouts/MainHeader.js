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
import { Container, MenuItem } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import useCart from "../hooks/useCart";
function MainHeader() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const isMenuOpen = Boolean(anchorElNav);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    console.log("nav clicked");
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  /* ---------------------------------- menu ---------------------------------- */

  const navigate = useNavigate();

  /* ------------------------- show the length of cart ------------------------ */
  const cartProduct = useCart();
  // const cartLength = cartProduct.items.length;
  const cartLength = cartProduct.items;

  // const lengthAcc = cartLength.reduce((acc, currentValue) => {
  //   return acc + currentValue.amount;
  // });

  const lengthAcc = cartLength.reduce((acc, item) => {
    acc += item.amount;

    return acc;
  }, 0);

  console.log("cartProduct header222", lengthAcc);
  /* ------------------------------------ - ----------------------------------- */

  // console.log("cartLength", cartLength);
  const [open, setOpen] = React.useState(false);
  const [themeColor, setThemeColor] = React.useState("light");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useAuth();
  const auth = useAuth();
  const toggleTheme = useContext(ThemeColorContext);

  return (
    <Box sx={{ mb: 2 }}>
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
              aria-controls={anchorElNav ? "menu-appbar" : undefined}
              aria-haspopup="true"
              aria-expanded={anchorElNav ? "true" : undefined}
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
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
                // sx={{
                //   display: { xs: "block", md: "none" },
                // }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </IconButton>
          </Box> */}

          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}

          <Typography
            onClick={() => {
              navigate("/");
            }}
            variant="h7"
            style={{
              cursor: "pointer",
            }}
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "flex" },
              justifyContent: { xs: "center", md: "left", sm: "left" },
            }}
          >
            Top 110 Albums
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
              {user.isAdmin ? (
                <Button
                  sx={{
                    fontSize: "16px",
                    color: "black",
                    display: { xs: "none", md: "flex" },
                  }}
                  variant="button"
                  onClick={() => navigate("/dashboard")}
                >
                  DASHBOARD
                </Button>
              ) : null}
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
            onClick={() => {
              // window.localStorage.setItem("cartItem", JSON.stringify([]));
              navigate("/payment");
            }}
          >
            CART
            {lengthAcc >= 1 ? `(${lengthAcc})` : null}
          </Button>
        </Toolbar>
        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {user ? (
            <>
              {" "}
              <Button
                sx={{
                  fontSize: "16px",
                  color: "white",
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
              sx={{ fontSize: "16px" }}
              variant="button"
              onClick={handleOpen}
            >
              LOGIN
            </Button>
          )}
          <Button
            sx={{ fontSize: "16px" }}
            variant="button"
            onClick={async () => toggleTheme.toggleThemeFunction()}
          >
            TOGGLE THEME
          </Button>
          <Button
            sx={{ fontSize: "16px" }}
            variant="button"
            onClick={() => navigate("/search")}
          >
            SEARCH
          </Button>
          <Button
            sx={{ fontSize: "16px" }}
            variant="button"
            onClick={() => navigate("/payment")}
          >
            CART
          </Button>
        </Box>
      </AppBar>
    </Box>
  );
}

export default MainHeader;
