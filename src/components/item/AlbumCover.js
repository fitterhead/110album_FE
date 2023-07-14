import React from "react";
import { Box, Container, Stack } from "@mui/system";
import { Paper } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { addAlbumToPlaylist } from "../../features/content/contentSlice";
import { favouriteArtist } from "../../features/content/contentSlice";
import CardMedia from "@mui/material/CardMedia";
import BackendModal from "./BackendModel";

function AlbumCover({ bio, type }) {
  console.log("bio", bio);
  console.log("type", type);
  const dispatch = useDispatch();
  return (
    <Stack
      sx={{ backgroundColor: "#F2F2F2", padding: "1rem", height: "100%" }}
      direction="column"
      //   justifyContent="space-around"
      alignItems="center"
      spacing={2}
    >
      <Card
        sx={{
          width: "100%",
          maxHeight: "600px",
          backgroundColor: "yellow",
        }}
      >
        <CardMedia
          component="img"
          height="100%"
          image={`https://110albumbe-production.up.railway.app/static/image/${bio.album}.jpg`}
        />
      </Card>
      <Box>
        <BackendModal />
      </Box>
    </Stack>
  );
}

export default AlbumCover;
