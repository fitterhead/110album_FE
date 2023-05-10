import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function FilterBar({ filter, setFilter }) {
  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  console.log("filterrrrrr", filter);
  return (
    <FormControl variant="standard" sx={{ width: "100%" }}>
      <InputLabel
        id="demo-simple-select-standard-label"
      >
        Genres
      </InputLabel>
      <Select
        sx={{ fontSize: "16px" }}
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={filter}
        onChange={handleChange}
        label="Age"
        // variant="h3"
      >
        <MenuItem sx={{ fontSize: "16px" }} value="">
          <em>None</em>
        </MenuItem>
        <MenuItem sx={{ fontSize: "16px" }} value={"album"}>
          Album
        </MenuItem>
        <MenuItem sx={{ fontSize: "16px" }} value={"ranking"}>
          Ranking
        </MenuItem>
        <MenuItem sx={{ fontSize: "16px" }} value={"artistName"}>
          Aritst
        </MenuItem>
        <MenuItem sx={{ fontSize: "16px" }} value={"genre"}>
          Genre
        </MenuItem>
        <MenuItem sx={{ fontSize: "16px" }} value={"releaseDate"}>
          Release Date
        </MenuItem>
      </Select>
    </FormControl>
  );
}
