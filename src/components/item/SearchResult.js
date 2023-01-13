import React from "react";
import { Box, Card, Grid, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";

function SearchResult({ data, input }) {
  console.log("data of search result", data);
  console.log("input of search result", input);
  const navigate = useNavigate();

  const handleArtistBio = (artistId) => {
    navigate(`/artist/findArtistById/${artistId}`);
  };

  const handleAlbumInfo = (artistId) => {
    navigate(`/album/findAlbumById/${artistId}`);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
      >
        {/* data
            .filter((typedValue) => {
              if (input === "") {
                return null;
              } else if (
                typedValue.album.toLowerCase().includes(input.toLowerCase())
              ) {
                return typedValue;
              }
            })
            . */}
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
                        <CardMedia
                          component="img"
                          height="100%"
                          image={`http://localhost:8000/static/image/${singleData.album}.jpg`}
                          onClick={() => handleAlbumInfo(`${singleData._id}`)}
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
                            onClick={() =>
                              handleArtistBio(`${singleData.artistRef._id}`)
                            }
                          >
                            {singleData.artistName}
                          </Typography>
                          <Typography
                            sx={{ textAlign: "center" }}
                            variant="h1"
                            onClick={() => handleAlbumInfo(`${singleData._id}`)}
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
