import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { addAlbumToCart } from "../../features/content/contentSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const PaypalCheckoutButton = (props) => {
  const { product } = props;

  const productRendered = product.map((item) => {
    return {
      reference_id: item.description,
      description: item.description,
      amount: { value: item.price },
    };
  });

  console.log(productRendered, "productRendered");

  console.log("prop2", props);
  const dispatch = useDispatch();
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  // const checkoutCart = useSelector((state) => state.content.contents);

  const handlePaidFor = () => {
    alert("handlePayFor");
    setPaidFor(true);
  };

  const handleApprove = (orderId) => {
    // call backend function to fulfill the order

    const data = {
      orderStatus: "finished",
      product: [props.product],
    };
    // if resonse is success
    dispatch(addAlbumToCart(data));
    handlePaidFor();

    //refresh useraccount or subscription status

    // if response is error
    //alet()
  };
  if (paidFor) {
    // display success message, modal, or redirect success page
    // console.log("checkoutCart", checkoutCart);
    alert("thank you for purchase");
  }

  if (error) {
    // display error messsage, modal or redirect error page}

    alert(error);
  }

  return (
    <PayPalButtons
      // style={{
      //   color: "silver",
      //   layout: "horizontal",
      //   height: 48,
      //   tagline: false,
      //   shape: "pill",
      // }}

      createOrder={(data, actions) => {
        return actions.order.create({
          /* --------------------------------- example -------------------------------- */
          // purchase_units: [
          //   {
          //     reference_id: "PUHF",
          //     description: "Sporting Goods",

          //     custom_id: "CUST-HighFashions",
          //     soft_descriptor: "HighFashions",
          //     amount: {
          //       currency_code: "USD",
          //       value: "230.00",
          //       breakdown: {
          //         item_total: {
          //           currency_code: "USD",
          //           value: "180.00",
          //         },
          //         shipping: {
          //           currency_code: "USD",
          //           value: "30.00",
          //         },
          //         handling: {
          //           currency_code: "USD",
          //           value: "10.00",
          //         },
          //         tax_total: {
          //           currency_code: "USD",
          //           value: "20.00",
          //         },
          //         shipping_discount: {
          //           currency_code: "USD",
          //           value: "10",
          //         },
          //       },
          //     },
          //     items: [
          //       {
          //         name: "T-Shirt",
          //         description: "Green XL",
          //         sku: "sku01",
          //         unit_amount: {
          //           currency_code: "USD",
          //           value: "90.00",
          //         },
          //         tax: {
          //           currency_code: "USD",
          //           value: "10.00",
          //         },
          //         quantity: "1",
          //         category: "PHYSICAL_GOODS",
          //       },
          //       {
          //         name: "Shoes",
          //         description: "Running, Size 10.5",
          //         sku: "sku02",
          //         unit_amount: {
          //           currency_code: "USD",
          //           value: "45.00",
          //         },
          //         tax: {
          //           currency_code: "USD",
          //           value: "5.00",
          //         },
          //         quantity: "2",
          //         category: "PHYSICAL_GOODS",
          //       },
          //     ],
          //     shipping: {
          //       method: "United States Postal Service",
          //       address: {
          //         name: {
          //           full_name: "John",
          //           surname: "Doe",
          //         },
          //         address_line_1: "123 Townsend St",
          //         address_line_2: "Floor 6",
          //         admin_area_2: "San Francisco",
          //         admin_area_1: "CA",
          //         postal_code: "94107",
          //         country_code: "US",
          //       },
          //     },
          //   },
          // ],
          /* --------------------------------- example -------------------------------- */
          purchase_units: productRendered,
          // {
          //   description: product.description,
          //   amount: { value: product.price },
          // },
          // {
          //   reference_id: "a",
          //   description: "ok computer",
          //   amount: { value: 19 },
          // },
          // {
          //   reference_id: "b",
          //   description: "Dark side",
          //   amount: { value: 19 },
          // },
          // product.map((item) => {
          //   return {
          //     reference_id: item.description,
          //     description: item.description,
          //     amount: { value: item.price },
          //   };
          // }),
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order.capture();
        console.log("order", order);

        handleApprove(data.orderId);
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
