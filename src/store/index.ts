import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Reducer } from 'redux';
import { clientsApi } from "./apis/clientsApi.ts";

const reducers = {
  [clientsApi.reducerPath]: clientsApi.reducer
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export const rootReducer: Reducer<RootState> = (
  state,
  action
 ) => {
  return combinedReducer(state, action);
 };

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat([
        clientsApi.middleware,
      ])
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combinedReducer>;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useFetchClientsQuery, useAddClientMutation } from "./apis/clientsApi.ts"