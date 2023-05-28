import React, { useState, useEffect, useRef, useCallback } from "react";

import {
  Card,
  Box,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Grid,
  Slider,
  Container,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PauseIcon from "@mui/icons-material/Pause";

const SongCard = ({
  handleNextSong,
  progressBarRef,
  handleProgressChange,
  onLoadedMetadata,
  audioRef,
  currentSong,
  isPlaying,
  handlePlayPause,
  handlePrevSong,
}) =>
  //song card use everything from music player and change the layout
  {
    const theme = useTheme();

    // const song = {
    //   id: 1,
    //   name: "OK computer",
    //   length: "3:45",
    //   artist: "Artist 1",
    //   album: "Album 1",
    //   coverImage: "https://example.com/cover1.jpg",
    //   songUrl:
    //     "https://res.cloudinary.com/dxvq8cp81/video/upload/v1684823808/aaa/ttt/CoAyCuaAnhAy-BaoAnh-9430793_nsgkev.mp3",
    // };

    return (
      <Card
        sx={{
          display: "flex",
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#5DDF2A",
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 180, height: 180 }}
          image={`https://finalbe-production.up.railway.app/static/image/${currentSong?.albumRef.album}.jpg`}
          alt="Live from space album cover"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {currentSong?.songName}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {currentSong?.artistRef.artistName}
            </Typography>
            <audio
              // ref={handleAudioRef}
              src={currentSong?.songUrl}
              ref={audioRef}
              // preload="auto"
              onLoadedMetadata={onLoadedMetadata}
            />
            {/* <Slider
          defaultValue={70}
          //   value={timeProgress}
          //   max={songDuration}
        /> */}
            <input
              type="range"
              ref={progressBarRef}
              defaultValue="0"
              onChange={handleProgressChange}
            />
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <IconButton aria-label="previous" onClick={handlePrevSong}>
              {theme.direction === "rtl" ? (
                <SkipNextIcon />
              ) : (
                <SkipPreviousIcon />
              )}
            </IconButton>

            <IconButton aria-label="play/pause" onClick={handlePlayPause}>
              {isPlaying ? (
                <PauseIcon sx={{ height: 38, width: 38 }} />
              ) : (
                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
              )}
            </IconButton>
            {/* <IconButton aria-label="play/pause">
        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
      </IconButton> */}
            <IconButton aria-label="next" onClick={handleNextSong}>
              {theme.direction === "rtl" ? (
                <SkipPreviousIcon />
              ) : (
                <SkipNextIcon />
              )}
            </IconButton>
          </Box>
        </Box>
      </Card>
      //   <Card
      //     sx={{
      //       display: "flex",
      //       boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
      //       backgroundColor: "#5DDF2A",
      //     }}
      //   >
      //     <CardMedia
      //       component="img"
      //       sx={{ width: 151 }}
      //       image="/static/images/cards/live-from-space.jpg"
      //       alt="Live from space album cover"
      //     />
      //     <Box sx={{ display: "flex", flexDirection: "column" }}>
      //       <CardContent sx={{ flex: "1 0 auto" }}>
      //         <Typography component="div" variant="h5">
      //           {song.name}
      //         </Typography>
      //         <Typography
      //           variant="subtitle1"
      //           color="text.secondary"
      //           component="div"
      //         >
      //           {song.artist}
      //         </Typography>
      //       </CardContent>
      //       <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
      //         <IconButton aria-label="previous">
      //           {theme.direction === "rtl" ? (
      //             <SkipNextIcon />
      //           ) : (
      //             <SkipPreviousIcon />
      //           )}
      //         </IconButton>
      //         <IconButton aria-label="play/pause">
      //           <PlayArrowIcon sx={{ height: 38, width: 38 }} />
      //         </IconButton>
      //         <IconButton aria-label="next">
      //           {theme.direction === "rtl" ? (
      //             <SkipPreviousIcon />
      //           ) : (
      //             <SkipNextIcon />
      //           )}
      //         </IconButton>
      //       </Box>
      //     </Box>
      //   </Card>
    );
  };

export default SongCard;
