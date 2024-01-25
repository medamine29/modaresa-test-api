import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pause = (duration: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

interface StaffMember {
  id?: number;
  firstname: string;
  lastname: string;
}

const staffMembersApi = createApi({
  reducerPath: 'staffMembers',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005/staff-members',
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args)
    },
  }),
  tagTypes: ["Staff-Member"],
  endpoints(builder) {
    return {
      fetchStaffMembers: builder.query<StaffMember[], void>({
        query: () => {
          return {
            url: '/all',
            method: 'GET',
          };
        },
        providesTags: ['Staff-Member'],
      }),
      addStaffMember: builder.mutation<StaffMember, Partial<StaffMember>>({
        query: (newStaffMember) => {
          return {
            url: '/',
            method: 'POST',
            body: newStaffMember,
          };
        },
        invalidatesTags: [ "Staff-Member" ],
      }),
    };
  },
});

export const { useFetchStaffMembersQuery, useAddStaffMemberMutation } = staffMembersApi;
export { staffMembersApi };
