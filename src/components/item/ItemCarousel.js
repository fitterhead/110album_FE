import React from "react";
import { Box, Container, Grid, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";

function ItemCarousel() {
  return (
    <Box sx={{ overflow: "scroll" }}>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={1}
        sx={{
          flexWrap: "nowrap",
          width: "fit-content",
          padding: "0rem 0rem 2rem 0rem",
        }}
      >
        <Box sx={{ height: "200px", width: "200px" }}>
          <Stack sx={{ height: "100%", position: "relative" }}>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1/1",
                flexGrow: 1,
                backgroundColor: "gray",
                display: "block",
              }}
            >
              aaa
            </Box>
            <Box sx={{ width: "100%", position: "absolute", bottom: "0" }}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={0.5}
                sx={{ padding: "0.5rem" }}
              >
                <Typography
                  sx={{ textAlign: "center", color: "white" }}
                  variant="h1"
                >
                  OK COMPUTER
                </Typography>
                <Typography sx={{ color: "white" }} variant="button">
                  rock
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Box>
        <Box sx={{ height: "200px", width: "200px" }}>
          <Stack sx={{ height: "100%", position: "relative" }}>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1/1",
                flexGrow: 1,
                backgroundColor: "gray",
                display: "block",
              }}
            >
              aaa
            </Box>
            <Box sx={{ width: "100%", position: "absolute", bottom: "0" }}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={0.5}
                sx={{ padding: "0.5rem" }}
              >
                <Typography
                  sx={{ textAlign: "center", color: "white" }}
                  variant="h1"
                >
                  OK COMPUTER
                </Typography>
                <Typography sx={{ color: "white" }} variant="button">
                  rock
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Box>
        <Box sx={{ height: "200px", width: "200px" }}>
          <Stack sx={{ height: "100%", position: "relative" }}>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1/1",
                flexGrow: 1,
                backgroundColor: "gray",
                display: "block",
              }}
            >
              aaa
            </Box>
            <Box sx={{ width: "100%", position: "absolute", bottom: "0" }}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={0.5}
                sx={{ padding: "0.5rem" }}
              >
                <Typography
                  sx={{ textAlign: "center", color: "white" }}
                  variant="h1"
                >
                  OK COMPUTER
                </Typography>
                <Typography sx={{ color: "white" }} variant="button">
                  rock
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Box>
        <Box sx={{ height: "200px", width: "200px" }}>
          <Stack sx={{ height: "100%", position: "relative" }}>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1/1",
                flexGrow: 1,
                backgroundColor: "gray",
                display: "block",
              }}
            >
              aaa
            </Box>
            <Box sx={{ width: "100%", position: "absolute", bottom: "0" }}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={0.5}
                sx={{ padding: "0.5rem" }}
              >
                <Typography
                  sx={{ textAlign: "center", color: "white" }}
                  variant="h1"
                >
                  OK COMPUTER
                </Typography>
                <Typography sx={{ color: "white" }} variant="button">
                  rock
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Box>
        <Box sx={{ height: "200px", width: "200px" }}>
          <Stack sx={{ height: "100%", position: "relative" }}>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1/1",
                flexGrow: 1,
                backgroundColor: "gray",
                display: "block",
              }}
            >
              aaa
            </Box>
            <Box sx={{ width: "100%", position: "absolute", bottom: "0" }}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={0.5}
                sx={{ padding: "0.5rem" }}
              >
                <Typography
                  sx={{ textAlign: "center", color: "white" }}
                  variant="h1"
                >
                  OK COMPUTER
                </Typography>
                <Typography sx={{ color: "white" }} variant="button">
                  rock
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Box>
        <Box sx={{ height: "200px", width: "200px" }}>
          <Stack sx={{ height: "100%", position: "relative" }}>
            <Box
              sx={{
                width: "100%",
                aspectRatio: "1/1",
                flexGrow: 1,
                backgroundColor: "gray",
                display: "block",
              }}
            >
              aaa
            </Box>
            <Box sx={{ width: "100%", position: "absolute", bottom: "0" }}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={0.5}
                sx={{ padding: "0.5rem" }}
              >
                <Typography
                  sx={{ textAlign: "center", color: "white" }}
                  variant="h1"
                >
                  OK COMPUTER
                </Typography>
                <Typography sx={{ color: "white" }} variant="button">
                  rock
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default ItemCarousel;

