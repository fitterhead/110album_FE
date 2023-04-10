import React from "react";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/material";

function MainFooter() {
  return (
    <Box
      sx={{
        marginTop: "1rem", 
        backgroundColor: "#5DDF2A",
        minHeight: "20vh",
        flexGrow: 1,
        padding: 0,
        display:"flex",
        justifyContent:"center",
        alignItems:"flex-end"
      }}
    >
      <Typography sx ={{padding:"1rem"}} variant="body3">© 2023 Copyright: Phi Nguyen</Typography>
    </Box>
  );
}

export default MainFooter;
