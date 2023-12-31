import {
  Grid,
  Button,
  Paper,
  Fab,
  Tooltip,
  Zoom,
  Card,
  Backdrop,
  Fade,
} from "@mui/material";
import { Container, Stack, Box } from "@mui/system";
import React from "react";
import Typography from "@mui/material/Typography";
import ResultList from "../../components/item/ResultList";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPlaylist } from "../content/contentSlice";
import PlaylistItem from "../../components/item/PlaylistItem";
import PlaylistContent from "../../components/item/PlaylistContent";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { createPlaylist } from "./playlistSlice";
import useAuth from "../../hooks/useAuth";
import { getSinglePlaylist } from "./playlistSlice";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Playlist() {
  const [playlistName, setPlaylistName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [albumListOpen, setAlbumListOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleAlbumListOpen = () => setAlbumListOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleAlbumListClose = () => {
    setAlbumListOpen(false);
  };
  const [data, setData] = useState("");
  const [render, setRender] = useState(0);

  const listAlbum = useSelector(
    (state) => state.content?.playlist[0]?.data?.data
  );
  const { user } = useAuth();
  const userRef = user._id;

  console.log("userRef", userRef);
  console.log("listAlbum", listAlbum);
  const renderFabButton = () => {
    if (render === 0) {
      return (
        <Tooltip
          title="create new playlist"
          TransitionComponent={Zoom}
          arrow
          placement="right"
        >
          <Fab onClick={handleOpen} color="secondary">
            <AddIcon />
          </Fab>
        </Tooltip>
      );
    } else if (render !== 0) {
      // return null;
      return (
        <Tooltip
          title="add album"
          TransitionComponent={Zoom}
          arrow
          placement="right"
        >
          <Fab onClick={handleAlbumListOpen} color="gray">
            <AddIcon />
          </Fab>
        </Tooltip>
      );
    }
    // Render null if no FAB should be shown for the active tab
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPlaylist({ playlistName, userRef }));
    setPlaylistName("");
    handleClose();
  };

  useEffect(() => {
    if (userRef) {
      dispatch(getPlaylist(userRef));
    }
  }, [dispatch]);

  let refinedPlaylist = [];
  const refinedList = listAlbum?.map((e, index) => {
    if (e.albumRef.length !== 0) {
      refinedPlaylist.push(e.albumRef);
    }
  });

  const spreadList = refinedPlaylist?.map((e) => {
    for (let i = 0; i < e.length; i++) {
      return e[i];
    }
  });

  console.log("spread Playlist", spreadList);

  return (
    <Container
      maxWidth="false"
      sx={{
        flexGrow: 1,
        maxWidth: "1344px",
        padding: "1rem",
        "@media screen and (max-width: 600px)": { padding: "0rem" },
      }}
    >
      {render !== 0 ? (
        <IconButton
          color="primary"
          // onClick={onClick}
        >
          <ArrowBackIcon />
          <Typography onClick={() => setRender(0)} variant="button">
            Return
          </Typography>
        </IconButton>
      ) : null}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Card sx={style}>
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
          </Card>
        </Modal>
      </div>

      <Stack sx={{ bgcolor: "primary.main" }} spacing={2}>
        <Box
          sx={{
            padding: "1rem 0.5rem 0rem 0.5rem",
            display: "flex",
            justifyContent: "flex-start",
          }}
        ></Box>

        {render === 0 ? (
          <ResultList data={listAlbum} setRender={setRender} />
        ) : (
          listAlbum &&
          listAlbum.map((singlePlaylist) => {
            if (
              singlePlaylist.playlistName === render &&
              !singlePlaylist.isDeleted
            ) {
              console.log(singlePlaylist, "singlePlaylist");
              return (
                // <Typography variant="h1">{singlePlaylist.albumRef}</Typography>
                <PlaylistContent
                  data={singlePlaylist.albumRef}
                  userId={userRef}
                  albumListOpen={albumListOpen}
                  handleAlbumListClose={handleAlbumListClose}
                />
              );
            }
          })
        )}
        {renderFabButton()}
      </Stack>
    </Container>
  );
}

export default Playlist;
