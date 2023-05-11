import { Box, Grid, Paper, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import React from "react";
import AlbumRanking from "../components/form/AlbumRanking";
import NumberOneAlbum from "../components/form/NumberOneAlbum";
import { getContent } from "../features/content/contentSlice";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import "./styles.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Recommendation from "../components/item/Recommendation";
import { styled } from "@mui/material/styles";
import { useRef } from "react";
import { Card } from "@mui/material";
import { getTableData } from "../features/order/orderSlice";
import { getPlaylist } from "../features/content/contentSlice";
import { fromGenreArray } from "../features/content/contentSlice";
import { getCombinedList } from "../features/order/orderSlice";
// import { motion } from "framer-motion";

function Homepage() {
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  const [page, setPage] = React.useState(1);
  const listAlbum = useSelector((state) => state.content.contents);
  const suggestionList = useSelector((state) => state.content?.suggestion);

  console.log("suggestionList2222", suggestionList);
  const { user } = useAuth();

  console.log("userrrr", user);

  useEffect(
    () => {
      setData(dispatch(getContent({ page })));
    },
    //  [page]);
    [dispatch, page]
  );

  /* -------------------------------- get data -------------------------------- */
  const listAlbum3 = useSelector(
    (state) => state.content?.playlist[0]?.data?.data
  );

  console.log("listAlbum3", listAlbum3);
  const userPastOrder = useSelector((state) => state.order?.tableData);
  console.log("userPastOrder", userPastOrder);
  let refinedPlaylist = [];
  const refinedList = listAlbum3?.map((e, index) => {
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
    dispatch(getTableData(user?._id));
    dispatch(getPlaylist(user?._id));
    dispatch(fromGenreArray(genreObject));
  }, [dispatch, listAlbum, user]);

  /* --------------------------- check time function -------------------------- */
  const currentTime = new Date().getHours();

  let greeting = "";

  if (currentTime >= 5 && currentTime < 12) {
    greeting = "Good morning";
  } else if (currentTime >= 12 && currentTime < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

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
      <Grid container spacing={2}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          {user && randomFavouriteAlbum ? (
            <Recommendation
              randomFavouriteAlbum={randomFavouriteAlbum}
              suggestionList={suggestionList}
            />
          ) : null}
        </Grid>

        <Grid item xs={12} md={6}>
          {listAlbum && (
            <NumberOneAlbum
              albums={listAlbum[listAlbum.length - 1]?.data?.data[0]}
            />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {listAlbum && (
            <AlbumRanking
              key={Math.random()}
              albums={listAlbum}
              setPage={setPage}
              page={page}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Homepage;
