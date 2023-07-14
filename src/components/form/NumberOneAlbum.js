import React from "react";
import { Box, Container, Stack } from "@mui/system";
import { Paper } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getContent } from "../../features/content/contentSlice";
import { useDispatch } from "react-redux";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router-dom";
function NumberOneAlbum({ albums }) {
  const navigate = useNavigate();

  const handleAlbumInfo = (artistId) => {
    navigate(`/album/result/${artistId}`);
  };

  const handleArtistBio = (artistId) => {
    navigate(`/artist/${artistId}`);
  };

  return (
    albums && (
      <Stack
        sx={{ backgroundColor: "#F2F2F2", padding: "1rem", height: "100%" }}
        direction="column"
        //   justifyContent="space-around"
        alignItems="center"
        spacing={2}
      >
        <Card
          onClick={() => handleAlbumInfo(`${albums._id}`)}
          sx={{
            width: "100%",
            maxHeight: "600px",
            aspectRatio: "1/1",
            // maxHeight: "600px",
            // maxWidth: "600px",
            backgroundColor: "yellow",
          }}
          style={{
            cursor: "pointer",
          }}
        >
          <CardMedia
            component="img"
            height="100%"
            image={`https://110albumbe-production.up.railway.app/static/image/${albums.album}.jpg`}
          />
        </Card>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                variant="h1"
                color="text.secondary"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => handleArtistBio(`${albums.artistRef._id}`)}

                //   gutterBottom
              >
                {/* radiohead */}
                {albums.artistName}
              </Typography>
              <Typography
                variant="h7"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => handleAlbumInfo(`${albums._id}`)}

                // component="div"
              >
                {/* OK COMPUTER */}
                {albums.album.toUpperCase()}
              </Typography>
              <Typography variant="h1">
                {/* 1995 */}
                {albums.releaseDate}
              </Typography>
            </CardContent>
            {/* <Box sx={{flexGrow:1,height:"2rem"}}></Box> */}
            <CardActions>
              <Button
                // onClick={() => {
                //   dispatch(getContent());
                //   console.log("clicked", dispatch(getContent()));
                // }}
                style={{
                  cursor: "pointer",
                }}
                onClick={() => handleAlbumInfo(`${albums._id}`)}
                size="small"
              >
                Learn More
              </Button>
            </CardActions>
          </Box>
        </Box>
      </Stack>
    )
  );
}

export default NumberOneAlbum;
