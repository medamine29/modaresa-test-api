import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pause = (duration: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

interface Appointment {
  id?: number;
  startTime: Date;
  endTime: Date;
  clientId: number;
  staffMemberId: number;
}

const appointmentsApi = createApi({
  reducerPath: 'appointments',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005/appointments',
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args)
    },
  }),
  tagTypes: ["Appointment"],
  endpoints(builder) {
    return {
      fetchAppointments: builder.query<Appointment[], void>({
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
