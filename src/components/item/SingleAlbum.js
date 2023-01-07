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
    navigate(`/artist/findArtistById/${artistId}`);
  };

  const handleAlbumInfo = (artistId) => {
    navigate(`/album/findAlbumById/${artistId}`);
    // dispatch(getContent({ query: artistId }));
  };

  // const [query, setQuery] = useState("");

  return (
    <Grid item xs={6} md={4} padding={1}>
      <Box
        sx={
          {
            // marginTop: "0vh",
            // minHeight: "30vh",
            // marginBottom: "30px",
          }
        }
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
            <Stack
              spacing={0.1}
              sx={{
                padding: "0.5rem",
                // marginBottom:"10vh"
              }}
            >
              <Typography sx={{ paddingBottom: "0.2rem" }} variant="body1">
                {album.ranking}
              </Typography>
              <Typography
                sx={{ paddingBottom: "0.2rem" }}
                onClick={() => handleArtistBio(`${album.artistRef._id}`)}
                variant="body2"
              >
                {/* <Button onClick={() => setQuery("superman")}>test</Button> */}
                {album.artistName}
              </Typography>
              <Typography
                // sx ={{padding:"2rem"}}
                sx={{
                  marginBottom: "1rem",
                }}
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
