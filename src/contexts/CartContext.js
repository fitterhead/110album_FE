import React, { createContext, useReducer } from "react";
import { useEffect } from "react";

const previousState = JSON.parse(window.localStorage.getItem("cartItem"));
if (previousState === null) {
  window.localStorage.setItem("cartItem", JSON.stringify([]));
}
const initialCartState = {
  items: previousState.items || [],
  // items: [],
};

const ADD_TO_CART = "THEME.ADD_TO_CART";

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
        // items: state.items.push(action.payload),
      };

    default:
      return state;
  }
};

const CartContext = createContext({ ...initialCartState });

// const setSession = (cartItem) => {
//   if (!cartItem) {
//     window.localStorage.setItem("cartItem", cartItem);
//   } else {
//     window.localStorage.removeItem("cartItem");
//   }
// };

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialCartState);

  //   useEffect(() => {
  //     const initialize = async () => {
  //       try {
  //         console.log("initialize running");
  //         // 1.lay accessToken tu localStorage
  //         const cartItem = window.localStorage.getItem("cartItem");
  //         //  2. Check xem cartItem co gia tri? cartItem co valid?
  //         if (cartItem) {
  //           //2.1 neu co, set token vao header bang setSession ()
  //           setSession(state);
  //           //2.3 gui token cho server de lay thong tin nguoi dung

  //           //2.4. sau khi co dc data, dispatch () de luu data do vao state
  //         } else {
  //           setSession(null);
  //         }
  //       } catch (error) {
  //         // neu ko co token, session  = null va dispatch voi authenticated = false
  //         console.log(error);
  //       }
  //     };

  //     initialize();
  //   }, []);

  useEffect(() => {
    //state = items[], moi lan state thay doi (them item), thi set item[] moi vao localStorage
    //refresh => item[] = 0, neu set item[] = 0 nay vao localStorage thi localStorage mat het
    //tao them 1 initialized field

    /* -------------------------------------------------------------------------- */
    /*                        persistent cart when refresh                        */
    /* -------------------------------------------------------------------------- */
    const previousState = JSON.parse(window.localStorage.getItem("cartItem"));
    // console.log("previousState", previousState.items);
    if (previousState) {
      if (state.items.length) {
        window.localStorage.setItem("cartItem", JSON.stringify(state));
      }
    } else window.localStorage.setItem("cartItem", JSON.stringify(state));
  }, [state]);

  const addToCart = async (album) => {
    dispatch({
      type: ADD_TO_CART,
      payload: album,
    });
  };

  return (
    <CartContext.Provider value={{ ...state, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
