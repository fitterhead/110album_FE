import { Box, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Container, Stack } from "@mui/system";
import React from "react";
import HomepagePagination from "../item/HomepagePagination";
import AlbumList from "../item/AlbumList";
import SingleAlbum from "../item/SingleAlbum";
function AlbumRanking({ albums }) {
  console.log("listAlbum2", albums);
  // albums = albums[0].data.data
  return (
    <Container sx={{ bgcolor: "primary.main", height: "100%" }}>
      <Stack
        spacing={2}
        sx={{
          padding: "1rem 0rem 1rem 0rem",
          height: "100%",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
          >
            {albums[0]?.data.data?.map((album, index) => {
              if (index <= 110) {
                return <SingleAlbum key={Math.random()} album={album} />;
              }
            })}
          </Grid>
        </Box>
        <Container
          sx={{
            // backgroundColor: "red",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <HomepagePagination />
        </Container>
      </Stack>
    </Container>
  );
}

export default AlbumRanking;
