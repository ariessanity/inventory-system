import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../product/types";

interface CartState {
  cart: Partial<Product>[];
  totalPrice: number;
}

const initialState: CartState = {
  cart: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Partial<Product>>) => {
      const { _id, quantity, price } = action.payload;
      const existingItem = state.cart.find((item) => item._id === _id);

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item._id === _id
              ? { ...item, quantity: (item.quantity || 0) + (quantity || 1) }
              : item
          ),
          totalPrice: state.totalPrice + (price || 0) * (quantity || 1),
        };
      } else {
        return {
          ...state,
          cart: [action.payload, ...state.cart],
          totalPrice: state.totalPrice + (price || 0) * (quantity || 1),
        };
      }
    },
    increaseQuantity: (state, action: PayloadAction<string | undefined>) => {
      const itemToIncrease = state.cart.find(
        (item) => item._id === action.payload
      );
      if (itemToIncrease) {
        (itemToIncrease as Product).quantity += 1;
        state.totalPrice += itemToIncrease?.price || 0;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string | undefined>) => {
      const itemToDecrease = state.cart.find(
        (item) => item._id === action.payload
      );
      if (itemToDecrease && (itemToDecrease as Product).quantity > 1) {
        (itemToDecrease as Product).quantity -= 1;
        state.totalPrice -= itemToDecrease?.price || 0;
      }
    },
    removeCartItem: (state, action: PayloadAction<string | undefined>) => {
      const itemIdToRemove = action.payload;
      const itemToRemove = state.cart.find(
        (item) => item._id === itemIdToRemove
      );

      if (!itemToRemove) {
        return state;
      }

      const updatedCart = state.cart.filter(
        (item) => item._id !== itemIdToRemove
      );
      const totalPriceChange =
        (itemToRemove.price || 0) * (itemToRemove.quantity || 0);

      return {
        ...state,
        cart: updatedCart,
        totalPrice: state.totalPrice - totalPriceChange,
      };
    },
    clearCart: (state) => {
      return {
        ...state,
        cart: [],
        totalPrice: 0,
      };
    },
  },
});

export const {
  addToCart,
  removeCartItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
