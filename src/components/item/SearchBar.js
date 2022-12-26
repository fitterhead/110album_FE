import React from "react";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
function SearchBar() {
  return (
    <Grid container justifyContent="flex-end" spacing={2}>
      <Grid item xs={12} md={4}>
        <TextField
          sx={{ width: "100%", backgroundColor: "white" }}
          //   label="Search"
          id="filled-size-normal"
          defaultValue="Search here"
          variant="filled"
        />
      </Grid>
    </Grid>
  );
}

export default SearchBar;
