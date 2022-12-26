import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import "./styles.css";
import ArtistAvatar from "../components/item/ArtistAvatar";
import ArtistBio from "../components/item/ArtistBio";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getArtist, getContent } from "../features/content/contentSlice";
function ArtistPage() {
  // const [data, setdata] = useState(second)
  const param = useParams();
  const artistId = param.id;
  const dispatch = useDispatch();
  const listArtist = useSelector((state) => state.content.artists);

  useEffect(() => {
    dispatch(getArtist());
  }, [dispatch]);

  console.log("artist Id", artistId);
  console.log("listArtist", listArtist);
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
      {listArtist &&
        listArtist[0]?.data.data?.map((singleArtist) => {
          if (singleArtist._id === artistId) {
            return (
              <Grid key={Math.random()} container sx={{ height: "100%" }}>
                <Grid item xs={12} md={4}>
                  <ArtistAvatar bio={singleArtist} type="artist" />
                </Grid>
                <Grid item xs={12} md={8}>
                  <ArtistBio bio={singleArtist} />
                </Grid>
              </Grid>
            );
          }
        })}
    </Container>
  );
}

export default ArtistPage;
