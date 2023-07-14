import React, { useCallback } from "react";
import PlayerWidget from "../song/PlayerWidget";
import {
  Container,
  Paper,
  Grid,
  Box,
  Stack,
  Typography,
  Card,
  CardMedia,
  Tooltip,
  Zoom,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylist } from "../content/contentSlice";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";
import AddSongModal from "./AddSongModal";
import Avatar from "../../components/form/Avatar";

function SongPlaylist() {
  /* ---------------------------------- state --------------------------------- */
  const { index } = useParams();
  const songPlaylist = useSelector((state) => state.content?.songPlaylist[0]);
  // const avatarUrl = useSelector(
  //   (state) => state.content?.songPlaylist[index]?.playlistImage
  // );

  const avatarUrl = songPlaylist?.[index].playlistImage;

  // const playlistImage = useSelector((state) => state.content?.songPlaylist[0]);

  const dispatch = useDispatch();
  const { user } = useAuth();
  console.log("index", index);
  console.log("songPlaylist2", songPlaylist);
  console.log("avatarUrl", avatarUrl);

  /* -------------------------------- function -------------------------------- */
  useEffect(() => {
    dispatch(getPlaylist(user._id));
    console.log("avatarUrlupdate", avatarUrl);
  }, [dispatch]);

  /* -------------------------------------------------------------------------- */
  /*                             handle drop avatar                             */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------- render ui ------------------------------- */
  return (
    <Container
      maxWidth="xl"
      sx={{
        flexGrow: 1,
        maxWidth: "1344px",
        padding: "2rem",
        "@media screen and (max-width: 820px)": { padding: "0rem" },
      }}
    >
      <Grid key={Math.random()} container sx={{ height: "100%" }}>
        <Grid item xs={12} md={4}>
          <Stack
            sx={{ backgroundColor: "#F2F2F2", padding: "1rem", height: "100%" }}
            direction="column"
            //   justifyContent="space-around"
            alignItems="center"
            spacing={2}
          >
            {songPlaylist && (
              <Avatar
                playlistImage={songPlaylist[index]?.playlistImage}
                playlistId={songPlaylist[index]?._id}
                playlistIndex={index}
                userId={user._id}
              />
            )}
          </Stack>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              bgcolor: "primary.main",
              height: "100%",
              // padding:"0rem"
            }}
          >
            <Stack
              sx={{
                padding: "1rem 0rem 1rem 0rem",
                height: "100%",
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Stack spacing={0.1} sx={{ padding: "2rem" }}>
                  {/*  */}

                  {songPlaylist && index ? (
                    <Typography variant="h1">
                      {songPlaylist[index]?.playlistName}
                    </Typography>
                  ) : (
                    <></>
                  )}
                </Stack>
              </Box>

              <Box sx={{ backgroundColor: "#F2F2F2", width: "100%" }}>
                <Stack
                  spacing={1}
                  sx={{
                    padding: "2rem 0rem 2rem 0rem",
                    "@media screen and (max-width: 600px)": {
                      padding: "2rem 0rem 2rem 0rem",
                    },
                  }}
                >
                  {/* <MusicPlayer /> */}
                  {songPlaylist && index ? (
                    <PlayerWidget
                      page={"SongPlaylist"}
                      pageId={songPlaylist[index]?._id}
                      songs={songPlaylist[index]?.songRef}
                    />
                  ) : (
                    <></>
                  )}
                </Stack>
              </Box>

              {songPlaylist && index ? (
                <AddSongModal playlistId={songPlaylist[index]?._id} />
              ) : (
                <></>
              )}
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SongPlaylist;
