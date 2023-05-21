import React from "react";
import useAuth from "../../hooks/useAuth";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useLocation, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function UserProfile() {
  const { user } = useAuth();
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const onClick = async (user) => {
    const from = location.state?.from?.pathname || "/";
    let { _id } = user;
    try {
      await console.log(_id, "id");

      auth.deleteAccount({ _id }, () => {
        navigate(from, { replace: true });
        handleClose();
      });
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("user at userProfile", user);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const registeredDate = new Date(user?.createdAt);
  const formattedDate = registeredDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  console.log("registeredDate", registeredDate);
  console.log("formattedDate", formattedDate);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h2"
            // component="h2"
          >
            Do you wish to delete this account?
          </Typography>
          <Typography
            id="modal-modal-description"
            variant="body1"
            sx={{ mt: 2 }}
          >
            After confirmed, this step can not be reversed.
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Button onClick={() => onClick(user)}>Delete</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>

      <Grid container spacing={2} sx={{ padding: "1rem" }}>
        <Grid item xs={12} md={4}>
          <Typography variant="h1" sx={{ fontSize: "16px" }}>
            username:{" "}
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h1" sx={{ fontSize: "16px" }}>
            {" "}
            {user ? user.username : "loading"}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h1" sx={{ fontSize: "16px" }}>
            email:{" "}
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h1" sx={{ fontSize: "16px" }}>
            {" "}
            {user ? user.email : "loading"}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h1" sx={{ fontSize: "16px" }}>
            Member since:
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h1" sx={{ fontSize: "16px" }}>
            {formattedDate}
          </Typography>
        </Grid>
      </Grid>

      <Button onClick={handleOpen}>Delete account</Button>

      {/* <Button>Create new Playlist</Button> */}
      {/* 
click delete => confirm popup shows => success alert => return to main page 
      */}
    </div>
  );
}

export default UserProfile;
