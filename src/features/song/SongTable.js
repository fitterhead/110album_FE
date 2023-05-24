import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  useMediaQuery,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const SongTable = ({
  selectedSongId,
  onSongSelect,
  onAddToFavorites,
  songs,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMouseEnter = (event) => {
    const row = event.currentTarget;
    row.querySelector(".favorite-button").style.visibility = "visible";
  };

  const handleMouseLeave = (event) => {
    const row = event.currentTarget;
    row.querySelector(".favorite-button").style.visibility = "hidden";
  };

  return (
    <TableContainer
      component={Paper}
      style={{ maxHeight: 400, overflow: "auto" }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "5vw" }}>#</TableCell>
            <TableCell>
              <Typography variant="button">Name</Typography>
            </TableCell>
            <TableCell style={{ width: "5vw" }}></TableCell>
            <TableCell style={{ width: "10vw" }}>
              <Typography variant="button">Length</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {songs.map((song, index) => (
            <TableRow
              key={song.id}
              onClick={() => onSongSelect(song.id)}
              selected={song.id === selectedSongId}
              style={{ cursor: "pointer" }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              hover
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Avatar
                    alt="Song Cover"
                    src={song.coverImage}
                    variant="rounded"
                    sx={{ width: 40, height: 40 }}
                  />
                  <div>
                    <div>
                      <Typography variant="body3">{song.name}</Typography>
                    </div>
                    {/* {!isMobile && <div>{song.artist}</div>} */}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {!isMobile && (
                  <IconButton
                    className="favorite-button"
                    aria-label="Add to Favorites"
                    onClick={(event) => {
                      event.stopPropagation();
                      onAddToFavorites(song);
                    }}
                    style={{ visibility: "hidden" }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                )}
              </TableCell>
              <TableCell>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Typography variant="body3">{song.length}</Typography>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SongTable;

// const songs = [
//     {
//       id: 1,
//       name: "Song 1",
//       length: "3:45",
//       artist: "Artist 1",
//       album: "Album 1",
//       coverImage: "https://example.com/cover1.jpg",
//     },
//     {
//       id: 2,
//       name: "Song 2",
//       length: "4:20",
//       artist: "Artist 2",
//       album: "Album 2",
//       coverImage: "https://example.com/cover2.jpg",
//     },
//     // Add 10 more songs
//     {
//       id: 3,
//       name: "Song 3",
//       length: "3:30",
//       artist: "Artist 3",
//       album: "Album 3",
//       coverImage: "https://example.com/cover3.jpg",
//     },
//     {
//       id: 4,
//       name: "Song 4",
//       length: "2:55",
//       artist: "Artist 4",
//       album: "Album 4",
//       coverImage: "https://example.com/cover4.jpg",
//     },
//     {
//       id: 5,
//       name: "Song 5",
//       length: "3:15",
//       artist: "Artist 5",
//       album: "Album 5",
//       coverImage: "https://example.com/cover5.jpg",
//     },
//     {
//       id: 6,
//       name: "Song 6",
//       length: "4:10",
//       artist: "Artist 6",
//       album: "Album 6",
//       coverImage: "https://example.com/cover6.jpg",
//     },
//     {
//       id: 7,
//       name: "Song 7",
//       length: "3:50",
//       artist: "Artist 7",
//       album: "Album 7",
//       coverImage: "https://example.com/cover7.jpg",
//     },
//     {
//       id: 8,
//       name: "Song 8",
//       length: "3:25",
//       artist: "Artist 8",
//       album: "Album 8",
//       coverImage: "https://example.com/cover8.jpg",
//     },
//     {
//       id: 9,
//       name: "Song 9",
//       length: "3:40",
//       artist: "Artist 9",
//       album: "Album 9",
//       coverImage: "https://example.com/cover9.jpg",
//     },
//     {
//       id: 10,
//       name: "Song 10",
//       length: "4:05",
//       artist: "Artist 10",
//       album: "Album 10",
//       coverImage: "https://example.com/cover10.jpg",
//     },
//     {
//       id: 11,
//       name: "Song 11",
//       length: "3:55",
//       artist: "Artist 11",
//       album: "Album 11",
//       coverImage: "https://example.com/cover11.jpg",
//     },
//     {
//       id: 12,
//       name: "Song 12",
//       length: "3:20",
//       artist: "Artist 12",
//       album: "Album 12",
//       coverImage: "https://example.com/cover12.jpg",
//     },
//   ];
