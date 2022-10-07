import { configureStore } from "@reduxjs/toolkit";
import recruitmentsReducer from "./reducers/Recruitment/actions";
import authReducer from "./reducers/Auth/actions";

export const store = configureStore({
  reducer: {
    recruitments: recruitmentsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
