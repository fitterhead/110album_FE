import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function FilterBar() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl variant="standard" sx ={{width:"100%"}}>
      <InputLabel id="demo-simple-select-standard-label">Genres</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={age}
        onChange={handleChange}
        label="Age"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Rock</MenuItem>
        <MenuItem value={20}>Hip-Hop</MenuItem>
        <MenuItem value={30}>Pop</MenuItem>
      </Select>
    </FormControl>
  );
}
