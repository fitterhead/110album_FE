import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  IconButton,
  Typography,
  Grid,
  Slider,
  Container,
  Card,
  Box,
  CardContent,
  CardMedia,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { useTheme } from "@mui/material/styles";

const MusicPlayer = () =>
  // { songs }

  //replace musicPlayer ui with songCard ui
  {
    const theme = useTheme();

    const songs = [
      {
        songUrl:
          "https://res.cloudinary.com/dxvq8cp81/video/upload/v1684823808/aaa/ttt/CoAyCuaAnhAy-BaoAnh-9430793_nsgkev.mp3",
        title: "Song 1",
        artist: "Artist 1",
      },
      {
        songUrl:
          "https://res.cloudinary.com/dxvq8cp81/video/upload/v1684823806/aaa/ttt/HaPhom-HoangThuyLinh-7702273_vyd4u3.mp3",
        title: "Song 2",
        artist: "Artist 2",
      },
      {
        songUrl:
          "https://res.cloudinary.com/dxvq8cp81/video/upload/v1684823804/aaa/ttt/BoXiBo-HoangThuyLinh-7702270_zrbth1.mp3",
        title: "Song 3",
        artist: "Artist 3",
      },
    ];
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [currentSong, setCurrentSong] = useState(songs[currentSongIndex]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isShuffleEnabled, setIsShuffleEnabled] = useState(false);
    const [isRepeatEnabled, setIsRepeatEnabled] = useState(false);
    const [audioElement, setAudioElement] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [timeProgress, setTimeProgress] = useState(0);
    const [songDuration, setSongDuration] = useState(0);
    /* --------------------------- handle progress bar -------------------------- */
    // const currentSong = songs[currentSongIndex];
    const audioRef = useRef();
    const progressBarRef = useRef();

    console.log("audioRef", audioRef);
    console.log("audioRef2", timeProgress);

    const handleProgressChange = (e) => {
      audioRef.current.currentTime = progressBarRef.current.value;
    };

    const onLoadedMetadata = () => {
      console.log(audioRef.current.duration, "onLoadedMetadata");
    };

    const playAnimationRef = useRef();

    const repeat = useCallback(() => {
      console.log("run");
      console.log("timeprogress", timeProgress);

      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setTimeProgress(currentTime);
      setSongDuration(duration);
      progressBarRef.current.value = currentTime;
      playAnimationRef.current = requestAnimationFrame(repeat);
    }, []);

    useEffect(() => {
      if (isPlaying) {
        audioRef.current.play();
        playAnimationRef.current = requestAnimationFrame(repeat);
      } else {
        audioRef.current.pause();
        cancelAnimationFrame(playAnimationRef.current);
      }
    }, [isPlaying, audioRef, repeat]);

    /* ------------------------------- handle play ------------------------------ */
    const handlePlayPause = () => {
      setIsPlaying(!isPlaying);
    };

    /* -------------------------- handle previous song -------------------------- */
    const handlePrevSong = () => {
      //   setIsPlaying(!isPlaying);

      if (currentSongIndex === 0) {
        let lastTrackIndex = songs.length - 1;
        setCurrentSongIndex(lastTrackIndex);
        setCurrentSong(songs[lastTrackIndex]);
      } else {
        setCurrentSongIndex((prev) => prev - 1);
        setCurrentSong(songs[currentSongIndex - 1]);
      }
    };
    /* ---------------------------- handle next song ---------------------------- */

    const handleNextSong = () => {
      //   setIsPlaying(!isPlaying);

      if (currentSongIndex >= songs.length - 1) {
        setCurrentSongIndex(0);
        setCurrentSong(songs[0]);
        setIsPlaying(true);
        console.log(currentSong, "currentSong 2");
      } else {
        setCurrentSongIndex((prev) => prev + 1);
        setCurrentSong(songs[currentSongIndex + 1]);
        console.log(currentSong, "currentSong 2");
        setIsPlaying(true);
      }
    };

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
          sx={{ width: 151 }}
          image="/static/images/cards/live-from-space.jpg"
          alt="Live from space album cover"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {currentSong.title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {currentSong.artist}
            </Typography>
            <audio
              // ref={handleAudioRef}
              src={currentSong.songUrl}
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
      // <Grid container direction="column" alignItems="center" spacing={2}>
      //   <Grid item>
      //     <IconButton onClick={handlePrevSong}>
      //       <SkipPreviousIcon />
      //     </IconButton>
      //     <IconButton onClick={handlePlayPause}>
      //       {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      //     </IconButton>
      //     <IconButton onClick={handleNextSong}>
      //       <SkipNextIcon />
      //     </IconButton>
      //     <IconButton onClick={handleNextSong}>
      //       <ShuffleIcon
      //         color={isShuffleEnabled ? "primary" : "inherit"}
      //         onClick={() => setIsShuffleEnabled(!isShuffleEnabled)}
      //       />
      //     </IconButton>
      //     <IconButton onClick={() => setIsRepeatEnabled(!isRepeatEnabled)}>
      //       <RepeatIcon color={isRepeatEnabled ? "primary" : "inherit"} />
      //     </IconButton>
      //   </Grid>
      //   <Grid item>
      //     <Typography variant="h6">{currentSong.title}</Typography>
      //     <Typography variant="subtitle1">{currentSong.artist}</Typography>
      //   </Grid>
      //   <Grid item container justifyContent="center">
      //     <audio
      //       // ref={handleAudioRef}
      //       src={currentSong.songUrl}
      //       ref={audioRef}
      //       // preload="auto"
      //       onLoadedMetadata={onLoadedMetadata}
      //     />
      //   </Grid>
      //   {/* <Slider
      //     defaultValue={70}
      //     //   value={timeProgress}
      //     //   max={songDuration}
      //   /> */}
      //   <input
      //     type="range"
      //     ref={progressBarRef}
      //     defaultValue="0"
      //     onChange={handleProgressChange}
      //   />

      //   <Grid item container justifyContent="center">
      //     <Typography variant="h6">Song List</Typography>
      //     {songs.map((song, index) => (
      //       <Typography key={index} variant="subtitle2">
      //         {song.title}
      //       </Typography>
      //     ))}
      //   </Grid>
      // </Grid>
    );
  };

export default MusicPlayer;

// const songs = [
//     {
//       songUrl:
//         'https://res.cloudinary.com/dxvq8cp81/video/upload/v1684746289/aaa/ttt/xznemzixazfdjklprman.mp3',
//       title: 'Song 1',
//       artist: 'Artist 1',
//     },
//     {
//       songUrl:
//         'https://res.cloudinary.com/dxvq8cp81/video/upload/v1684746282/aaa/ttt/th0of8tprbrd6nk8157w.mp3',
//       title: 'Song 2',
//       artist: 'Artist 2',
//     },
//     {
//       songUrl:
//         'https://res.cloudinary.com/dxvq8cp81/video/upload/v1684746278/aaa/ttt/frynru6drb0bxxnplfev.mp3',
//       title: 'Song 3',
//       artist: 'Artist 3',
//     },

//   ];
