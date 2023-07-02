import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Card, ListItemText, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import useCart from "../../hooks/useCart";
// import ModalForm from "../form/ModalForm";
import TextField from "@mui/material/TextField";
import { createPlaylist } from "../../features/playlist/playlistSlice";
import useAuth from "../../hooks/useAuth";
import { createAlertBar } from "../../features/alert/alertSlice";
import {
  addAlbumToCart,
  getPlaylist,
} from "../../features/content/contentSlice";
import { addAlbumToPlaylist } from "../../features/content/contentSlice";
import { PAYPAL_HOSTED_FIELDS_TYPES } from "@paypal/react-paypal-js";
import SongPlaylistModal from "../../features/playlist/SongPlaylistModal";
import { handleCart } from "../../features/cart/CartSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

export default function BackendModal() {
  /* -------------------------- create song playlist -------------------------- */

  const [isModalOpen, setModalOpen] = React.useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  /* --------------------------- crate new playlist --------------------------- */

  const [playlistName, setPlaylistName] = React.useState("");
  const { user } = useAuth();
  const userRef = user._id;

  console.log("userRef", userRef);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPlaylist({ playlistName, userRef }));
    setPlaylistName("");
    handleClose();
  };

  const [backendOpen, setBackendOpen] = React.useState(false);
  const cartFunction = useCart();

  const handleOpen = () => {
    setBackendOpen(true);
  };

  const handleClose = () => {
    setBackendOpen(false);
  };
  const playlist = useSelector(
    (state) => state.content?.playlist[0]?.data?.data
  );
  const selectedAlbum = useSelector(
    (state) => state.content?.albums[0]?.data?.data
  );
  const playlistStatusBackend = useSelector(
    (state) => state.content?.playlistStatus
  );

  useEffect(() => {
    dispatch(getPlaylist(userRef));
  }, [dispatch]);

  const [playlistId, setPlaylistId] = React.useState("");

  const handleChange = (event) => {
    setPlaylistId(event.target.value);
  };

  const sendAlbumToPlaylist = (e) => {
    let data = { playlistId: playlistId, albumId: selectedAlbum._id };

    // console.log("data send to playlist update", data);
    dispatch(addAlbumToPlaylist(data));
    dispatch(createAlertBar("add to playlist success"));
    handleClose();
    // handleOpen();
  };

  /* ------------------------------- handleCart ------------------------------- */

  const handleAlbumCart = (e) => {
    const data = {
      albumId: selectedAlbum._id,
      description: selectedAlbum.album,
      type: "plus",
    };

    dispatch(handleCart(userRef, data));
  };

  /* ------------------------------------ - ----------------------------------- */

  const sendAlbumToCart = async (e) => {
    const data = {
      reference_id: selectedAlbum._id,
      description: selectedAlbum.album,
      price: 19,
    };
    try {
      console.log("useContext worked", cartFunction.items);

      await cartFunction.addToCart(data);
      dispatch(createAlertBar("add to cart success"));
    } catch (error) {
      console.log(error, "cart Errorrrrrr");
    }
  };

  return (
    <div>
      <Stack spacing={2} direction="row">
        <Button onClick={handleOpen}>Add Album to favourite</Button>
        {/* <Button onClick={sendAlbumToCart}>Add to Cart</Button> */}
        <Button onClick={handleAlbumCart}>Add to Cart</Button>
        <Button onClick={openModal}>Add to Playlist</Button>
      </Stack>
      <SongPlaylistModal open={isModalOpen} onClose={closeModal} />
      <Modal
        open={backendOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={2} direction="column">
            <Typography
              sx={{ marginBottom: "1rem" }}
              id="modal-modal-title"
              variant="h1"
              component="h2"
              align="center"
            >
              Select Album Playlist
            </Typography>

            <FormControl fullWidth sx={{ marginBottom: "1rem" }}>
              {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={playlistId}
                label="playlistID"
                onChange={handleChange}
              >
                {playlist &&
                  playlist.map((e) => {
                    if (!e.isDeleted && !e.songExisted) {
                      return (
                        <MenuItem key={Math.random()} value={e._id}>
                          <Typography variant="body3">
                            {e.playlistName}
                          </Typography>
                        </MenuItem>
                      );
                    }
                  })}
              </Select>
            </FormControl>
            <Button onClick={() => sendAlbumToPlaylist()} variant="contained">
              add
            </Button>

            <TextField
              name="email"
              placeholder="type your new playlist name"
              fullWidth
              sx={{ backgroundColor: "white" }}
              onChange={(e) => setPlaylistName(e.target.value)}
              InputProps={{
                style: {
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: "20px",
                  lineHeight: "120%",
                  // color: "#BDBDBD",
                },
              }} // font size of input label
            />
            <Button
              sx={{ marginTop: "1rem" }}
              onClick={handleSubmit}
              variant="contained"
            >
              create new playlist
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
