import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StaffMember, ReadStaffMember } from "../../interfaces/index.ts"

const staffMembersApi = createApi({
  reducerPath: 'staffMembers',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005/staff-members'
  }),
  tagTypes: ["Staff-Member"],
  endpoints(builder) {
    return {
      fetchStaffMembers: builder.query<ReadStaffMember[], void>({
        query: () => {
          return {
            url: '/all',
            method: 'GET',
          };
        },
        providesTags: ['Staff-Member'],
      }),
      addStaffMember: builder.mutation<ReadStaffMember, Partial<ReadStaffMember>>({
        query: (newStaffMember: StaffMember) => {
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
