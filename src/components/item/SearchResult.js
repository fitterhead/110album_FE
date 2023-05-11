import React from "react";
import { Box, Card, Grid, Paper, Badge, styled } from "@mui/material";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";

function SearchResult({ data, input }) {
  console.log("data of search result", data);
  console.log("input of search result", input);
  const navigate = useNavigate();

  const handleArtistBio = (artistId) => {
    navigate(`/artist/${artistId}`);
  };

  const handleAlbumInfo = (artistId) => {
    navigate(`/album/result/${artistId}`);
  };

  const SquareBadge = styled(Badge)(({ theme }) => ({
    position: "absolute",
    padding: "1.2rem",
    opacity: 0.5,
    // margin: "0.7rem",
    width: "20px", // Set the desired width
    height: "20px", // Set the desired height
    borderRadius: "0", // Set the border radius to 0 for square shape
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5DDF2A",
    color: "white", // Set the desired text color
    fontWeight: "bold", // Set the desired font weight
  }));

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
                          position: "relative",
                          width: "100%",
                          aspectRatio: "1/1",
                          flexGrow: 1,
                          backgroundColor: "gray",
                        }}
                      >
                        <SquareBadge>
                          <Typography variant="button">
                            {singleData.ranking}
                          </Typography>
                        </SquareBadge>

                        <CardMedia
                          component="img"
                          height="100%"
                          image={`https://befinal-production.up.railway.app/static/image/${singleData.album}.jpg`}
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
                          <Typography variant="body3">
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
