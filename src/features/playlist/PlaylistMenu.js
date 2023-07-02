import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Typography } from "@mui/material";
import { Divider, Paper, Popper, Grow } from "@mui/material";
import { addSong, deleteSongFromPlaylist } from "./playlistSlice";

const ITEM_HEIGHT = 48;

export default function PlaylistMenu({
  songPlaylistWidget,
  songInfo,
  page,
  pageId,
}) {
  /* -------------------------------------------------------------------------- */
  /*                                    data                                    */
  /* -------------------------------------------------------------------------- */

  const [anchorElWidget, setAnchorElWidget] = React.useState(null);
  const open = Boolean(anchorElWidget);
  const dispatch = useDispatch();

  const { user } = useAuth();
  /* -------------------------------------------------------------------------- */
  /*                                  function                                  */
  /* -------------------------------------------------------------------------- */
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorElWidget(event.currentTarget);
  };

  const handleDispatch = (event, playlistId) => {
    event.stopPropagation();
    dispatch(addSong({ songId: songInfo._id, playlistId, userRef: user._id }));
    handleClose();
  };

  /* ------------------ handle song delete from the playlist ------------------ */

  const handlePlaylistSong = (event) => {
    event.stopPropagation();
    dispatch(
      deleteSongFromPlaylist({
        songId: songInfo._id,
        playlistId: pageId,
        userRef: user._id,
      })
    );
    console.log("playlistId", pageId);
    console.log("songId", songInfo._id);
    handleClose();
  };
  const handleClose = (event) => {
    event?.stopPropagation();
    setAnchorElWidget(null);
    // console.log("playlistId", playlistId);
    // console.log("songId", songInfo._id);
  };

  // console.log("songPlaylistWidget playlist menu", songPlaylistWidget);
  // console.log("info playlist menu", songInfo);
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorElWidget}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            variant="button"
            sx={{ fontSize: "10px" }}
            align="center"
            gutterBottom
          >
            Create
            <br />
            Playlist
          </Typography>
        </MenuItem>

        <Divider />
        <Typography
          sx={{ fontSize: "8px", display: "flex", justifyContent: "center" }}
          variant="button"
          paddingBottom="0.5rem"
          gutterBottom
        >
          Add to playlist
        </Typography>

        {songPlaylistWidget?.map((option) => (
          <MenuItem
            key={option._id}
            onClick={(event) => handleDispatch(event, option._id)}
          >
            <Typography
              sx={{
                fontSize: "12px",
                display: "flex",
                justifyContent: "center",
              }}
              variant="body2"
              align="center"
              gutterBottom
            >
              {option.playlistName}
            </Typography>
          </MenuItem>
        ))}

        {page !== "Album" && (
          <>
            <Divider />
            <MenuItem
              sx={{ display: "flex", justifyContent: "center" }}
              onClick={(event) => handlePlaylistSong(event)}
            >
              <Typography
                sx={{
                  fontSize: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
                variant="button"
                gutterBottom
              >
                Remove
              </Typography>
            </MenuItem>
          </>
        )}
      </Menu>
    </div>
  );
}
