import React, { useEffect } from "react";
import { Box, Card, Grid, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import ClearIcon from "@mui/icons-material/Clear";
import { deleteAlbumFromAPlaylist } from "../../features/playlist/playlistSlice";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSinglePlaylist } from "../../features/playlist/playlistSlice";
import { useSelector } from "react-redux";
function PlaylistContent({ data }) {
  const dispatch = useDispatch();
  const params = useParams();
  const handleClick = (e) => {
    // e.preventDefault();

    dispatch(deleteAlbumFromAPlaylist({ albumId: e, playlistId: params.id }));

    // console.log({ playlistId: e, albumId: params.id }, "test");
    // alert(e);
    // setPlaylistName("");
  };

  // const singlePlaylist = useSelector(
  //   (state) => state.content?.playlist.singlePlaylist
  // );
  // useEffect(() => {
  //   dispatch(getSinglePlaylist(params.id));
  // }, [dispatch]);

  console.log("playlist content data", data);

  return (
    <Box sx={{ flexGrow: 1 }}>
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
                        <Typography variant="button">
                          {singleData.artistName}
                        </Typography>
                        <Typography sx={{ textAlign: "center" }} variant="h1">
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
              <Typography variant="h1" align="center">
                no content yet
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default PlaylistContent;
