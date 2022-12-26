import { Box, Grid, Paper } from "@mui/material";
import { Container, Stack } from "@mui/system";
import React from "react";
import AlbumRanking from "../components/form/AlbumRanking";
import NumberOneAlbum from "../components/form/NumberOneAlbum";
import { getContent } from "../features/content/contentSlice";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import "./styles.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Homepage() {
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  
  const listAlbum = useSelector((state) => state.content.contents);

  useEffect(() => {
    setData(dispatch(getContent()));
  }, [ dispatch]);

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
          
      <Grid container sx={{ backgroundColor: "red" }}>
        <Grid item xs={12} md={6}>
          <NumberOneAlbum />
        </Grid>
        <Grid item xs={12} md={6}>
          {listAlbum && <AlbumRanking key={Math.random()} albums={listAlbum} />}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Homepage;
