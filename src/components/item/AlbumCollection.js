import React, { useEffect } from "react";
import { Box, Card, Container, Grid, Paper } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getAlbumOfTheSameArtist } from "../../features/content/contentSlice";

function AlbumCollection({ artistId }) {
  const listAlbum = useSelector(
    (state) => state.content?.similarAlbums[0]?.data?.data
  );
  console.log("genre", artistId);
  console.log("listAlbum", listAlbum);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAlbumOfTheSameArtist(artistId));
    console.log("artist Id data");
  }, [artistId]);

  return (
    <Box sx={{ overflow: "scroll" }}>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
        sx={{
          flexWrap: "nowrap",
          width: "fit-content",
          padding: "0rem 0rem 2rem 0rem",
        }}
      >
        {listAlbum &&
          listAlbum.map((album,i) => {
            return (
              <Box key = {i} sx={{ height: "200px", width: "200px", key: Math.random() }}>
                <Stack sx={{ height: "100%", position: "relative" }}>
                  <Card
                    sx={{
                      width: "100%",
                      aspectRatio: "1/1",
                      flexGrow: 1,
                      backgroundColor: "gray",
                      display: "block",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="100%"
                      image={`http://localhost:8000/static/image/${album.album}.jpg`}
                    />
                  </Card>
                  <Box
                    sx={{ width: "100%", position: "absolute", bottom: "0" }}
                  >
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      spacing={0.5}
                      sx={{ padding: "0.5rem" }}
                    >
                      <Typography
                        sx={{ textAlign: "center", color: "white" }}
                        variant="h1"
                      >
                        {album.album}
                      </Typography>
                      <Typography sx={{ color: "white" }} variant="button">
                        {album.releaseDate}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            );
          })}
      </Stack>
    </Box>
  );
}

export default AlbumCollection;
