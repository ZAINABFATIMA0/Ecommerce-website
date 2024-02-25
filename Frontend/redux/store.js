import { configureStore } from '@reduxjs/toolkit';
import authReducer , { initAuthFromLocalStorage } from'./auth'
import cartSlice from './cartSlice';
import searchslice from './search'



const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartSlice,
    search: searchslice
   
    

  },
});
store.dispatch(initAuthFromLocalStorage());

export default store;