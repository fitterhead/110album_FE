import React from "react";
import { Box } from "@mui/system";
import PaypalCheckoutButton from "../components/item/PaypalCheckoutButton";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useCart from "../hooks/useCart";
function PaymentPage() {
  /* --------------------------- define mock product -------------------------- */
  // const product = {
  //   description: "OK computer",
  //   price: 19,
  // };
  const product = [
    {
      description: "OK computer",
      price: 19,
    },
    {
      description: "Dark Side",
      price: 19,
    },
    {
      description: "Pokemon",
      price: 19,
    },
  ];
  // const cartProduct = useCart();

  // console.log("cartProduct.items", cartProduct.items);

  return (
    <div>
      <div className="paypal-button-container">
        <PaypalCheckoutButton
          // onClick={() => console.log("checkoutCart", checkoutCart)}
          // onClick={() => console.log("cartProduct.items", cartProduct.items)}
          // product={cartProduct.items}
          product={product}
        />
      </div>
    </div>
  );
}

export default PaymentPage;
