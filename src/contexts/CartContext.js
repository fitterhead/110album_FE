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
const DELETE_ITEM = "THEME.DELETE_ITEM";
const INCREASE_QUANTITY = "THEME.INCREASE_QUANTITY";
const DECREASE_QUANTITY = "THEME.DECREASE_QUANTITY";

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const productInCart = state.items.find(
        (p) => p.reference_id === action.payload.reference_id
      );

      if (!productInCart) {
        return {
          items: [...state.items, action.payload],
        };
      } else {
        // productInCart.quantity = productInCart.quantity + 1;

        let newState = state.items;
        const updatedIndex = newState.findIndex(
          (p) => p.reference_id === action.payload.reference_id
        );
        if (!newState[updatedIndex].amount) {
          newState[updatedIndex].amount = 2;
          newState[updatedIndex].price = 19 * 2;
        } else {
          newState[updatedIndex].amount += 1;
          newState[updatedIndex].price = 19 * newState[updatedIndex].amount;
        }
        return {
          items: [...newState],
        };
      }

    case DELETE_ITEM:
      const deleteItem = state.items.findIndex(
        (album) => album.reference_id === action.payload
      );
      console.log(deleteItem, "action payload");

      const newState = state.items.splice(deleteItem, 1);

      console.log(state.items, "oldState");
      console.log(newState, "newState");

      return {
        items: [...state.items],
      };

    case INCREASE_QUANTITY:
      let updatedState = state.items;
      const updateItem = state.items.findIndex(
        (album) => album.reference_id === action.payload
      );
      console.log(action.payload, "action payload");

      if (!updatedState[updateItem].amount) {
        updatedState[updateItem].amount = 2;
        updatedState[updateItem].amount = 19 * 2;
      } else {
        updatedState[updateItem].amount = updatedState[updateItem].amount + 1;
        updatedState[updateItem].price = 19 * updatedState[updateItem].amount;
      }
      console.log("updatedState", updatedState);

      return {
        items: [...updatedState],
      };

    case DECREASE_QUANTITY:
      let decreaseState = state.items;
      const decreaseItem = state.items.findIndex(
        (album) => album.reference_id === action.payload
      );
      console.log(action.payload, "action payload");

      if (!decreaseState[decreaseItem].amount) {
        decreaseState[decreaseItem].amount = 1;
        decreaseState[decreaseItem].price = 19;
      } else {
        decreaseState[decreaseItem].amount =
          decreaseState[decreaseItem].amount - 1;
          decreaseState[decreaseItem].price = 19 * decreaseState[decreaseItem].amount;
      }
      console.log("decreaseState", decreaseState);
      return {
        items: [...decreaseState],
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
  const deleteItem = async (albumId) => {
    dispatch({
      type: DELETE_ITEM,
      payload: albumId,
    });
  };

  const increaseQuantity = async (id) => {
    dispatch({
      type: INCREASE_QUANTITY,
      payload: id,
    });
  };
  const decreaseQuantity = async (id) => {
    dispatch({
      type: DECREASE_QUANTITY,
      payload: id,
    });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        deleteItem,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
