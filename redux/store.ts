import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./task/index";

const store = configureStore({
  devTools: true,
  reducer: {
    task: taskReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;
