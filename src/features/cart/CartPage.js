import React from "react";
import { Box } from "@mui/system";
import PaypalCheckoutButton from "../components/item/PaypalCheckoutButton";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import useCart from "../hooks/useCart";
import { createAlertBar } from "../features/alert/alertSlice";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Stack from "@mui/material/Stack";

function PaymentPage() {
  const dispatch = useDispatch();

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} md={8}>
          {/* <Box>
            {cartProduct.items.map((eachItem) => {
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
                          {eachItem.amount !== 1 ? (
                            <Button
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
                            </Button>
                          ) : (
                            <Button
                              sx={{
                                height: 15,
                                width: 5,
                                minWidth: 10,
                                padding: 2,
                              }}
                            ></Button>
                          )}

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
                            variant="outlined"
                            onClick={() => {
                              setCount(count + 1);
                              increase(eachItem.reference_id);
                            }}
                          >
                            <AddIcon fontSize="small" />
                          </Button>
                        </Stack>
                      </Box>
                    </CardContent>
                  </Box>
                  <ClearIcon
                    onClick={(e) => {
                      deleteItem(eachItem.reference_id);
                      dispatch(createAlertBar("item deleted"));
                    }}
                    sx={{
                      color: "black",
                    }}
                  />
                  <CardMedia
                    component="img"
                    sx={{ height: 150, width: 150 }}
                    image={`https://finalbe-production.up.railway.app/static/image/${eachItem.description}.jpg`}
                  ></CardMedia>
                </Card>
              );
            })}
          </Box> */}
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Box
            sx={{
              paddingTop: "1rem",
              height: "100%",
            }}
          >
            <Card
              sx={{
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
                {/* <Typography variant="h1">{totalCart} USD</Typography> */}
              </Box>
            </Card>
            <div className="paypal-button-container">
              {/* <PaypalCheckoutButton product={cartProduct.items} /> */}
            </div>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PaymentPage;
