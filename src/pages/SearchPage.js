import { Grid } from "@mui/material";
import { Container, Stack, Box } from "@mui/system";
import React from "react";
import "./styles.css";
import SearchBar from "../components/item/SearchBar";
import FilterBar from "../components/item/FilterBar";
import ResultList from "../components/item/ResultList";
function SearchPage() {
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
          <SearchBar />
        </Box>
        <Box sx={{ padding: "1rem" }}>
          <FilterBar />
        </Box>
        {/* <ResultList /> */}
      </Stack>
    </Container>
  );
}

export default SearchPage;
