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

function Homepage() {
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  const [page, setPage] = React.useState(1);
  const [listAllAlbum, setListAllAlbum] = React.useState([]);
  const [albumRate, setAlbumRate] = React.useState(null);

  const listAlbum = useSelector((state) => state.content.contents);

  useEffect(() => {
    if (listAlbum && listAlbum.length > 0) {
      setListAllAlbum(listAlbum);
      // listAlbum[listAlbum.length - 1].data.data[0]
      if (listAlbum[listAlbum.length - 1]) {
        const rate = listAlbum[listAlbum.length - 1];
        if (rate?.data?.data && rate?.data?.data[0]) {
          setAlbumRate(rate.data.data[0])
        }
      }
    }
  }, [listAlbum]);

  useEffect(() => {
    setData(dispatch(getContent({ page })));
    // dispatch(getContent({ page }));
  }, [dispatch, page]);

  console.log("albums", listAlbum);

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
          {listAlbum && (
            <NumberOneAlbum
              albums={albumRate}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {listAlbum && (
            <AlbumRanking
              key={Math.random()}
              albums={listAllAlbum}
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
