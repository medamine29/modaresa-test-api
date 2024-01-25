import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pause = (duration: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

interface Client {
  id?: number;
  name: string;
}

const clientsApi = createApi({
  reducerPath: 'deals',
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
      fetchClients: builder.query<Client[], void>({
        query: () => {
          return {
            url: '/all',
            method: 'GET',
          };
        },
        providesTags: ['Client'],
      }),
      addClient: builder.mutation<Client, Partial<Client>>({
        query: (newClient) => {
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
