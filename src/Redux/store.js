import { configureStore } from '@reduxjs/toolkit';
import MangaSlice from './MangaSlice';

export const store = configureStore({
  reducer: {
    readMangas: MangaSlice,
  },
});

// Function to save the state to localStorage
store.subscribe(() => {
    localStorage.setItem('readMangas', JSON.stringify(store.getState().readMangas));
  });