import React from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Paper,
  Tooltip,
  Zoom,
  Fab,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylist } from "../content/contentSlice";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import SongPlaylistModal from "../../features/playlist/SongPlaylistModal";

const PlaylistPage = () => {
  /* -------------------------------------------------------------------------- */
  /*                               modal function                               */
  /* -------------------------------------------------------------------------- */
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  /* ----------------------- render add playlist button ----------------------- */
  const renderFabButton = () => {
    return (
      <Tooltip
        title="create new playlist"
        TransitionComponent={Zoom}
        arrow
        onClick={openModal}
        placement="right"
      >
        <Fab color="secondary">
          <AddIcon />
        </Fab>
      </Tooltip>
    );
  };

  /* -------------------------- handle all playlists -------------------------- */
  const fullPlaylist = useSelector((state) => state.content?.playlist);
  const likedSong = useSelector((state) => state.content?.likedSong);
  const songPlaylist = useSelector((state) => state.content?.songPlaylist[0]);
  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    dispatch(getPlaylist(user._id));
  }, [dispatch]);

  console.log("likedSong", likedSong);
  console.log("songPlaylist", songPlaylist);

  /* ---------------------------- handle LikedSong ---------------------------- */
  const navigate = useNavigate();

  console.log("likedSong", likedSong);

  return (
    <Container maxWidth="xl" sx={{ padding: "1rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} xl={4}>
          <Card
            sx={{
              backgroundColor: "#5DDF2A",
              minHeight: "38vh",
              borderRadius: "0.5rem",
              "@media screen and (max-width: 900px)": { height: "38vh" },
            }}
            style={{
              cursor: "pointer",
            }}
            onClick={() => navigate("/likedsong")}
          >
            <CardContent>
              <Typography variant="h2">Liked Song</Typography>
              {likedSong[0]?.songRef?.map((song, index) => (
                <Typography key={index} variant="h1">
                  {song.songName}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {songPlaylist?.map(
          (playlist, index) =>
            playlist.songExisted && (
              <Grid key={index} item xs={12} sm={6} md={3} xl={2}>
                <Paper
                  elevation={3}
                  sx={{
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                    minHeight: "38vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: "#f5f5f5",
                    transition: "background-color 0.3s ease",
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}
                  onClick={() => navigate(`/playlist/${index}`)}
                >
                  {playlist.playlistImage !== "" ? (
                    <CardMedia
                      component="img"
                      src={playlist.playlistImage}
                      sx={{ margin: "1rem" }}
                      style={{
                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
                        width: "90%",
                        aspectRatio: "1/1",
                        objectFit: "cover",
                        borderRadius: "0.5rem",
                      }}
                    />
                  ) : (
                    <CardMedia
                      component="img"
                      sx={{ margin: "1rem" }}
                      style={{
                        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
                        width: "90%",
                        aspectRatio: "1/1",
                        objectFit: "cover",
                        borderRadius: "0.5rem",
                      }}
                    />
                  )}
                  <CardContent style={{ textAlign: "center" }}>
                    <Typography variant="h1" sx={{fontSize:"18px"}}>
                      {playlist.playlistName}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      {/* {playlist.playlistCreator} */}
                    </Typography>
                  </CardContent>
                </Paper>
              </Grid>
            )
        )}
      </Grid>
      {renderFabButton()}
      <SongPlaylistModal
        open={isModalOpen}
        onClose={closeModal}
        page={"playlist"}
      />
    </Container>
  );
};

export default PlaylistPage;