{
  /* <Grid
container
direction="row"
justifyContent="space-evenly"
alignItems="center"
sx={{ flexWrap: "noWrap", overflow: "scroll" }}
>
<Grid item xs={6} md={3} padding={1}>
  <Box>
    <Stack sx={{ height: "100%", position: "relative" }}>
      <Box
        sx={{
          width: "100%",
          aspectRatio: "1/1",
          flexGrow: 1,
          backgroundColor: "gray",
          display: "block",
        }}
      >
        aaa
      </Box>
      <Box sx={{ width: "100%", position: "absolute", bottom: "0" }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={0.5}
          sx={{ padding: "0.5rem" }}
        >
          <Typography
            sx={{ textAlign: "center", color: "white" }}
            variant="h1"
          >
            OK COMPUTER
          </Typography>
          <Typography sx={{ color: "white" }} variant="button">
            rock
          </Typography>
        </Stack>
      </Box>
    </Stack>
  </Box>
</Grid>
<Grid item xs={6} md={3} padding={1}>
  <Box>
    <Stack sx={{ height: "100%", position: "relative" }}>
      <Box
        sx={{
          width: "100%",
          aspectRatio: "1/1",
          flexGrow: 1,
          backgroundColor: "gray",
          display: "block",
        }}
      >
        aaa
      </Box>
      <Box sx={{ width: "100%", position: "absolute", bottom: "0" }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={0.5}
          sx={{ padding: "0.5rem" }}
        >
          <Typography
            sx={{ textAlign: "center", color: "white" }}
            variant="h1"
          >
            OK COMPUTER
          </Typography>
          <Typography sx={{ color: "white" }} variant="button">
            rock
          </Typography>
        </Stack>
      </Box>
    </Stack>
  </Box>
</Grid>
<Grid item xs={6} md={3} padding={1}>
  <Box>
    <Stack sx={{ height: "100%", position: "relative" }}>
      <Box
        sx={{
          width: "100%",
          aspectRatio: "1/1",
          flexGrow: 1,
          backgroundColor: "gray",
          display: "block",
        }}
      >
        aaa
      </Box>
      <Box sx={{ width: "100%", position: "absolute", bottom: "0" }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={0.5}
          sx={{ padding: "0.5rem" }}
        >
          <Typography
            sx={{ textAlign: "center", color: "white" }}
            variant="h1"
          >
            OK COMPUTER
          </Typography>
          <Typography sx={{ color: "white" }} variant="button">
            rock
          </Typography>
        </Stack>
      </Box>
    </Stack>
  </Box>
</Grid>
<Grid item xs={6} md={3} padding={1}>
  <Box>
    <Stack sx={{ height: "100%", position: "relative" }}>
      <Box
        sx={{
          width: "100%",
          aspectRatio: "1/1",
          flexGrow: 1,
          backgroundColor: "gray",
          display: "block",
        }}
      >
        aaa
      </Box>
      <Box sx={{ width: "100%", position: "absolute", bottom: "0" }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={0.5}
          sx={{ padding: "0.5rem" }}
        >
          <Typography
            sx={{ textAlign: "center", color: "white" }}
            variant="h1"
          >
            OK COMPUTER
          </Typography>
          <Typography sx={{ color: "white" }} variant="button">
            rock
          </Typography>
        </Stack>
      </Box>
    </Stack>
  </Box>
</Grid>
<Grid item xs={6} md={3} padding={1}>
  <Box>
    <Stack sx={{ height: "100%", position: "relative" }}>
      <Box
        sx={{
          width: "100%",
          aspectRatio: "1/1",
          flexGrow: 1,
          backgroundColor: "gray",
          display: "block",
        }}
      >
        aaa
      </Box>
      <Box sx={{ width: "100%", position: "absolute", bottom: "0" }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={0.5}
          sx={{ padding: "0.5rem" }}
        >
          <Typography
            sx={{ textAlign: "center", color: "white" }}
            variant="h1"
          >
            OK COMPUTER
          </Typography>
          <Typography sx={{ color: "white" }} variant="button">
            rock
          </Typography>
        </Stack>
      </Box>
    </Stack>
  </Box>
</Grid>
<Grid item xs={6} md={3} padding={1}>
  <Box>
    <Stack sx={{ height: "100%", position: "relative" }}>
      <Box
        sx={{
          width: "100%",
          aspectRatio: "1/1",
          flexGrow: 1,
          backgroundColor: "gray",
          display: "block",
        }}
      >
        aaa
      </Box>
      <Box sx={{ width: "100%", position: "absolute", bottom: "0" }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={0.5}
          sx={{ padding: "0.5rem" }}
        >
          <Typography
            sx={{ textAlign: "center", color: "white" }}
            variant="h1"
          >
            OK COMPUTER
          </Typography>
          <Typography sx={{ color: "white" }} variant="button">
            rock
          </Typography>
        </Stack>
      </Box>
    </Stack>
  </Box>
</Grid>
</Grid> */
}
