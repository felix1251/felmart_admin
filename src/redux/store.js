import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import productReducer from "./productRedux";
import userlistRedux from "./userlistRedux";
import orderRedux from "./orderRedux";
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

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// const rootReducer = combineReducers({
//   user: userReducer,
//   product: productReducer,
//   userlist: userlistRedux,
//   order: orderRedux,
// });

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: { user: persistedReducer, product: productReducer, userlist: userlistRedux, order: orderRedux },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
