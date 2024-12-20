import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import screen from './screen';
import modal from './modal';
import app from './app';
import chart from './chart/signalsSlice.js';
import search from './search/search';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['screen', 'modal', 'auth'],
};

const appReducer = combineReducers({
  screen,
  modal,
  app,
  chart,
  search,
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof appReducer>;

const reducer = (state: RootState | undefined, action: AnyAction) => {
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
