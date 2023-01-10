import React from "react";
import { Box, Card, Grid, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

function SearchResult({ data, input }) {
  console.log("data of search result", data);
  console.log("input of search result", input);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
      >
        {data &&
          data
            .filter((typedValue) => {
              if (input === "") {
                return typedValue;
              } else if (
                typedValue.album.toLowerCase().includes(input.toLowerCase())
              ) {
                return typedValue;
              }
            })
            .map((singleData) => {
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
                          <CardMedia
                            component="img"
                            height="100%"
                            image={`http://localhost:8000/static/image/${singleData.album}.jpg`}
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
                            <Typography
                              sx={{ textAlign: "center" }}
                              variant="h1"
                            >
                              {singleData.album}
                            </Typography>
                            <Typography variant="button">
                              {singleData.genre}
                            </Typography>
                            <Typography variant="body1">
                              {singleData.releaseDate}
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

export default SearchResult;
