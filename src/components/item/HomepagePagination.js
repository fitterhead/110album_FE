import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { Typography } from "@mui/material";
import { useEffect } from "react";

export default function HomepagePagination({ setPage, page }) {
  // const [page, setPage] = React.useState(1);
  console.log(typeof page, "pageeee");
  const handleChange = (event, value) => {
    setPage(value);
    console.log("typeofpage", typeof page);
  };

  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={11} page={page} onChange={handleChange} />
    </Stack>
  );
}
