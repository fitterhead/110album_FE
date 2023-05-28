import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Grid, Paper } from "@mui/material";
import SongTable from "./SongTable";
import SongCard from "./SongCard";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";

const PlayerWidget = ({ songs }) => {
  // const [selectedSongId, setSelectedSongId] = useState(1);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentSong, setCurrentSong] = useState(songs[currentSongIndex]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffleEnabled, setIsShuffleEnabled] = useState(false);
  const [isRepeatEnabled, setIsRepeatEnabled] = useState(false);
  const [audioElement, setAudioElement] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const songList = useSelector((state) => state.song?.song);
  console.log("songList", songList);

  const handleSongSelect = (songIndex) => {
    console.log(songIndex, "currentSongIndex");
    setCurrentSongIndex(songIndex);
  };
  // const handleSongSelect = (songId) => {
  //   setSelectedSongId(songId);
  // };

  // useEffect(() => {}, [third]);

  const handleAddToPlaylist = (song) => {
    // Logic to add the song to the playlist
    console.log("Added to playlist:", song);
  };

  useEffect(() => {
    setCurrentSong(songs[currentSongIndex]);

    console.log("currentSong", currentSong);
  }, [currentSongIndex]);

  // const currentSong = songs.find((song) => song[currentSongIndex]) || {};
  // const selectedSong = songs.find((song) => song.id === selectedSongId) || {};
  const audioRef = useRef();
  const progressBarRef = useRef();

  // console.log("audioRef", audioRef);
  // console.log("audioRef2", timeProgress);

  const handleProgressChange = (e) => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };

  const onLoadedMetadata = () => {
    console.log(audioRef.current.duration, "onLoadedMetadata");
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  const playAnimationRef = useRef();

  const repeat = useCallback(() => {
    // console.log("run");
    // console.log("timeprogress", timeProgress);

    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setTimeProgress(currentTime);
    setDuration(duration);
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

  console.log("duration", duration);
  console.log("timeProgress", timeProgress);
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
      // console.log(currentSong, "currentSong 2");
    } else {
      setCurrentSongIndex((prev) => prev + 1);
      setCurrentSong(songs[currentSongIndex + 1]);
      // console.log(currentSong, "currentSong 2");
      setIsPlaying(true);
    }
  };

  /* ------------------------------- format time ------------------------------ */
  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };
  return (
    <Container maxWidth="xl">
      <Grid const container spacing={0.2}>
        <Grid item xs={12} md={12}>
          <SongCard
            currentSong={currentSong}
            isPlaying={isPlaying}
            handlePlayPause={handlePlayPause}
            handlePrevSong={handlePrevSong}
            audioRef={audioRef}
            onLoadedMetadata={onLoadedMetadata}
            handleProgressChange={handleProgressChange}
            progressBarRef={progressBarRef}
            handleNextSong={handleNextSong}
            formatTime={formatTime}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <SongTable
            songs={songs}
            // selectedSongId={selectedSongId}
            currentSongIndex={currentSongIndex}
            // setCurrentSong={setCurrentSong}
            onSongSelect={handleSongSelect}
            onAddToPlaylist={handleAddToPlaylist}
            formatTime={formatTime}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlayerWidget;
