import { Button, Grid } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import "./styles.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getContent } from "../features/content/contentSlice";
import AlbumCover from "../components/item/AlbumCover";
import AlbumInfo from "../components/item/AlbumInfo";
function AlbumPage() {
  const param = useParams();
  const albumId = param.id;
  const dispatch = useDispatch();
  const listAlbum = useSelector((state) => state.content.contents);

  useEffect(() => {
    dispatch(getContent());
  }, [dispatch]);

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
      {listAlbum &&
        listAlbum[0]?.data.data?.map((singleAlbum) => {
          if (singleAlbum._id === albumId) {
            return (
              <Grid key={Math.random()} container sx={{ height: "100%" }}>
                <Grid item xs={12} md={4}>
                  <AlbumCover bio={singleAlbum} type="album" />
                </Grid>
                <Grid item xs={12} md={8}>
                  <AlbumInfo bio={singleAlbum} />
                </Grid>
              </Grid>
            );
          }
        })}
    </Container>
  );
}

export default AlbumPage;
