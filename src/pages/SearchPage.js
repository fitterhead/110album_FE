import { Grid } from "@mui/material";
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
  const [input, setInput] = useState();
  const [data, setData] = useState(listAlbum);
  const dispatch = useDispatch();
  useEffect(() => {
    setData(dispatch(getContent({ limit: "101" })));
  }, []);
  console.log("search data", listAlbum);
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
        </Box>
        <Box sx={{ padding: "1rem" }}>
          <FilterBar />
        </Box>
        <SearchResult data={listAlbum} input={input} />
      </Stack>
    </Container>
  );
}

export default SearchPage;
