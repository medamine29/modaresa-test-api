import React, { ReactNode } from "react";
import { useFetchStaffMembersQuery } from "../store/index.ts";
import Skeleton from "../components/Skeleton.tsx"
import StaffMemberForm from "../forms/StaffMember-form.tsx";

const StaffMembers = () => {
  const { data, isFetching, error } = useFetchStaffMembersQuery()

  if (error) return <div> Une erreur s'est produite </div>

  let renderedStaffMembers: ReactNode

  if (isFetching) renderedStaffMembers = <Skeleton times={4} className="h-8 w-20" />
  else renderedStaffMembers = data?.map(StaffMember => <div key={StaffMember.id} className="font-thin"> { `${StaffMember.firstname} ${StaffMember.lastname}` }  </div>)

  return (
    <div className="w-full flex p-4">

      <div className="w-1/4">
        <div className="text-lg underline font-bold"> Staff Members : </div>
        <div className="flex flex-col gap-2">
          { renderedStaffMembers }
        </div>
      </div>

      <div className="w-3/4 flex flex-col items-center border-l-2 px-4">
        <StaffMemberForm />
      </div>
      
    </div>
  );
}
 
export default StaffMembers;