import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { Typography, styled } from "@mui/material";
import { useEffect } from "react";
import { PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function HomepagePagination({ setPage, page }) {
  console.log(typeof page, "pageeee");
  const handleChange = (event, value) => {
    setPage(value);
    console.log("typeofpage", typeof page);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={11}
        page={page}
        onChange={handleChange}
        renderItem={(item) => (
          <PaginationItem
            components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
  );
}
