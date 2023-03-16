import React from "react";
import { Box } from "@mui/system";
import PaypalCheckoutButton from "../components/item/PaypalCheckoutButton";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useCart from "../hooks/useCart";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/material";
import { upperCase } from "lodash";
function PaymentPage() {
  /* --------------------------- define mock product -------------------------- */
  // const product = {
  //   description: "OK computer",
  //   price: 19,
  // };
  // const product = [
  //   {
  //     description: "OK computer",
  //     price: 19,
  //   },
  //   {
  //     description: "Dark Side",
  //     price: 19,
  //   },
  //   {
  //     description: "Pokemon",
  //     price: 19,
  //   },
  // ];
  const cartProduct = useCart();

  console.log("cartProduct.items", cartProduct.items);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} md={8}>
          <Box>
            {cartProduct.items.map((eachItem) => {
              return (
                <Card sx={{ display: "flex", marginTop: "1rem" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: "1",
                      justifyContent: "center",
                    }}
                  >
                    <CardContent>
                      <Typography variant="body3" textTransform="upperCase">
                        {eachItem.description}
                      </Typography>
                      <Typography sx={{ paddingBottom: "1rem" }}></Typography>
                      <Typography variant="body2">19 USD</Typography>
                    </CardContent>
                  </Box>
                  <CardMedia
                    component="img"
                    sx={{ height: 120, width: 120 }}
                    image={`http://localhost:8000/static/image/${eachItem.description}.jpg`}
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
                minHeight: "50vh",
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "column",
                // justifyContent: "center",
                padding: "1rem",
              }}
            >
              <Typography variant="h1">subtotal:100$</Typography>
            </Card>
            <div className="paypal-button-container">
              <PaypalCheckoutButton product={cartProduct.items} />
            </div>
          </Box>
        </Grid>
      </Grid>
    </Container>

    // <div>
    //   <div className="paypal-button-container">
    //     <PaypalCheckoutButton
    //       product={cartProduct.items}
    //     />
    //   </div>
    // </div>
  );
}

export default PaymentPage;

{
  /* <Card sx={{ display: "flex", marginTop: "1rem" }}>
<Box
  sx={{
    display: "flex",
    flexDirection: "column",
    flexGrow: "1",
    justifyContent: "center",
  }}
>
  <CardContent>
    <Typography variant="body3" textTransform="upperCase">
      album name
    </Typography>
    <Typography sx={{ paddingBottom: "1rem" }} variant="body2">
      album price
    </Typography>
    <Typography variant="body2">album price</Typography>
  </CardContent>
</Box>
<CardMedia
  component="img"
  sx={{ maxWidth: 120 }}
  image="https://upload.wikimedia.org/wikipedia/vi/5/5e/OK_Computer.png"
  `http://localhost:8000/static/image/${bio.album}.jpg`
></CardMedia>
</Card> */
}
