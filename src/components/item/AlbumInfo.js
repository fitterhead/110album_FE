import { Box, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Container, Stack } from "@mui/system";
import React from "react";
import HomepagePagination from "./HomepagePagination";
import ItemCarousel from "./ItemCarousel";
import MusicPlayer from "../form/MusicPlayer";
import PlayerWidget from "../../features/song/PlayerWidget";
import { useDispatch, useSelector } from "react-redux";

function AlbumInfo({ bio }) {
  console.log(bio, "biooooooo");
  const songList = useSelector((state) => state.song?.song);
  console.log(songList, "songList");

  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        height: "100%",
        // padding:"0rem"
      }}
    >
      <Stack
        sx={{
          padding: "1rem 0rem 1rem 0rem",
          height: "100%",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Stack spacing={0.1} sx={{ padding: "2rem" }}>
            <Typography
              style={{
                cursor: "pointer",
              }}
              variant="button"
            >
              {bio.artistName}
            </Typography>
            <Typography variant="h1">{bio.album}</Typography>
            {/* <Typography variant="h1">1995</Typography> */}
          </Stack>
        </Box>
        <Box sx={{ backgroundColor: "#F2F2F2", width: "100%" }}>
          <Stack
            spacing={1}
            sx={{
              padding: "2rem 15rem 2rem 2rem",
                "@media screen and (max-width: 600px)": { padding: "2rem" },
            }}
          >
            <Typography variant="h7">Description</Typography>
            <Typography variant="body3">{bio.description}</Typography>
          </Stack>
        </Box>
        <Box sx={{ backgroundColor: "#F2F2F2", width: "100%" }}>
          <Stack
            spacing={1}
            sx={{
              padding: "2rem 0rem 2rem 0rem",
              "@media screen and (max-width: 600px)": {
                padding: "2rem 0rem 2rem 0rem",
              },
            }}
          >
            {/* <MusicPlayer /> */}
            <PlayerWidget songs={songList} page={"Album"} />
          </Stack>
        </Box>
        <Box sx={{ flexGrow: 1, height: "100%" }}>
          <Stack spacing={1} padding="2rem">
            <Typography variant="h1">Similar Albums</Typography>
            <ItemCarousel genre={bio.genre} />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default AlbumInfo;
