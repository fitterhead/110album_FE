import React, { useEffect } from "react";
import {
  Modal,
  Box,
  Stack,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { createPlaylist } from "../../features/playlist/playlistSlice";
import useCart from "../../hooks/useCart";
import {
  addAlbumToPlaylist,
  getPlaylist,
} from "../../features/content/contentSlice";
import { createAlertBar } from "../../features/alert/alertSlice";

/* ---------------------------- modal ui styling ---------------------------- */
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

function CreateNewPlaylist({ open, onClose }) {
  /* ------------------------- handle add to playlist ------------------------- */
  const [playlistName, setPlaylistName] = React.useState("");
  const { user } = useAuth();
  const userRef = user._id;

  console.log("userRef", userRef);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPlaylist({ playlistName, userRef }));
    setPlaylistName("");
    onClose();
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
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
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
  );
}

export default CreateNewPlaylist;
