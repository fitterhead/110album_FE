import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { addAlbumToCart } from "../../features/content/contentSlice";

const PaypalCheckoutButton = (props) => {
  const { product } = props;

  // const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const handleApprove = () =>
    // orderId
    {
      // call backend function to fulfill the order
      let data = {};
      data = {
        orderStatus: "finished",
        product: [props.product],
      };
      // if resonse is success
      addAlbumToCart(data);
      // setPaidFor(true);
      //refresh useraccount or subscription status

      // if response is error
      //alet()
    };

  // if (paidFor) {
  //display success message, modal, or redirect success page

  //   alert("thank you for purchase");
  // }

  if (error) {
    // display error messsage, modal or redirect error page}

    alert(error);
  }
  return (
    <PayPalButtons
      style={{
        color: "silver",
        layout: "horizontal",
        height: 48,
        tagline: false,
        shape: "pill",
      }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            { description: product.description, value: product.value },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order.capture();
        console.log("order", order);

        handleApprove();
        // data.orderId
      }}
      onError={(err) => {
        setError(err);
        console.log("error", err);
      }}
    />
  );
};

export default PaypalCheckoutButton;
