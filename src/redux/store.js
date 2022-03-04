import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import productReducer from "./productRedux";
import userlistRedux from "./userlistRedux";
import orderRedux from "./orderRedux";
import incomeRedux from "./incomeRedux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import notificationRedux from "./notificationRedux";
import createProductRedux  from "./createProductRedux";

const persistConfig = {
  key: "root",
  version: 1,
  blacklist: ["userlist"],
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  userlist: userlistRedux,
  order: orderRedux,
  income: incomeRedux,
  notification: notificationRedux,
  create: createProductRedux,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
