// features/readMangasSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Load the initial state from localStorage
const initialState = JSON.parse(localStorage.getItem('readMangas')) || [];

const readMangasSlice = createSlice({
  name: 'readMangas',
  initialState,
  reducers: {
    addManga: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addManga } = readMangasSlice.actions;

export default readMangasSlice.reducer;
