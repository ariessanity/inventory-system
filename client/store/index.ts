import { Middleware, combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { api } from "./base-query-api";
import counterReducer from "./slice/counterSlice";
import cartReducer from "./slice/cartSlice";
// import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import storage from "@/config/storage";

const storeMiddlewares: Middleware[] = [];
storeMiddlewares.push(api.middleware);

const persistConfig = {
  timeout: 100,
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  counter: counterReducer,
  cart: persistReducer(persistConfig, cartReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(...storeMiddlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
