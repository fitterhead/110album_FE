import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ListItemText } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import useCart from "../../hooks/useCart";

import {
  addAlbumToCart,
  getPlaylist,
} from "../../features/content/contentSlice";
import { addAlbumToPlaylist } from "../../features/content/contentSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BackendModal() {
  const [backendOpen, setBackendOpen] = React.useState(false);
  const cartFunction = useCart();

  const handleOpen = () => {
    setBackendOpen(true);
  };
  const dispatch = useDispatch();
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
    dispatch(getPlaylist());
  }, [dispatch]);

  const [playlistId, setPlaylistId] = React.useState("");

  const handleChange = (event) => {
    setPlaylistId(event.target.value);
  };

  const sendAlbumToPlaylist = (e) => {
    let data = { playlistId: playlistId, albumId: selectedAlbum._id };

    // console.log("data send to playlist update", data);
    dispatch(addAlbumToPlaylist(data));
    // handleClose();
    handleOpen();
  };

  const sendAlbumToCart = async (e) => {
    const data = {
      reference_id: selectedAlbum._id,
      description: selectedAlbum.album,
      price: 19,
    };
    try {
      console.log("useContext worked", cartFunction.items);

      await cartFunction.addToCart(data);
    } catch (error) {
      console.log(error, "cart Errorrrrrr");
    }
  };

  //   const sendMessage = () ={

  // }

  //   console.log("playlist modal", playlist);
  // console.log("playlist selectedAlbum", selectedAlbum);
  return (
    <div>
      {/* <Button onClick={handleOpen}>Add to favourite</Button> */}
      <Button onClick={sendAlbumToCart}>Add to Cart</Button>
      <Modal
        open={backendOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {playlistStatusBackend === "added album to playlist successfully" ? (
          <Box sx={style}>
            <Typography>success</Typography>
          </Box>
        ) : (
          <Box sx={style}>
            <Typography
              sx={{ marginBottom: "1rem" }}
              id="modal-modal-title"
              variant="h1"
              component="h2"
            >
              Select Playlist
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
                    if (!e.isDeleted) {
                      return (
                        <MenuItem key={Math.random()} value={e._id}>
                          {e.playlistName}
                        </MenuItem>
                      );
                    }
                  })}
              </Select>
            </FormControl>
            <Button
              sx={{ maxWidth: "20vw" }}
              onClick={() => sendAlbumToPlaylist()}
              variant="contained"
            >
              add
            </Button>
            <Button
              // sx={{ maxWidth: "20vw" }}
              onClick={() => sendAlbumToPlaylist()}
              variant="contained"
            >
              create new playlist
            </Button>
          </Box>
        )}
      </Modal>
    </div>
  );
}
