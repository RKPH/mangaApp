import { createSlice } from "@reduxjs/toolkit";

// Load the initial state from localStorage
const initialState = JSON.parse(localStorage.getItem("readMangas")) || [];

const readMangasSlice = createSlice({
  name: "readMangas",
  initialState,
  reducers: {
    addManga: (state, action) => {
      const mangaExists = state.some(
        (manga) => manga._id === action.payload._id
      );
      // If it doesn't exist, add it to the state
      if (!mangaExists) {
        return [...state, action.payload];
      }
      return state;
    },
    saveMangas: (state) => {
      // Save the current state to localStorage
      localStorage.setItem("readMangas", JSON.stringify(state));
      return state;
    },
    deleteManga: (state, action) => {
      // Filter out the manga with the given _id
      return state.filter((manga) => manga._id !== action.payload._id);
    },
  },
});

export const { addManga, saveMangas, deleteManga } = readMangasSlice.actions;

export default readMangasSlice.reducer;
