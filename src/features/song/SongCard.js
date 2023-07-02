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
import { format } from "date-fns";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { Stack } from "@mui/material";
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
  timeProgress,
  duration,
  formatTime,
}) =>
  //song card use everything from music player and change the layout
  {
    const theme = useTheme();
    /* ----------------------------- adjust volumne ----------------------------- */
    const [volume, setVolume] = useState(60);

    console.log("currentVolume", volume);
    const handleVolume = (event, newValue) => {
      setVolume(newValue);
    };
    useEffect(() => {
      if (audioRef) {
        audioRef.current.volume = volume / 100;
      }
    }, [volume, audioRef]);

    return (
      <Card
        sx={{
          display: "flex",

          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#5DDF2A",
        }}
      >
        <Grid container>
          <Grid item xs={12} md={3}>
            {" "}
            <CardMedia
              component="img"
              sx={{ minWidth: 180, minHeight: 180 }}
              image={`https://finalbe-production.up.railway.app/static/image/${currentSong?.albumRef.album}.jpg`}
              alt="Live from space album cover"
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Box
              sx={{
                maxWidth: "600px",
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
              }}
            >
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography
                  component="div"
                  variant="button"
                  sx={{ fontSize: "20px" }}
                  gutterBottom
                >
                  {currentSong?.songName}
                </Typography>
                {/* <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {currentSong?.artistRef.artistName}
                </Typography> */}
                <Typography
                  variant="h7"
                  color="text.secondary"
                  component="div"
                  gutterBottom
                  sx={{ fontSize: "20px" }}
                >
                  {currentSong?.albumRef.artistName}
                </Typography>
                <audio
                  // ref={handleAudioRef}
                  src={currentSong?.songUrl}
                  ref={audioRef}
                  // preload="auto"
                  onLoadedMetadata={onLoadedMetadata}
                />

                <input
                  type="range"
                  ref={progressBarRef}
                  defaultValue="0"
                  onChange={handleProgressChange}
                  style={{
                    width: "100%",
                    // height: 4,
                    // borderRadius: 2,
                    background: "rgba(0, 0, 0, 0.38)",
                    // appearance: "none",
                    outline: "none",
                    // margin: 0,
                    // padding: 0,
                  }}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{ fontSize: "12px" }}>
                    {formatTime(timeProgress)}
                  </Typography>
                  <Typography sx={{ fontSize: "12px" }}>
                    {formatTime(duration)}
                  </Typography>
                </Box>
              </CardContent>

              <Grid
                container
                item
                xs={12}
                md={12}
                justifyContent="space-between"
              >
                <Grid item xs={6} md={6}>
                  <Box
                    sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                  >
                    <Box sx={{ display: "flex" }}>
                      <IconButton
                        aria-label="previous"
                        onClick={handlePrevSong}
                      >
                        {theme.direction === "rtl" ? (
                          <SkipNextIcon />
                        ) : (
                          <SkipPreviousIcon />
                        )}
                      </IconButton>

                      <IconButton
                        aria-label="play/pause"
                        onClick={handlePlayPause}
                      >
                        {isPlaying ? (
                          <PauseIcon sx={{ height: 38, width: 38 }} />
                        ) : (
                          <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                        )}
                      </IconButton>

                      <IconButton aria-label="next" onClick={handleNextSong}>
                        {theme.direction === "rtl" ? (
                          <SkipPreviousIcon />
                        ) : (
                          <SkipNextIcon />
                        )}
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Box
                    sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                  >
                    <Box sx={{ display: "flex" }}>
                      <IconButton
                        aria-label="previous"
                        // onClick={handlePrevSong}
                      >
                        <VolumeDown />
                      </IconButton>

                      <IconButton sx={{ width: "100px" }}>
                        <Slider
                          sx={{
                            color: "white", // Replace "primary.main" with your desired color
                          }}
                          aria-label="Volume"
                          value={volume}
                          onChange={handleVolume}
                        />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {/* ------------------------------ adjust volumn ----------------------------- */}
            </Box>
          </Grid>
        </Grid>
      </Card>
    );
  };

export default SongCard;
