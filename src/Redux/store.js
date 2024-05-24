import { configureStore } from "@reduxjs/toolkit";
import MangaSlice from "./MangaSlice";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
export const store = configureStore({
  reducer: {
    readMangas: MangaSlice,
    auth: authSlice,
    user: userSlice,
  },
});
