import { createSlice } from "@reduxjs/toolkit";
import { useSelector} from 'react-redux';

const loadCartFromLocalStorage = () => {
  const cartItems = localStorage.getItem("cart");
  return cartItems ? JSON.parse(cartItems) : [];
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    setCart: (state, action) => {
      return action.payload;
    },
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.find(item => item.description === newItem.description);

      if (existingItem) {
        alert('This item is already in your cart.');
      } else {
        state.push(newItem);
        saveCartToLocalStorage(state);
      }
    },updateCartItem: (state, action) => {
        const { description, quantity, price } = action.payload;
        const itemToUpdate = state.find(item => item.description === description);
  
        if (itemToUpdate) {
          itemToUpdate.quantity = quantity;
          itemToUpdate.price = price;
          saveCartToLocalStorage(state);
        }
      },
    clearCart: () => [], 
  },
});

export const useCart = () => useSelector(state => state.cart);

export const { setCart, addItemToCart, clearCart,updateCartItem } = cartSlice.actions;
export default cartSlice.reducer;
