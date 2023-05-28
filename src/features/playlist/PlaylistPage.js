import React from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Paper,
} from "@mui/material";

const PlaylistPage = () => {
  const artistArray = ["Artist 1", "Artist 2", "Artist 3"];

  const playlistArray = [
    {
      imageUrl: "https://picsum.photos/300/300.jpg?random=1",
      playlistName: "Playlist 1",
      playlistCreator: "Creator 1",
    },
    {
      imageUrl: "https://picsum.photos/300/300.jpg?random=2",
      playlistName: "Playlist 2",
      playlistCreator: "Creator 2",
    },
    {
      imageUrl: "https://picsum.photos/300/300.jpg?random=3",
      playlistName: "Playlist 3",
      playlistCreator: "Creator 3",
    },
    {
      imageUrl: "https://picsum.photos/300/300.jpg?random=4",
      playlistName: "Playlist 4",
      playlistCreator: "Creator 4",
    },
  ];

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} xl={4}>
          <Card
            sx={{
              backgroundColor: "#5DDF2A",
              height: "100%",
              borderRadius: "0.5rem",
              "@media screen and (max-width: 900px)": { height: "40vh" },
            }}
          >
            <CardContent>
              {artistArray.map((artist, index) => (
                <Typography key={index} variant="h1">
                  {artist}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {playlistArray.map((playlist, index) => (
          <Grid key={index} item xs={12} sm={6} md={3} xl={2}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: "0.5rem",
                cursor: "pointer",
                minHeight: "35vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
            >
              <CardMedia
                component="img"
                src={playlist.imageUrl}
                sx={{ margin: "1rem" }}
                style={{
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
                  width: "90%",
                  aspectRatio: "1/1",
                  objectFit: "cover",
                  borderRadius: "0.5rem",
                }}
              />
              <CardContent style={{ textAlign: "center" }}>
                <Typography variant="h1">{playlist.playlistName}</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {playlist.playlistCreator}
                </Typography>
              </CardContent>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PlaylistPage;
