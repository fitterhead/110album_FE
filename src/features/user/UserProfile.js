import React from "react";
import useAuth from "../../hooks/useAuth";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useLocation, useNavigate } from "react-router-dom";

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

  console.log("user at userProfile", user);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            variant="h1"
            // component="h2"
          >
            Do you wish to delete this account?
          </Typography>
          <Typography
            id="modal-modal-description"
            variant="body2"
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

      <Typography variant="body2">username: {user.username}</Typography>
      <Typography variant="body2">email: {user.email}</Typography>
      <Button onClick={handleOpen}>Delete account</Button>

      {/* <Button>Create new Playlist</Button> */}
      {/* 
click delete => confirm popup shows => success alert => return to main page 
      */}
    </div>
  );
}

export default UserProfile;
