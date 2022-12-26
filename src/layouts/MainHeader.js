import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LoginModal from "../components/item/LoginModal";
import RegisterModal from "../components/item/RegisterModal";
// import ProfilePage from "../pages/ProfilePage";
import { getContent } from "../features/content/contentSlice";
import { useDispatch } from "react-redux";
import { test } from "../features/content/contentSlice";
import apiService from "../app/apiService";
import { useSelector } from "react-redux";
function MainHeader() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
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
          <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
            Top 120 Albums
          </Typography>
          {/* <Button
            sx={{ fontSize: "16px", color: "white" }}
            variant="button"
            onClick={handleOpen}
          >
            REGISTER
          </Button> */}
          <Button
            sx={{ fontSize: "16px" }}
            variant="button"
            onClick={handleOpen}
          >
            LOGIN
          </Button>
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
