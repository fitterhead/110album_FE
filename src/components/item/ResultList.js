import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";

function ResultList({ data }) {
  console.log("data playlist", data);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        {data[0]?.map((singleData) => {
          return (
            <Grid key={Math.random()} item xs={6} md={3} padding={1}>
              <Box>
                <Stack sx={{ height: "100%" }}>
                  <Box
                    sx={{
                      width: "100%",
                      aspectRatio: "1/1",
                      flexGrow: 1,
                      backgroundColor: "gray",
                    }}
                  >
                    aaa
                  </Box>
                  <Box sx={{ width: "100%" }}>
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      spacing={0.5}
                      sx={{ padding: "0.5rem" }}
                    >
                      <Typography variant="button">
                        {singleData.author}
                      </Typography>
                      <Typography sx={{ textAlign: "center" }} variant="h1">
                        {singleData.title}
                      </Typography>
                      <Typography variant="button">rock</Typography>
                      <Typography variant="body1">1995</Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default ResultList;
