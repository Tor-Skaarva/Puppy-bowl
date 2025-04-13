import { configureStore } from "@reduxjs/toolkit";
import puppyApi from ".././features/puppies/puppySlice";
import api from "./api";

// TODO: configure the store to use the API slice's auto-generated reducer and custom middleware.
const store = configureStore({
  reducer: { [puppyApi.reducerPath]: puppyApi.reducer },
  middleware: (getDefaultMiddlewear) =>
    getDefaultMiddlewear().concat(api.middleware),
});

export default store;
