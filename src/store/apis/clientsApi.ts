import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Client, ReadClient } from "../../interfaces";

const pause = (duration: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

const clientsApi = createApi({
  reducerPath: 'clients',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005/clients',
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args)
    },
  }),
  tagTypes: ["Client"],
  endpoints(builder) {
    return {
      fetchClients: builder.query<ReadClient[], void>({
        query: () => {
          return {
            url: '/all',
            method: 'GET',
          };
        },
        providesTags: ['Client'],
      }),
      addClient: builder.mutation<ReadClient, Partial<ReadClient>>({
        query: (newClient: Client) => {
          return {
            url: '/',
            method: 'POST',
            body: newClient,
          };
        },
        invalidatesTags: [ "Client" ],
      }),
    };
  },
});

export const { useFetchClientsQuery, useAddClientMutation } = clientsApi;
export { clientsApi };
