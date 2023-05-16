import React from "react";
import { Box, Card, Grid, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import ClearIcon from "@mui/icons-material/Clear";
import { deleteAlbumFromAPlaylist } from "../../features/playlist/playlistSlice";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSinglePlaylist } from "../../features/playlist/playlistSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function PlaylistContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  console.log("param playlistContent", params);
  const singlePlaylist = useSelector((state) => state.playlist?.singlePlaylist);
  // const refinedPlaylist = [...new Set(singlePlaylist)];

  const refinedPlaylist = singlePlaylist.filter(
    (obj, index, self) => index === self.findIndex((o) => o._id === obj._id)
  );
  console.log(" refinedPlaylist singlePlaylist", refinedPlaylist);
  const handleClick = (e) => {
    // e.preventDefault();

    dispatch(deleteAlbumFromAPlaylist({ albumId: e, playlistId: params.id }));
    // console.log({ playlistId: e, albumId: params.id }, "test");
    // alert(e);
    // setPlaylistName("");
  };

  useEffect(() => {
    dispatch(getSinglePlaylist(params.id));
  }, [dispatch]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
      >
        {refinedPlaylist ? (
          refinedPlaylist.map((singleData) => {
            console.log("singleData", singleData);
            if (!singleData.isDeleted) {
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
                          style={{
                            cursor: "pointer",
                          }}
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
                          <Typography
                            variant="button"
                            style={{
                              cursor: "pointer",
                            }}
                          >
                            {singleData.artistName}
                          </Typography>
                          <Typography
                            style={{
                              cursor: "pointer",
                            }}
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
            }
          })
        ) : (
          <Typography variant="body2">no content yet</Typography>
        )}
      </Grid>
    </Box>
  );
}

export default PlaylistContent;
