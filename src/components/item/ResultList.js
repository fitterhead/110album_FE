import React from "react";
import { Box, Card, Grid, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import { deletePlaylist } from "../../features/playlist/playlistSlice";
import { useDispatch } from "react-redux";

function ResultList({ data, setRender }) {
  const dispatch = useDispatch();
  const handleClick = (playlistId) => {
    // alert(playlistId);
    dispatch(deletePlaylist(playlistId));
  };

  console.log("data playlist", data);
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
      >
        {data &&
          data.map((singleData) => {
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
                          onClick={(e) => handleClick(singleData._id)}
                          sx={{ color: "white" }}
                        />
                        {/* <CardMedia
                          component="img"
                          height="100%"
                          image={`http://localhost:8000/static/image/${singleData.album}.jpg`}
                        /> */}
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
                            onClick={() => {
                              setRender(singleData.playlistName);
                              navigate(`/account/${singleData._id}`);
                            }}
                            variant="button"
                          >
                            {singleData.playlistName}
                          </Typography>
                          <Typography sx={{ textAlign: "center" }} variant="h1">
                            {singleData.title}
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
