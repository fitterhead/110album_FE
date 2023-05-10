import { Grid, Button } from "@mui/material";
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

function Playlist() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  const [render, setRender] = useState(0);
  const listAlbum = useSelector(
    (state) => state.content?.playlist[0]?.data?.data
  );

  useEffect(() => {
    setData(dispatch(getPlaylist()));
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
        padding: "2rem",
        "@media screen and (max-width: 600px)": { padding: "0rem" },
      }}
    >
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </div>
      <Stack sx={{ bgcolor: "primary.main" }} spacing={2}>
        <Box
          sx={{
            padding: "1rem 0.5rem 0rem 0.5rem",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="h1">
            {render !== 0 ? `${render}` : "Playlist"}
          </Typography>
        </Box>
        <Button onClick={handleOpen} sx={{ color: "white" }}>
          Create new Playlist
        </Button>
        {/* <ResultList data={listAlbum} setRender={setRender} /> */}
        {/* <PlaylistItem /> */}

        {render === 0 ? (
          <ResultList data={listAlbum} setRender={setRender} />
        ) : (
          listAlbum &&
          listAlbum.map((singlePlaylist) => {
            if (singlePlaylist.playlistName === render) {
              return (
                // <Typography variant="h1">{singlePlaylist.albumRef}</Typography>
                <PlaylistContent data={singlePlaylist.albumRef} />
              );
            }
          })
        )}
      </Stack>
    </Container>
  );
}

export default Playlist;
