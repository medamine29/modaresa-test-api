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
  endpoints(builder) {
    return {
      fetchClients: builder.query<Client[], void>({
        query: () => {
          return {
            url: '/all',
            method: 'GET',
          };
        },
      })
    };
  },
});

export const { useFetchClientsQuery } = clientsApi;
export { clientsApi };
