import { Container, Typography } from "@mui/material";
import React from "react";
import PlayerWidget from "../song/PlayerWidget";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylist } from "../content/contentSlice";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

function LikedSong() {
  const fullPlaylist = useSelector((state) => state.content?.playlist);
  /* -------------------------- handle all playlists -------------------------- */

  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    dispatch(getPlaylist(user._id));
  }, [dispatch]);

  // console.log("fullPlaylist", fullPlaylist[0].data.data);
  /* ---------------------------- handle LikedSong ---------------------------- */
  const likedSong = fullPlaylist?.filter((item) => item._id === item.userRef)[0]
    ?.data?.data[0]?.songRef;

  console.log("LikedSong", likedSong);
  console.log("fullPlaylist", fullPlaylist);

  return (
    <Container maxWidth="xl">
      {likedSong ? (
        <>
          {/* <Typography>Liked Song</Typography> */}
          <PlayerWidget songs={likedSong} page={"LikedSong"} />
        </>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default LikedSong;
