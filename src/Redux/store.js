import { configureStore } from "@reduxjs/toolkit";
import MangaSlice from "./MangaSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    readMangas: MangaSlice,
    auth: authSlice,
  },
});
