import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyword: "",
  results: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    clearSearch: (state) => {
      state.keyword = "";
      state.results = [];
    },
  },
});

export const { setKeyword, setResults, clearSearch } = searchSlice.actions;

export default searchSlice.reducer;
