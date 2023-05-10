import React from "react";
import { Box, CardMedia, Grid, Paper, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import { styled } from "@mui/material/styles";
import { Card } from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { getTableData } from "../../features/order/orderSlice";
import { getPlaylist } from "../../features/content/contentSlice";
import { fromGenreArray } from "../../features/content/contentSlice";
import { getCombinedList } from "../../features/order/orderSlice";
import { motion, AnimatePresence } from "framer-motion";

function Recommendation() {
  /* - get a combine list of genres from user order history and user playlist - */
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useAuth();

  // console.log(user, "user Recommendation");

  /* -------------------------- handle click function ------------------------- */

  const handleArtistBio = (artistId) => {
    navigate(`/artist/${artistId}`);
  };

  const handleAlbumInfo = (artistId) => {
    navigate(`/album/result/${artistId}`);
  };

  /* ------------------------ get data from redux store ----------------------- */
  const suggestionList = useSelector((state) => state.content?.suggestion);
  const listAlbum = useSelector(
    (state) => state.content?.playlist[0]?.data?.data
  );
  const userPastOrder = useSelector((state) => state.order?.tableData);

  const listAlbum2 = useSelector((state) => state.content.contents);

  let refinedPlaylist = [];
  const refinedList = listAlbum?.map((e, index) => {
    if (e.albumRef.length !== 0) {
      refinedPlaylist.push(e.albumRef);
    }
  });

  const spreadList = refinedPlaylist?.map((e) => {
    for (let i = 0; i < e.length; i++) {
      return e[i];
    }
  });

  const favouriteGenrePlaylist = Object.values(
    spreadList.reduce((acc, { genre }) => {
      if (!acc[genre]) {
        acc[genre] = { genre, quantity: 0 };
      }
      acc[genre].quantity++;
      return acc;
    }, {})
  );

  let productList = userPastOrder.map((product) => product.product);
  productList = productList.flat(1);
  productList = productList.map((item) => item.reference_id);

  const favouriteGenrePurchased = Object.values(
    productList.reduce((acc, { genre }) => {
      if (!acc[genre]) {
        acc[genre] = { genre, quantity: 0 };
      }
      acc[genre].quantity++;
      return acc;
    }, {})
  );

  const combinedArray = [...favouriteGenrePlaylist, ...favouriteGenrePurchased];

  const outputCombinedArray = combinedArray.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.genre === item.genre);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      acc.push(item);
    }
    return acc;
  }, []);

  console.log(outputCombinedArray, "output arrayyyy");

  const combinedAlbum = [...spreadList, ...productList];
  console.log(combinedAlbum, "output arrayyyy combinedArray");

  const genres = outputCombinedArray.map((item) => item.genre).slice(0, 5);

  console.log("genres combine", genres);

  console.log("suggestionList", suggestionList);

  /* ---- return album user bought or save that is a genre he like the most --- */

  const albumOfFavouriteGenre = combinedAlbum.filter((album) =>
    genres.includes(album.genre)
  );

  // console.log(albumOfFavouriteGenre, "albumOfFavouriteGenre");

  const randomFavouriteAlbum =
    albumOfFavouriteGenre[
      Math.floor(Math.random() * albumOfFavouriteGenre.length)
    ];

  console.log("randomFavouriteAlbum", randomFavouriteAlbum);
  /* ------ save ini value of genreObject , if its value change, dispatch ----- */

  const genreObject = { genres: genres };

  useEffect(() => {
    dispatch(getTableData(user._id));
    dispatch(getPlaylist());
    dispatch(fromGenreArray(genreObject));
  }, [dispatch, listAlbum2]);

  /* ------------------------------- check time ------------------------------- */

  const currentTime = new Date().getHours();

  let greeting = "";

  if (currentTime >= 5 && currentTime < 12) {
    greeting = "Good morning";
  } else if (currentTime >= 12 && currentTime < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  /* --------------------------- styling components --------------------------- */

  const CarouselContainer = styled("div")({
    position: "relative",
  });

  const ChildContainer = styled("div")({
    borderRadius: 10,
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
    display: "flex",
    overflowX: "hidden",
    scrollBehavior: "smooth",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  });

  const Card = styled("div")({
    minWidth: "100%",
    height: "30vh",
    // marginRight: 20,
    backgroundColor: "#fff",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  const ArrowButton = styled("div")({
    position: "absolute",
    top: "50%",
    right: "0",
    transform: "translateY(-50%)",
    backgroundColor: "transparent",
    border: "none",
    fontSize: 36,
    color: "#000",
    cursor: "pointer",
    transition: "opacity 0.3s",
    "&:hover": {
      opacity: 0.5,
    },
  });

  const RightArrow = styled(ArrowButton)({
    right: 10,
  });
  const LeftArrow = styled(ArrowButton)({
    left: 10,
  });

  /* ---------------------------------- logic --------------------------------- */

  const containerRef = useRef(null);

  const handleNextButtonClick = () => {
    const container = containerRef.current;
    console.log(container, "current container");
    container.scrollTo({
      left: container.scrollLeft + container.offsetWidth,
      behavior: "smooth",
    });
  };
  const handleBackButtonClick = () => {
    const container = containerRef.current;
    console.log(container, "current container");
    container.scrollTo({
      left: container.scrollLeft - container.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                bgcolor: "primary.main",
                height: "100%",
                padding: "1rem",
              }}
            >
              <Typography
                sx={{ color: "white", paddingBottom: "1rem" }}
                variant="h1"
              >
                {greeting},
              </Typography>
              <Typography variant="h1">because you like</Typography>
              <Typography sx={{ paddingBottom: "2rem" }} variant="h7">
                {randomFavouriteAlbum?.genre}
              </Typography>

              <Typography sx={{ paddingTop: "8rem" }} variant="h1">
                Here are some
                <br /> suggestions for you:
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Grid container>
              <Grid item xs={12} sm={6}></Grid>
              <Grid item xs={12} sm={6}></Grid>
            </Grid>

            <CarouselContainer>
              <ChildContainer id="carousel-container" ref={containerRef}>
                <LeftArrow onClick={handleBackButtonClick}>{"<"}</LeftArrow>
                {suggestionList[0]?.data?.data.map((album) => (
                  <Card
                    key={album._id}
                    sx={{
                      bgcolor: "#F2F2F2",
                      padding: "1rem",
                      display: "flex",
                      flexDirection: isSmallScreen ? "column" : "row",
                      height: "100%",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="300"
                      style={{
                        width: "300px",
                        height: "300px",
                        objectFit: "cover",
                      }}
                      image="https://picsum.photos/300/300"
                      alt="Random image"
                      onClick={() => handleAlbumInfo(`${album._id}`)}
                    />

                    <Box sx={{ height: "100%", margin: "1rem" }}>
                      <Typography
                        variant="h1"
                        color="text.secondary"
                        onClick={() => handleArtistBio(`${album.artistRef}`)}

                        //   gutterBottom
                      >
                        {/* radiohead */}
                        {album.artistName}
                      </Typography>
                      <Typography
                        variant="h7"
                        // component="div"
                        onClick={() => handleAlbumInfo(`${album._id}`)}
                      >
                        {/* OK COMPUTER */}
                        {album.album.toUpperCase()}
                      </Typography>
                      <Typography variant="h1">{album.genre}</Typography>
                    </Box>
                  </Card>
                ))}
                <RightArrow onClick={handleNextButtonClick}>{">"}</RightArrow>
              </ChildContainer>
            </CarouselContainer>
          </Grid>
        </Grid>
      </motion.div>
    </AnimatePresence>
  );
}

export default Recommendation;
