import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import SingleAlbum from "./SingleAlbum";
function AlbumList({ album }) {
  console.log("album List album", album);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid item xs={6} md={4} padding={1}>
          {album.map((eachAlbum) => {
            return (
            <SingleAlbum album = {eachAlbum}/>
              // <Box>
              //   <Stack sx={{ height: "100%" }}>
              //     <Box
              //       sx={{
              //         width: "100%",
              //         aspectRatio: "1/1",
              //         flexGrow: 1,
              //         backgroundColor: "gray",
              //       }}
              //     >
              //       aaa
              //     </Box>
              //     <Box sx={{ width: "100%" }}>
              //       <Stack spacing={0.1} sx={{ padding: "0.5rem" }}>
              //         <Typography variant="body2">{album.title}</Typography>
              //         <Typography variant="button">{album.author}</Typography>
              //         <Typography variant="body1">1995</Typography>
              //       </Stack>
              //     </Box>
              //   </Stack>
              // </Box>
            );
          })}
          {/* <Box>
            <Stack sx={{ height: "100%" }}>
              <Box
                sx={{
                  width: "100%",
                  aspectRatio: "1/1",
                  flexGrow: 1,
                  backgroundColor: "gray",
                }}
              >
                aaa
              </Box>
              <Box sx={{ width: "100%" }}>
                <Stack spacing={0.1} sx={{ padding: "0.5rem" }}>
                  <Typography variant="body2">title</Typography>
                  <Typography variant="button">author</Typography>
                  <Typography variant="body1">1995</Typography>
                </Stack>
              </Box>
            </Stack>
          </Box> */}
        </Grid>
        {/* <Grid item xs={6} md={4} padding={1}>
          <Box>
            <Stack sx={{ height: "100%" }}>
              <Box
                sx={{
                  width: "100%",
                  aspectRatio: "1/1",
                  flexGrow: 1,
                  backgroundColor: "gray",
                }}
              >
                aaa
              </Box>
              <Box sx={{ width: "100%" }}>
                <Stack spacing={0.1} sx={{ padding: "0.5rem" }}>
                  <Typography variant="body2">radiohead</Typography>
                  <Typography variant="button">OK COMPUTER</Typography>
                  <Typography variant="body1">1995</Typography>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={6} md={4} padding={1}>
          <Box>
            <Stack sx={{ height: "100%" }}>
              <Box
                sx={{
                  width: "100%",
                  aspectRatio: "1/1",
                  flexGrow: 1,
                  backgroundColor: "gray",
                }}
              >
                aaa
              </Box>
              <Box sx={{ width: "100%" }}>
                <Stack spacing={0.1} sx={{ padding: "0.5rem" }}>
                  <Typography variant="body2">radiohead</Typography>
                  <Typography variant="button">OK COMPUTER</Typography>
                  <Typography variant="body1">1995</Typography>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Grid> */}
      </Grid>
    </Box>
  );
}

export default AlbumList;
