// import "./styles.css";
import React from "react";
import { Box, Card, Grid, Paper, styled, Badge } from "@mui/material";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import Popover from "@mui/material/Popover";

import { getContent } from "../../features/content/contentSlice";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
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
    navigate(`/album/result/${artistId}`);
  };

  // const [query, setQuery] = useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    console.log("event.currentTarget", event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  /* ------------------------------ custom badge ------------------------------ */
  const SquareBadge = styled(Badge)(({ theme }) => ({
    position: "absolute",
    padding: "0.6rem",
    // opacity: 0.5,
    // margin: "0.7rem",

    width: "20px", // Set the desired width
    height: "20px", // Set the desired height
    borderRadius: "0", // Set the border radius to 0 for square shape
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
    color: "white", // Set the desired text color
    fontWeight: "bold", // Set the desired font weight
  }));

  return (
    <Grid item xs={6} md={4} padding={1}>
      <Box sx={{}}>
        <Stack sx={{ height: "100%" }}>
          <Card
            sx={{
              position: "relative",
              width: "100%",
              aspectRatio: "1/1",
              flexGrow: 1,
              backgroundColor: "gray",
            }}
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            <SquareBadge sx={{ bgcolor: "primary.main" }}>
              <Typography variant="button">{album.ranking}</Typography>
            </SquareBadge>
            <CardMedia
              component="img"
              height="100%"
              style={{
                cursor: "pointer",
              }}
              image={`https://110albumbe-production.up.railway.app/static/image/${album.album}.jpg`}
              // aria-owns={open ? "mouse-over-popover" : undefined}
              // aria-haspopup="true"
              onClick={() => handleAlbumInfo(`${album._id}`)}
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
              <Typography
                // sx ={{padding:"2rem"}}
                sx={
                  {
                    // marginBottom: "0.5rem",
                  }
                }
                style={{
                  cursor: "pointer",
                }}
                onClick={() => handleAlbumInfo(`${album._id}`)}
                variant="button"
              >
                {album.album}
              </Typography>

              <Typography
                sx={{ paddingBottom: "0.2rem" }}
                onClick={() => handleArtistBio(`${album.artistRef._id}`)}
                variant="body2"
                style={{
                  cursor: "pointer",
                }}
              >
                {album.artistName}
              </Typography>
              {/* <Typography variant="body1">{album.ranking}</Typography> */}
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: "none",
                  // width:"200px"
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Typography sx={{ p: 1 }}>{album.album}</Typography>
                <Typography sx={{ p: 1 }}>{album.releaseDate}</Typography>
              </Popover>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Grid>
  );
}

export default SingleAlbum;

// import * as React from 'react';

// export default function MouseOverPopover() {
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handlePopoverOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handlePopoverClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);

//   return (
//     <div>
//       <Typography
//         aria-owns={open ? 'mouse-over-popover' : undefined}
//         aria-haspopup="true"
//         onMouseEnter={handlePopoverOpen}
//         onMouseLeave={handlePopoverClose}
//       >
//         Hover with a Popover.
//       </Typography>
{
  /* <Popover
  id="mouse-over-popover"
  sx={{
    pointerEvents: "none",
  }}
  open={open}
  anchorEl={anchorEl}
  anchorOrigin={{
    vertical: "bottom",
    horizontal: "left",
  }}
  transformOrigin={{
    vertical: "top",
    horizontal: "left",
  }}
  onClose={handlePopoverClose}
  disableRestoreFocus
>
  <Typography sx={{ p: 1 }}>I use Popover.</Typography>
</Popover>; */
}
//     </div>
//   );
// }
