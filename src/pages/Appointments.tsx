import React, { ReactNode } from "react";
import { useFetchAppointmentsQuery } from "../store/index.ts";
import Skeleton from "../components/Skeleton.tsx"
import AppointmentForm from "../forms/Appointment-form.tsx";

const Appointments: React.FC = () => {

  const { data, isFetching, error } = useFetchAppointmentsQuery()

  if (error) return <div> Une erreur s'est produite </div>


  return (
    <div className="w-full flex p-4">

      <div className="w-1/4">
        <div className="text-lg underline font-bold"> Appointments : </div>
        <div className="flex flex-col gap-2">
          { }
        </div>
      </div>

      <div className="w-3/4 flex flex-col items-center border-l-2 px-4">
        <AppointmentForm />
      </div>
      
    </div>
  );

}
 
export default Appointments;