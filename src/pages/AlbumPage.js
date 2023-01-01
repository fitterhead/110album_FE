import { Button, Grid } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import "./styles.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAlbums, getContent } from "../features/content/contentSlice";
import AlbumCover from "../components/item/AlbumCover";
import AlbumInfo from "../components/item/AlbumInfo";

function AlbumPage() {
  const param = useParams();
  const albumId = param.id;
  console.log("albumId", albumId);
  const dispatch = useDispatch();
  const listAlbum = useSelector((state) => state.content?.albums[0]?.data.data);
  console.log("listAlbum", listAlbum);
  useEffect(() => {
    dispatch(getAlbums({ albumId }));
  }, [dispatch, albumId]);

  return (
    <Container
      maxWidth="false"
      sx={{
        flexGrow: 1,
        maxWidth: "1344px",
        padding: "2rem",
        "@media screen and (max-width: 820px)": { padding: "0rem" },
      }}
    >
      {listAlbum && (
        <Grid key={Math.random()} container sx={{ height: "100%" }}>
          <Grid item xs={12} md={4}>
            <AlbumCover bio={listAlbum} type="album" />
          </Grid>
          <Grid item xs={12} md={8}>
            <AlbumInfo bio={listAlbum} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default AlbumPage;
