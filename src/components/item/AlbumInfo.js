import { Box, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Container, Stack } from "@mui/system";
import React from "react";
import HomepagePagination from "./HomepagePagination";
import ItemCarousel from "./ItemCarousel";
function AlbumInfo({ bio }) {
  console.log(bio, "biooooooo");
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        height: "100%",
        // padding:"0rem"
      }}
    >
      <Stack
        spacing={2}
        sx={{
          padding: "1rem 0rem 1rem 0rem",
          height: "100%",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Stack spacing={0.1} sx={{ padding: "2rem" }}>
            {/* <Typography variant="h2">OK COMPUTER</Typography> */}
            <Typography variant="button">{bio.artistName}</Typography>
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
        <Box sx={{ flexGrow: 1, height: "100%" }}>
          <Stack spacing={1} padding="2rem">
            <Typography variant="h1">Similar Artist</Typography>
            <ItemCarousel />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default AlbumInfo;
