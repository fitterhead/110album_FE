import { Box, Grid, Paper, Typography } from "@mui/material";
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
import useAuth from "../hooks/useAuth";
import Recommendation from "../components/item/Recommendation";
import { styled } from "@mui/material/styles";
import { useRef } from "react";
import { Card } from "@mui/material";
// import { motion } from "framer-motion";

function Homepage() {
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  const [page, setPage] = React.useState(1);
  const listAlbum = useSelector((state) => state.content.contents);
  const { user } = useAuth();
  useEffect(
    () => {
      setData(dispatch(getContent({ page })));
    },
    //  [page]);
    [dispatch, page]
  );

  /* --------------------------- check time function -------------------------- */
  const currentTime = new Date().getHours();

  let greeting = "";

  if (currentTime >= 5 && currentTime < 12) {
    greeting = "Good morning";
  } else if (currentTime >= 12 && currentTime < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }


  
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          
        </Grid>
        <Grid item xs={12}>
          {user ? <Recommendation /> : null}
        </Grid>

        <Grid item xs={12} md={6}>
          {listAlbum && (
            <NumberOneAlbum
              albums={listAlbum[listAlbum.length - 1]?.data?.data[0]}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {listAlbum && (
            <AlbumRanking
              key={Math.random()}
              albums={listAlbum}
              setPage={setPage}
              page={page}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Homepage;
