import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Appointment, ReadAppointment } from "../../interfaces/index.ts"

const appointmentsApi = createApi({
  reducerPath: 'appointments',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005/appointments',
  }),
  tagTypes: ["Appointment"],
  endpoints(builder) {
    return {
      fetchAppointments: builder.query<ReadAppointment[], void>({
        query: () => {
          return {
            url: '/all',
            method: 'GET',
          };
        },
        providesTags: ['Appointment'],
      }),
      addAppointment: builder.mutation<Appointment, Partial<Appointment>>({
        query: (newAppointment) => {
          return {
            url: '/',
            method: 'POST',
            body: newAppointment,
          };
        },
        invalidatesTags: [ "Appointment" ],
      }),
    };
  },
});

export const { useFetchAppointmentsQuery, useAddAppointmentMutation } = appointmentsApi;
export { appointmentsApi };
