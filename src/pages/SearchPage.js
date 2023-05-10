import { Button, Grid } from "@mui/material";
import { Container, Stack, Box } from "@mui/system";
import React, { useEffect } from "react";
import "./styles.css";
import SearchBar from "../components/item/SearchBar";
import FilterBar from "../components/item/FilterBar";
import ResultList from "../components/item/ResultList";
import SearchResult from "../components/item/SearchResult";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContent } from "../features/content/contentSlice";

function SearchPage() {
  const listAlbum = useSelector(
    (state) => state.content?.contents[0]?.data.data
  );
  const [data, setData] = useState(listAlbum);
  const [input, setInput] = useState();
  const [filter, setFilter] = React.useState("album");
  const dispatch = useDispatch();

  // useEffect(() => {
  //   setData(
  //     dispatch(getContent({ limit: "10", input: input, filter: filter }))
  //   );
  // }, []);
  // console.log("search data", listAlbum);

  const startSearching = () => {
    console.log(input);
    setData(
      dispatch(getContent({ limit: "10", input: input, filterName: filter }))
    );
  };

  return (
    <Container
      maxWidth="false"
      sx={{
        flexGrow: 1,
        maxWidth: "1344px",
        padding: "2rem",
        "@media screen and (max-width: 600px)": { padding: "0rem" },
      }}
    >
      <Stack sx={{ bgcolor: "primary.main" }} spacing={2}>
        <Box
          sx={{
            padding: "1rem",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <SearchBar input={input} setInput={setInput} />
          <Button
            variant="filled"
            onClick={() => startSearching()}
          >
            Search
          </Button>
        </Box>
        <Box sx={{ padding: "1rem" }}>
          <FilterBar filter={filter} setFilter={setFilter} />
        </Box>
        <SearchResult data={listAlbum} input={input} />
      </Stack>
    </Container>
  );
}

export default SearchPage;
