import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Grid, Typography } from "@mui/material";


function SearchBar({input, setInput}) {
  
  return (
    <Grid container justifyContent="flex-end" spacing={2}>
      <Grid item xs={12} md={4}>
        <Typography variant="h3">{input}</Typography>
        <TextField
          sx={{ width: "100%", backgroundColor: "white" }}
          //   label="Search"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          id="filled-size-normal"
          defaultValue="Search here"
          variant="filled"
        />
      </Grid>
    </Grid>
  );
}

export default SearchBar;

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const res = await apiService.get(
//         `discover/movie?api_key=${API_KEY}&page=${pageId}&language=en-US`
//       );
//       setMovieList(res.data.results);
//       setLoading(false);
//     } catch (e) {
//       console.log(e.message);
//     }
//   };
//   fetchData();
// }, [pageId]);

// export const getUsers =
//   ({ filterName, page = 1, limit = 12 }) =>
//   async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const params = { page, limit };
//       if (filterName) params.name = filterName;
//       const response = await apiService.get("/users", { params });
//       dispatch(slice.actions.getUsersSuccess(response.data));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//       toast.error(error.message);
//     }
//   };
