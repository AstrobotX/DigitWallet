import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import loadersReducer from "./loadersSlice";

const store = configureStore({
  reducer: {
    loaders: loadersReducer,
    users: usersReducer,
  },
});

export default store;
