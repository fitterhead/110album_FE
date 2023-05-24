import React, { useState } from "react";
import { Container, Grid, Paper } from "@mui/material";
import SongTable from "./SongTable";
import SongCard from "./SongCard";

const songs = [
  {
    id: 1,
    name: "Song 1",
    length: "3:45",
    artist: "Artist 1",
    album: "Album 1",
    coverImage: "https://example.com/cover1.jpg",
    songUrl:
      "https://res.cloudinary.com/dxvq8cp81/video/upload/v1684823808/aaa/ttt/CoAyCuaAnhAy-BaoAnh-9430793_nsgkev.mp3",
  },
  {
    id: 2,
    name: "Song 2",
    length: "4:20",
    artist: "Artist 2",
    album: "Album 2",
    coverImage: "https://example.com/cover2.jpg",
    songUrl:
      "https://res.cloudinary.com/dxvq8cp81/video/upload/v1684823806/aaa/ttt/HaPhom-HoangThuyLinh-7702273_vyd4u3.mp3",
  },
  // Add 10 more songs
  {
    id: 3,
    name: "Song 3",
    length: "3:30",
    artist: "Artist 3",
    album: "Album 3",
    coverImage: "https://example.com/cover3.jpg",
    songUrl:
      "https://res.cloudinary.com/dxvq8cp81/video/upload/v1684823804/aaa/ttt/BoXiBo-HoangThuyLinh-7702270_zrbth1.mp3",
  },
  {
    id: 4,
    name: "Song 4",
    length: "2:55",
    artist: "Artist 4",
    album: "Album 4",
    coverImage: "https://example.com/cover4.jpg",
  },
  {
    id: 5,
    name: "Song 5",
    length: "3:15",
    artist: "Artist 5",
    album: "Album 5",
    coverImage: "https://example.com/cover5.jpg",
  },
  {
    id: 6,
    name: "Song 6",
    length: "4:10",
    artist: "Artist 6",
    album: "Album 6",
    coverImage: "https://example.com/cover6.jpg",
  },
  {
    id: 7,
    name: "Song 7",
    length: "3:50",
    artist: "Artist 7",
    album: "Album 7",
    coverImage: "https://example.com/cover7.jpg",
  },
  {
    id: 8,
    name: "Song 8",
    length: "3:25",
    artist: "Artist 8",
    album: "Album 8",
    coverImage: "https://example.com/cover8.jpg",
  },
  {
    id: 9,
    name: "Song 9",
    length: "3:40",
    artist: "Artist 9",
    album: "Album 9",
    coverImage: "https://example.com/cover9.jpg",
  },
  {
    id: 10,
    name: "Song 10",
    length: "4:05",
    artist: "Artist 10",
    album: "Album 10",
    coverImage: "https://example.com/cover10.jpg",
  },
  {
    id: 11,
    name: "Song 11",
    length: "3:55",
    artist: "Artist 11",
    album: "Album 11",
    coverImage: "https://example.com/cover11.jpg",
  },
  {
    id: 12,
    name: "Song 12",
    length: "3:20",
    artist: "Artist 12",
    album: "Album 12",
    coverImage: "https://example.com/cover12.jpg",
  },
];

const PlayerWidget = () => {
  const [selectedSongId, setSelectedSongId] = useState(1);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const handleSongSelect = (songId) => {
    setSelectedSongId(songId);
  };

  const handleAddToPlaylist = (song) => {
    // Logic to add the song to the playlist
    console.log("Added to playlist:", song);
  };

  const selectedSong = songs.find((song) => song.id === selectedSongId) || {};

  return (
    <Container maxWidth="xl">
      <Grid const container spacing={0.2}>
        <Grid item xs={12} md={12}>
          <SongCard song={selectedSong} />
        </Grid>
        <Grid item xs={12} md={12}>
          <SongTable
            songs={songs}
            selectedSongId={selectedSongId}
            onSongSelect={handleSongSelect}
            onAddToPlaylist={handleAddToPlaylist}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlayerWidget;
