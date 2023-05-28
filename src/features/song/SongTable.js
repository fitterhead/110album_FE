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
  currentSongIndex,
  onSongSelect,
  onAddToFavorites,
  length,
  formatTime,
  // setCurrentSong,
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
              key={index}
              onClick={() => onSongSelect(index)}
              selected={index === currentSongIndex}
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
                    src={`https://finalbe-production.up.railway.app/static/image/${song.albumRef.album}.jpg`}
                    variant="rounded"
                    sx={{ width: 40, height: 40 }}
                  />
                  <div>
                    <div>
                      <Typography variant="body3">{song.songName}</Typography>
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
                  <Typography variant="body3">
                    {formatTime(song.duration)}
                  </Typography>
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
