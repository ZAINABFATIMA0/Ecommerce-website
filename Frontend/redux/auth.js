import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: null,
  token: "",
  user_id: null, 
  role: null,
};



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { user, token,} = action.payload;
      state.user = user;
      state.token = token;
      state.user_id = user ? user.id : null;
      state.role = user ? user.role : null;

    },
    
    clearAuth: (state) => {
      state.user = null;
      state.token = "";
      state.user_id = null;
      state.role = null;
      localStorage.removeItem("auth");
    },
  },
});

export const initAuthFromLocalStorage = () => (dispatch) => {
  const data = localStorage.getItem("auth");
  if (data) {
    const parseData = JSON.parse(data);
    dispatch(setAuth(parseData));
    
  }
};

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
