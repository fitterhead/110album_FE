import React from "react";
import { Box, Card, Grid, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";

import { getContent } from "../../features/content/contentSlice";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
// import "./styles.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function SingleAlbum({ album }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // tao handle click function
  const handleArtistBio = (artistId) => {
    navigate(`/artist/${artistId}`);
  };

  const handleAlbumInfo = (artistId) => {
    navigate(`/album/${artistId}`);
    // dispatch(getContent({ query: artistId }));
  };

  // const [query, setQuery] = useState("");

  return (
    <Grid item xs={6} md={4} padding={1}>
      <Box
        sx={{
          minHeight: "35vh",
          "@media screen and (max-width: 1400px)": { minHeight: "32vh" },
        }}
      >
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
              image={`http://localhost:8000/static/image/${album.album}.jpg`}
            />
          </Card>
          <Box sx={{ width: "100%" }}>
            <Stack spacing={0.1} sx={{ padding: "0.5rem" }}>
              <Typography variant="body1">{album.ranking}</Typography>
              <Typography
                onClick={() => handleArtistBio(`${album.artistRef._id}`)}
                variant="body2"
              >
                {/* <Button onClick={() => setQuery("superman")}>test</Button> */}
                {album.artistName}
              </Typography>
              <Typography
                // sx ={{padding:"2rem"}}
                onClick={() => handleAlbumInfo(`${album._id}`)}
                variant="button"
              >
                {album.album}
              </Typography>
              {/* <Typography variant="body1">{album.ranking}</Typography> */}
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Grid>
  );
}

export default SingleAlbum;
