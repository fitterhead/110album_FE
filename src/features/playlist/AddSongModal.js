import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Grid,
  Paper,
  Modal,
  Backdrop,
  Fade,
  Button,
  TextField,
  CardActions,
  Pagination,
  CardContent,
  Divider,
  Fab,
  Avatar,
  Zoom,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import ClearIcon from "@mui/icons-material/Clear";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { addSong } from "./playlistSlice";
import { getContent } from "../content/contentSlice";
import useAuth from "../../hooks/useAuth";
/* ----------------------------- import reducer ----------------------------- */
import { getAllSong } from "../song/songSlice";
const songsPerPage = 9;

function AddSongModal({ playlistId }) {
  /* -------------------------------------------------------------------------- */
  /*                                    state                                   */
  /* -------------------------------------------------------------------------- */
  const [page, setPage] = React.useState(1);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const allSong = useSelector((state) => state.song?.song);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuth();

  /* -------------------------------------------------------------------------- */
  /*                                  function                                  */
  /* -------------------------------------------------------------------------- */
  const handleSongListOpen = () => {
    dispatch(getAllSong());
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    dispatch(getAllSong());
  };

  const handleClose = () => {
    setOpen(false);
  };

  /* ------------------------------- function 2 ------------------------------- */
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = allSong?.slice(indexOfFirstSong, indexOfLastSong);

  // Handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleAddSong = (songId) => {
    dispatch(addSong({ songId, playlistId,userRef: user._id }));
    
    handleClose();
    // console.log("songId", songId);
    // console.log("playlistId", playlistId);
  };
  /* -------------------------------------------------------------------------- */
  /*                                 ui styling                                 */
  /* -------------------------------------------------------------------------- */
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60vw",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <>
      <Tooltip
        title="add song"
        TransitionComponent={Zoom}
        arrow
        placement="right"
      >
        <Fab
          onClick={handleOpen}
          // onClick={handleSongListOpen}
          color="gray"
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal open={open} onClose={handleClose}>
        <TableContainer component={Paper} sx={style}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Song Name</TableCell>
                <TableCell>Artist</TableCell>
                <TableCell>Album</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentSongs.map((song) => (
                <TableRow key={song._id}>
                  <TableCell>{song.songName}</TableCell>
                  <TableCell>{song.artistRef.artistName}</TableCell>
                  <TableCell>{song.albumRef.album}</TableCell>
                  <TableCell>
                    {
                      <Button onClick={() => handleAddSong(song._id)}>
                        <AddIcon />
                      </Button>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination
            sx={{ marginTop: "20px" }}
            count={Math.ceil(allSong?.length / songsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </TableContainer>
      </Modal>
    </>
  );
}

export default AddSongModal;
