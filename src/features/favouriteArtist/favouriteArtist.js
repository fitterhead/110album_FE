import { Grid } from "@mui/material";
import { Container, Stack, Box } from "@mui/system";
import React from "react";
import Typography from "@mui/material/Typography";
import ResultList from "../../components/item/ResultList";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getFavouriteArtistList } from "../content/contentSlice";

function FavouriteArtist() {
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  const favouriteArtist = useSelector((state) => state.content.favouriteArtist);

  useEffect(() => {
    setData(dispatch(getFavouriteArtistList()));
  }, [dispatch]);

  return (
    <Container
      maxWidth="false"
      sx={{
        flexGrow: 1,
        maxWidth: "1344px",
        padding: "2rem",
        "@media screen and (max-width: 600px)": { padding: "0rem" },
      }}
    >
      <Stack sx={{ bgcolor: "primary.main" }} spacing={2}>
        <Box
          sx={{
            padding: "1rem 0.5rem 0rem 0.5rem",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="h1">Playlist</Typography>
        </Box>
        <ResultList data={favouriteArtist} />
      </Stack>
    </Container>
  );
}

export default FavouriteArtist;
