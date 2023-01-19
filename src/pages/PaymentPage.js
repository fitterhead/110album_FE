import React from "react";
import { Box } from "@mui/system";
import PaypalCheckoutButton from "../components/item/PaypalCheckoutButton";
function PaymentPage() {
  /* --------------------------- define mock product -------------------------- */
  const product = {
    description: "OK computer",
    price: 19,
  };

  return (
    <div>
      <div className="paypal-button-container">
        <PaypalCheckoutButton product={product} />
      </div>
    </div>
  );
}

export default PaymentPage;
