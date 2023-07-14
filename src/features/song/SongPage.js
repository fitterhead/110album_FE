import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Card,
  Grid,
  CardActions,
  Pagination,
  CardContent,
  Zoom,
  Tooltip,
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getContent } from "../content/contentSlice";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloudUpload from "@mui/icons-material/CloudUpload";
import { cloudinaryupload } from "../../utils/cloudinary";
import { addMedia } from "./songSlice";
// import { CloudUpload } from "@material-ui/icons";

function SongPage() {
  const [page, setPage] = React.useState(1);
  const [songInfo, setSongInfo] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const dispatch = useDispatch();
  const params = useParams();

  const handleFileChange = (event, album) => {
    console.log(event.target, "event.target");
    console.log(album, "event.album");
    const files = Array.from(event.target.files);
    setSelectedFile(files);
    setSongInfo(album);
  };

  const allAlbums = useSelector((state) => state.content?.contents[0]?.data);
  useEffect(() => {
    dispatch(getContent({ page }));
    console.log(selectedFile, "selectedFile");
    console.log(songInfo, "songInfo");
    const artistFolder = songInfo?.artist.toLowerCase().replace(/\s/g, "_");
    const albumFolder = songInfo?.album.toLowerCase().replace(/\s/g, "_");

    if (songInfo) {
      dispatch(
        addMedia({
          selectedFile,
          folder: `${artistFolder}/${albumFolder}`,
          albumId: songInfo.albumId,
          artistId: songInfo.artistId,
        })
      );
    }
  }, [dispatch, page, selectedFile]);

  return (
    <Container maxWidth="xl">
      <Grid container padding={2}>
        <Box
          sx={{
            width: "100%",
            maxHeight: "70vh",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {allAlbums?.data?.map((item) => {
            return (
              <Grid container item padding={2}>
                <Grid item xs={5} sm={5} sx={{ paddingBottom: "0.5rem" }}>
                  <CardContent
                    sx={{
                      height: "5vh",

                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Tooltip
                      style={{
                        cursor: "pointer",
                      }}
                      followCursor
                      title={
                        <img
                          src={`https://110albumbe-production.up.railway.app/static/image/${item.album}.jpg`}
                          alt="Tooltip"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      }
                      TransitionComponent={Zoom}
                      arrow
                      // placement="right"
                    >
                      <Typography variant="button">{item.album}</Typography>
                    </Tooltip>
                  </CardContent>
                </Grid>
                <Grid item xs={5} sm={5} sx={{ paddingBottom: "0.5rem" }}>
                  <CardContent
                    sx={{
                      height: "5vh",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body3">{item.artistName}</Typography>
                  </CardContent>
                </Grid>

                <Grid item xs={12} sm={2} sx={{ paddingBottom: "0.5rem" }}>
                  <TextField
                    type="file"
                    onChange={(e) =>
                      handleFileChange(e, {
                        album: item.album,
                        artist: item.artistName,
                        albumId: item._id,
                        artistId: item.artistRef,
                      })
                    }
                    inputProps={{ multiple: true }}
                  />
                </Grid>
              </Grid>
            );
          })}
        </Box>

        <CardActions
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Pagination count={10} color="primary" onChange={handleChange} />
        </CardActions>
      </Grid>
    </Container>
  );
}

export default SongPage;
