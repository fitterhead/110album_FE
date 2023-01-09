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

function MainHeader() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useAuth();
  const auth = useAuth();

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
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            onClick={() => {
              navigate("/");
            }}
            variant="h7"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Top 120 Albums
          </Typography>

          {user ? (
            <>
              {" "}
              <Button
                sx={{ fontSize: "16px", color: "white" }}
                variant="button"
                onClick={() => auth.logout(() => navigate("/"))}
              >
                LOGOUT
              </Button>
              <Button
                sx={{ fontSize: "16px", color: "black" }}
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
            // onClick={async () => {
            //   const contents = await apiService.get("/albums");
            //   console.log("contents", contents);

            // dispatch(test());
            // dispatch(getContent());
            // console.log("clicked", dispatch(getContent("/albums")));
            // }}
            onClick={() => {
              dispatch(getContent());
            }}
          >
            {/* get Data */}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;
