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
import {Divider} from "@mui/material";

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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      startSearching();
    }
  };

  const startSearching = () => {
    console.log(input);
    setData(
      dispatch(getContent({ limit: "10", input: input, filterName: filter }))
    );
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        flexGrow: 1,
        // maxWidth: "1344px",
        // padding: "2rem",
        "@media screen and (max-width: 600px)": { padding: "0rem" },
      }}
    >
      <Stack sx={{ bgcolor: "primary.main" }} spacing={2}>
        <Box
          sx={{
            padding: "1rem",
            display: "flex",
            justifyContent: "flex-end",
            // marginBottom: "2rem",
          }}
        >
          <Box sx={{ padding: "0rem 2rem 0rem 0rem" }}>
            <FilterBar filter={filter} setFilter={setFilter} />
          </Box>
          <SearchBar
            input={input}
            setInput={setInput}
            startSearching={startSearching}
          />
          <Button
            sx={{ padding: "1rem" }}
            variant="filled"
            onClick={() => startSearching()}
          >
            Search
          </Button>
        </Box>
        <Divider />
        <SearchResult data={listAlbum} input={input} />
      </Stack>
    </Container>
  );
}

export default SearchPage;
