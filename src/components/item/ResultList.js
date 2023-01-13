import React from "react";
import { Box, Card, Grid, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";

function ResultList({ data, setRender }) {
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
                        {/* <CardMedia
                          component="img"
                          height="100%"
                          image={`http://localhost:8000/static/image/${singleData.album}.jpg`}
                        /> */}
                        aaa
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
                          <Typography variant="button">rock</Typography>
                          <Typography variant="body1">1995</Typography>
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
