import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Reducer } from 'redux';
import { clientsApi } from "./apis/clientsApi.ts";
import { staffMembersApi } from "./apis/staffMemberApi.ts";
import { appointmentsApi } from "./apis/appointmentApi.ts";

const reducers = {
  [clientsApi.reducerPath]: clientsApi.reducer,
  [staffMembersApi.reducerPath]: staffMembersApi.reducer,
  [appointmentsApi.reducerPath]: appointmentsApi.reducer
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
        staffMembersApi.middleware,
        appointmentsApi.middleware
      ])
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combinedReducer>;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useFetchClientsQuery, useAddClientMutation } from "./apis/clientsApi.ts"
export { useFetchStaffMembersQuery, useAddStaffMemberMutation } from "./apis/staffMemberApi.ts"
export { useFetchAppointmentsQuery, useAddAppointmentMutation } from "./apis/appointmentApi.ts"