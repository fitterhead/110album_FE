import React, { useEffect } from "react";
import { Box } from "@mui/system";
import PaypalCheckoutButton from "../components/item/PaypalCheckoutButton";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import useCart from "../hooks/useCart";
import { createAlertBar } from "../features/alert/alertSlice";
import { handleCart } from "../features/cart/CartSlice";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  useEventCallback,
} from "@mui/material";
import { Grid } from "@mui/material";
import useAuth from "../hooks/useAuth";
import { handleCartUser } from "../features/cart/CartSlice";
import { deleteCart } from "../features/cart/CartSlice";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import Stack from "@mui/material/Stack";

function PaymentPage() {
  const dispatch = useDispatch();
  const totalCart = useSelector((state) => state.cart.cart);
  console.log("taotal Cart", totalCart);
  const { user } = useAuth();
  console.log(user, "user payment");

  // const totalCart = user.cart;

  const productRendered = totalCart?.map((item) => {
    return {
      reference_id: item.reference_id,
      description: item.description,
      amount: { value: item.price },
    };
  });

  const handleAlbumCart = ({ albumId, description, type }) => {
    const data = {
      albumId: albumId,
      description: description,
      type: type,
    };
    const userRef = user._id;

    console.log(data, "dataaaaaa");
    // dispatch(handleCart(userRef, data));
    dispatch(handleCart(userRef, data));
  };

  useEffect(() => {
    dispatch(handleCartUser({ userId: user?._id }));
  }, [dispatch]);

  /* --------------------------- calculate price sum -------------------------- */

  const calculateTotalPrice = (arr) => {
    let totalPrice = 0;

    arr.forEach((item) => {
      if (item.hasOwnProperty("price")) {
        totalPrice += item.price;
      }
    });

    return totalPrice;
  };
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} md={8}>
          <Box>
            {totalCart.map((eachItem) => {
              return (
                <Card
                  key={Math.random()}
                  sx={{ display: "flex", marginTop: "1rem" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: "1",
                      justifyContent: "center",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h1" textTransform="upperCase">
                        {eachItem.description}
                      </Typography>
                      <Typography variant="body3">
                        {eachItem.price} USD
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          paddingTop: "0.5rem",
                        }}
                      >
                        <Stack direction="row" spacing={2}>
                          {/* {eachItem.amount !== 1 ? ( */}
                          <Button
                            sx={{
                              height: 15,
                              width: 5,
                              minWidth: 10,
                              padding: 2,
                            }}
                            onClick={() =>
                              handleAlbumCart({
                                albumId: eachItem.reference_id,
                                description: eachItem.description,
                                type: "minus",
                              })
                            }
                            // onClick={() =>
                            //   handleAlbumCart({
                            //     albumId: eachItem.reference_id._id,
                            //     description: eachItem.description,
                            //     type: "minus",
                            //   })
                            // }
                            variant="outlined"
                          >
                            <RemoveIcon fontSize="small" />
                          </Button>
                          {/* ) : (
                            <Button
                              sx={{
                                height: 15,
                                width: 5,
                                minWidth: 10,
                                padding: 2,
                              }}
                            ></Button>
                          )} */}

                          {/* <Button
                            sx={{
                              height: 15,
                              width: 5,
                              minWidth: 10,
                              padding: 2,
                            }}
                            variant="outlined"
                            onClick={() => {
                              // setClickedID(eachItem.reference_id);
                              decrease(eachItem.reference_id);
                              setCount(Math.max(count - 1, 0));
                            }}
                          >
                            <RemoveIcon fontSize="small" />
                          </Button> */}

                          <Typography
                            variant="body3"
                            // sx={{ paddingBottom: "1rem" }}
                          >
                            {eachItem.amount ? eachItem.amount : 1}
                          </Typography>
                          <Button
                            sx={{
                              height: 15,
                              width: 5,
                              minWidth: 10,
                              padding: 2,
                            }}
                            onClick={() =>
                              handleAlbumCart({
                                albumId: eachItem.reference_id,
                                description: eachItem.description,
                                type: "plus",
                              })
                            }
                            variant="outlined"
                          >
                            <AddIcon fontSize="small" />
                          </Button>
                        </Stack>
                      </Box>
                    </CardContent>
                  </Box>
                  <ClearIcon
                    onClick={() =>
                      handleAlbumCart({
                        albumId: eachItem.reference_id,
                        description: eachItem.description,
                        type: "delete",
                      })
                    }
                    sx={{
                      color: "black",
                    }}
                  />
                  <CardMedia
                    component="img"
                    sx={{ height: 150, width: 150 }}
                    // sx={{ maxWidth: "10rem" }}
                    image={`https://110albumbe-production.up.railway.app/static/image/${eachItem.description}.jpg`}
                  ></CardMedia>
                </Card>
              );
            })}
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Box
            sx={{
              // backgroundColor: "red",
              paddingTop: "1rem",
              height: "100%",
            }}
          >
            <Card
              sx={{
                // minHeight: "25vh",
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "column",
                padding: "1rem 1rem 3rem 1rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h1">subtotal</Typography>
                <Typography variant="h1">
                  {calculateTotalPrice(totalCart)} USD
                </Typography>
              </Box>
            </Card>
            <div className="paypal-button-container">
              {/* <PaypalCheckoutButton product={totalCart} /> */}
              <PaypalCheckoutButton product={productRendered} />
            </div>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PaymentPage;
