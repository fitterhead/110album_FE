import React from "react";
import { Box, Card, Grid, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import { deletePlaylist } from "../../features/playlist/playlistSlice";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { useRef, useEffect } from "react";

function ResultList({ data, setRender }) {
  /* ---------------------------------- data ---------------------------------- */

  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /* -------------------------------- function -------------------------------- */
  const handleClick = (playlistId) => {
    // alert(playlistId);
    console.log("handleClick PlaylistId", playlistId);
    dispatch(deletePlaylist({ playlistId, userId: user._id }));
  };

  console.log("data playlist", data);

  /* ------------------------- record component width ------------------------- */

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        padding={2}
        spacing={2}
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        alignContent="center"
      >
        {data &&
          data.map((singleData) => {
            if (!singleData.isDeleted && !singleData.songExisted) {
              console.log(singleData, "singleData result");

              return (
                <Grid key={Math.random()} item xs={12} sm={6} md={6} lg={4}>
                  <Box>
                    <Stack sx={{ height: "100%" }}>
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
                      <Card
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setRender(singleData.playlistName);
                          navigate(`/library/${singleData._id}`);
                        }}
                        sx={{
                          minWidth: 200,
                          aspectRatio: "1/1",
                          backgroundColor: "gray",
                        }}
                      >
                        <Grid container spacing={1} sx={{ height: "100%" }}>
                          {singleData.albumRef
                            .slice(0, 4)
                            .map((item, index) => {
                              return (
                                <Grid item xs={6} sm={6} sx={{ height: "50%" }}>
                                  <CardMedia
                                    component="img"
                                    image={
                                      item.album
                                        ? `https://finalbe-production.up.railway.app/static/image/${item.album}.jpg`
                                        : null
                                    }
                                    alt={`Image ${index + 1}`}
                                    sx={{
                                      width: "100%",
                                      height: "100%",
                                    }}
                                  />
                                </Grid>
                              );
                            })}
                        </Grid>
                      </Card>

                      <Box sx={{ minWidth: 300 }}>
                        <Stack
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          spacing={0.5}
                          sx={{ padding: "0.5rem" }}
                        >
                          <Typography
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              setRender(singleData.playlistName);
                              navigate(`/account/${singleData._id}`);
                            }}
                            variant="h1"
                          >
                            {singleData.playlistName}
                          </Typography>
                          <Typography
                            sx={{ textAlign: "center" }}
                            variant="body3"
                          >
                            {singleData.albumRef.length} item
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>
                </Grid>
              );
            }
          })}
      </Grid>
    </Box>
  );
}

export default ResultList;
