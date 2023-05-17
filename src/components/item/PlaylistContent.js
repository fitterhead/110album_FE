import React, { useEffect } from "react";
import {
  Box,
  Card,
  Grid,
  Paper,
  Modal,
  Backdrop,
  Fade,
  Button,
  TextField,
  CardActions,
  Pagination,
  CardContent,
  Divider,
  Fab,
  Avatar,
  Zoom,
  Tooltip,
} from "@mui/material";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import ClearIcon from "@mui/icons-material/Clear";
import { deleteAlbumFromAPlaylist } from "../../features/playlist/playlistSlice";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSinglePlaylist } from "../../features/playlist/playlistSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getContent } from "../../features/content/contentSlice";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { addAlbumToPlaylist } from "../../features/content/contentSlice";
import { createAlertBar } from "../../features/alert/alertSlice";
import { getPlaylist } from "../../features/content/contentSlice";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  // maxHeight: "80vh",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
};

function PlaylistContent({
  data,
  userId,
  albumListOpen,
  handleAlbumListClose,
}) {
  // const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  // tao handle click function
  const handleArtistBio = (artistId) => {
    navigate(`/artist/${artistId}`);
  };

  const handleAlbumInfo = (artistId) => {
    navigate(`/album/result/${artistId}`);
  };
  const handleClick = (e) => {
    // e.preventDefault();

    dispatch(
      deleteAlbumFromAPlaylist({
        albumId: e,
        playlistId: params.id,
        userId: userId,
      })
    );

    // console.log({ playlistId: e, albumId: params.id }, "test");
    // alert(e);
    // setPlaylistName("");
  };

  // const handleOpen = () => setOpen(true);
  // const handleClose = () => {
  //   setOpen(false);
  // };
  // const singlePlaylist = useSelector(
  //   (state) => state.content?.playlist.singlePlaylist
  // );
  // useEffect(() => {
  //   dispatch(getSinglePlaylist(params.id));
  // }, [dispatch]);

  console.log("playlist content data", data);

  /* -------------------------------- maindata -------------------------------- */
  const allAlbums = useSelector((state) => state.content?.contents[0]?.data);
  console.log("allAlbums", allAlbums);
  const playlistList = useSelector(
    (state) => state.content?.playlist[0]?.data?.data
  );
  console.log("playlistList", playlistList);
  useEffect(
    () => {
      dispatch(getContent({ page }));
      dispatch(getPlaylist(userId));
      // dispatch(getSinglePlaylist(params.id));
    },
    //  [page]);
    [dispatch, page]
  );

  const sendAlbumToPlaylist = (data) => {
    console.log("dataaaaaaa", data);
    dispatch(addAlbumToPlaylist(data));
    dispatch(createAlertBar("add to playlist success"));
    // handleClose();
    handleAlbumListClose();
    dispatch(getSinglePlaylist(params.id));

    dispatch(getPlaylist(userId));
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box>
        <Modal
          open={albumListOpen}
          onClose={handleAlbumListClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={albumListOpen}>
            <Card sx={style}>
              <Grid container padding={2}>
                <Box
                  sx={{
                    width: "100%",
                    maxHeight: "80vh",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {allAlbums?.data?.map((item) => {
                    return (
                      <Grid container item padding={2}>
                        <Grid
                          item
                          xs={5}
                          sm={5}
                          sx={{ paddingBottom: "0.5rem" }}
                        >
                          <CardContent
                            sx={{
                              height: "5vh",
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center",
                            }}
                          >
                            <Tooltip
                              style={{
                                cursor: "pointer",
                              }}
                              followCursor
                              title={
                                <img
                                  src={`https://finalbe-production.up.railway.app/static/image/${item.album}.jpg`}
                                  alt="Tooltip"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              }
                              TransitionComponent={Zoom}
                              arrow
                              // placement="right"
                            >
                              <Typography variant="button">
                                {item.album}
                              </Typography>
                            </Tooltip>
                          </CardContent>
                        </Grid>
                        <Grid
                          item
                          xs={5}
                          sm={5}
                          sx={{ paddingBottom: "0.5rem" }}
                        >
                          <CardContent
                            sx={{
                              height: "5vh",
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center",
                            }}
                          >
                            <Typography variant="body3">
                              {item.artistName}
                            </Typography>
                          </CardContent>
                        </Grid>

                        <Grid
                          item
                          xs={2}
                          sm={2}
                          sx={{ paddingBottom: "0.5rem" }}
                        >
                          <CardContent
                            sx={{
                              height: "5vh",
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              sx={{ color: "primary.main" }}
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                sendAlbumToPlaylist({
                                  playlistId: params.id,
                                  albumId: item._id,
                                })
                              }
                              variant="button"
                            >
                              {<AddCircleIcon />}
                            </Typography>
                          </CardContent>
                        </Grid>
                      </Grid>
                    );
                  })}
                  {/* <Grid container item padding={2}>
                    <Grid item xs={5} sm={5} sx={{ paddingBottom: "0.5rem" }}>
                      <CardContent sx={{ height: "5vh" }}>
                        <Typography variant="button">name</Typography>
                      </CardContent>
                    </Grid>
                    <Grid item xs={5} sm={5} sx={{ paddingBottom: "0.5rem" }}>
                      <CardContent sx={{ height: "5vh" }}>
                        <Typography variant="button">artist</Typography>
                      </CardContent>
                    </Grid>
                    <Grid item xs={2} sm={2} sx={{ paddingBottom: "0.5rem" }}>
                      <CardContent sx={{ height: "5vh" }}>
                        <Typography variant="button">add button</Typography>
                      </CardContent>
                    </Grid>
                  </Grid> */}
                </Box>

                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Pagination
                    count={10}
                    color="primary"
                    onChange={handleChange}
                  />
                </CardActions>
              </Grid>
            </Card>
          </Fade>
        </Modal>
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
      >
        {data.length ? (
          data.map((singleData) => {
            console.log("singleData", singleData);
            // if (!singleData.isDeleted) {
            return (
              <Grid key={Math.random()} item xs={6} md={3} padding={1}>
                <Box>
                  <Stack sx={{ height: "100%" }}>
                    <Card
                      sx={{
                        width: "100%",
                        aspectRatio: "1/1",
                        flexGrow: 1,
                        backgroundColor: "gray",
                      }}
                    >
                      <ClearIcon
                        onClick={() => handleClick(singleData._id)}
                        style={{
                          cursor: "pointer",
                        }}
                        sx={{
                          position: "absolute",
                          color: "white",
                          fontSize: "2rem",
                        }}
                      />
                      <CardMedia
                        component="img"
                        height="100%"
                        image={`https://finalbe-production.up.railway.app/static/image/${singleData.album}.jpg`}
                      />
                    </Card>
                    <Box sx={{ width: "100%" }}>
                      <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={0.5}
                        sx={{ padding: "0.5rem" }}
                      >
                        <Typography
                          variant="button"
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleArtistBio(`${singleData.artistRef._id}`)
                          }
                        >
                          {singleData.artistName}
                        </Typography>
                        <Typography
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => handleAlbumInfo(`${singleData._id}`)}
                          sx={{ textAlign: "center" }}
                          variant="h1"
                        >
                          {singleData.album}
                        </Typography>
                        {/* <Typography variant="button">rock</Typography>
                          <Typography variant="body1">1995</Typography> */}
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              </Grid>
            );
            // }
          })
        ) : (
          <Grid item xs={12} md={12}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="50vh"
            >
              <Typography variant="h7" align="center">
                no content yet
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
      {/* <Button sx={{ color: "black" }} onClick={handleOpen}>
        click here for second modal
      </Button> */}
    </Box>
  );
}

export default PlaylistContent;
