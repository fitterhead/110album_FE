import React from "react";
import { Box, Container, Stack } from "@mui/system";
import { Paper } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getContent } from "../../features/content/contentSlice";
import { useDispatch } from "react-redux";

function NumberOneAlbum() {
  // const dispatch = useDispatch();

  return (
    <Stack
      sx={{ backgroundColor: "#F2F2F2", padding: "1rem", height: "100%" }}
      direction="column"
      //   justifyContent="space-around"
      alignItems="center"
      spacing={2}
    >
      <Box
        sx={{
          width: "100%",
          maxHeight: "600px",
          aspectRatio: "1/1",

          // maxHeight: "600px",
          // maxWidth: "600px",
          backgroundColor: "yellow",
        }}
      >
        AAA
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              variant="h1"
              color="text.secondary"
              //   gutterBottom
            >
              radiohead
            </Typography>
            <Typography
              variant="h7"
              // component="div"
            >
              OK COMPUTER
            </Typography>
            <Typography variant="h1">1995</Typography>
          </CardContent>
          {/* <Box sx={{flexGrow:1,height:"2rem"}}></Box> */}
          <CardActions>
            <Button
              // onClick={() => {
              //   dispatch(getContent());
              //   console.log("clicked", dispatch(getContent()));
              // }}
              size="small"
            >
              Learn More
            </Button>
          </CardActions>
        </Box>
      </Box>
    </Stack>
  );
}

export default NumberOneAlbum;
