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
  Tab,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { addLikedSong } from "../playlist/playlistSlice";
import useAuth from "../../hooks/useAuth";
import PlaylistMenu from "../playlist/PlaylistMenu";
import AnimatedIcon from "../../components/icon/AnimatedIcon";

const SongTable = ({
  isPlaying,
  currentSongIndex,
  songPlaylistWidget,
  onSongSelect,
  onAddToFavorites,
  length,
  formatTime,
  // setCurrentSong,
  songs,
  page,
  pageId,
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

  /* ---------------------------- handle uppercase ---------------------------- */
  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
  /* ---------------------------- handle likedSong ---------------------------- */
  const { user } = useAuth();
  const dispatch = useDispatch();
  console.log("auth", user._id);
  console.log("page table", page);
  return (
    <TableContainer
      component={Paper}
      style={{ maxHeight: 400, overflowX: "hidden", overflowY: "scroll" }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {!isMobile && <TableCell style={{ width: "5vw" }}>#</TableCell>}

            <TableCell>
              <Typography variant="button"></Typography>
            </TableCell>
            <TableCell>
              <Typography variant="button">Name</Typography>
            </TableCell>
            <TableCell style={{ width: "5vw" }}></TableCell>
            {!isMobile && (
              <TableCell style={{ width: "5vw" }}>
                <Typography variant="button">Length</Typography>
              </TableCell>
            )}

            <TableCell
            //  style={{ width: "5vw" }}
            ></TableCell>
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
              {!isMobile && <TableCell>{index + 1}</TableCell>}

              <TableCell>
                <IconButton
                  key={index}
                  style={{
                    visibility:
                      index === currentSongIndex && isPlaying
                        ? "visible"
                        : "hidden",
                  }}
                >
                  <AnimatedIcon />
                </IconButton>
              </TableCell>
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
                    src={`https://110albumbe-production.up.railway.app/static/image/${song.albumRef.album}.jpg`}
                    variant="rounded"
                    sx={{ width: 40, height: 40 }}
                  />
                  <div>
                    <div
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "20vw",
                      }}
                    >
                      <Typography noWrap variant="h7" sx={{ fontSize: "16px" }}>
                        {capitalizeFirstLetter(song.songName)}
                      </Typography>
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
                      dispatch(
                        addLikedSong({
                          songId: song._id,
                          playlistId: user._id,
                          userRef: user._id,
                        })
                      );
                    }}
                    style={{ visibility: "hidden" }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                )}
              </TableCell>

              {!isMobile && (
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
              )}

              <TableCell>
                <PlaylistMenu
                  songInfo={song}
                  page={page}
                  pageId={pageId}
                  songPlaylistWidget={songPlaylistWidget}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SongTable;
