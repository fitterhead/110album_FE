import React, { createContext, useReducer } from "react";

const initialCartState = {
  items: [],
  totalPrice: 0,
};

const ADD_TO_CART = "THEME.ADD_TO_CART";

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    default:
      return state;
  }
};

const CartContext = createContext({ ...initialCartState });

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialCartState);

  const addToCart = async ({ album }) => {
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
