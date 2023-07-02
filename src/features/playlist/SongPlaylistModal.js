/* --------------------------------- import --------------------------------- */
import React from "react";
import { Modal, Box, Button, Typography, Stack } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { createAlertBar } from "../alert/alertSlice";
import { createPlaylist } from "./playlistSlice";
import { addAlbumToPlaylist } from "../content/contentSlice";
import { getPlaylist } from "../content/contentSlice";
import { Divider } from "@mui/material";

const SongPlaylistModal = ({ open, onClose, page }) => {
  /* -------------------------------------------------------------------------- */
  /*                                fetched state                               */
  /* -------------------------------------------------------------------------- */
  const dispatch = useDispatch();
  const { user } = useAuth();
  const userRef = user._id;

  const playlist = useSelector(
    (state) => state.content?.playlist[0]?.data?.data
  );
  const selectedAlbum = useSelector(
    (state) => state.content?.albums[0]?.data?.data
  );
  const playlistStatusBackend = useSelector(
    (state) => state.content?.playlistStatus
  );

  const [playlistId, setPlaylistId] = React.useState("");
  const [playlistName, setPlaylistName] = React.useState("");

  /* -------------------------------------------------------------------------- */
  /*                                  function                                  */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    dispatch(getPlaylist(userRef));
  }, [dispatch]);

  const handleChange = (event) => {
    setPlaylistId(event.target.value);
  };

  const sendAlbumToPlaylist = (e) => {
    let data = { playlistId: playlistId, albumId: selectedAlbum._id };
    dispatch(addAlbumToPlaylist(data));
    dispatch(createAlertBar("add to playlist success"));
    onClose();
    // handleOpen();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPlaylist({ playlistName, userRef, songExisted: true }));
    setPlaylistName("");
    onClose();
  };

  /* ------------------------------ console test ------------------------------ */

  console.log("songplaylist222", page);
  /* -------------------------------------------------------------------------- */
  /*                                  render ui                                 */
  /* -------------------------------------------------------------------------- */
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: "10px",
          p: 4,
        }}
      >
        <Stack spacing={2} direction="column">
          <Typography
            sx={{ marginBottom: "1rem" }}
            id="modal-modal-title"
            variant="h1"
            component="h2"
            align="center"
          >
            Select Song Playlist
          </Typography>
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
          {page !== "playlist" && (
            <>
              <Divider sx={{ marginTop: "1rem" }} />

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
                      if (!e.isDeleted && e.songExisted) {
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
            </>
          )}
        </Stack>
      </Box>
    </Modal>
  );
};

export default SongPlaylistModal;
