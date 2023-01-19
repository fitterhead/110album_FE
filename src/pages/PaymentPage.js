import React from "react";
import { Box } from "@mui/system";
import PaypalCheckoutButton from "../components/item/PaypalCheckoutButton";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function PaymentPage() {
  const checkoutCart = useSelector((state) => state.content.contents);
  /* --------------------------- define mock product -------------------------- */
  const product = {
    description: "OK computer",
    price: 19,
  };

  return (
    <div>
      <div className="paypal-button-container">
        <PaypalCheckoutButton
          // onClick={() => console.log("checkoutCart", checkoutCart)}
          product={product}
        />
      </div>
    </div>
  );
}

export default PaymentPage;
