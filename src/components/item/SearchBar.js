import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Grid, Typography } from "@mui/material";

function SearchBar({ input, setInput }) {
  return (
    <Grid container justifyContent="flex-end" spacing={2}>
      <Grid item xs={12} md={4}>
        <TextField
          sx={{ width: "100%", backgroundColor: "white" }}
          //   label="Search"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          id="filled-size-normal"
          label="Search here"
          variant="filled"
        />
      </Grid>
    </Grid>
  );
}

export default SearchBar;
