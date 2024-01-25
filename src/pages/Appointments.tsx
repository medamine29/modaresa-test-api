import React from "react";
import { useFetchAppointmentsQuery } from "../store/index.ts";
import AppointmentForm from "../forms/Appointment-form.tsx";
import { WeeklyCalendar } from 'react-rainbow-components';
import { CalendarEvent } from "react-rainbow-components/components/WeeklyCalendar/index";
import Skeleton from "../components/Skeleton.tsx"

const Appointments: React.FC = () => {

  const { data, isFetching, error } = useFetchAppointmentsQuery()

  if (error) return <div> Une erreur s'est produite </div>

  if (isFetching) return <div className="w-screen p-4"> <Skeleton times={1} className="w-full h-screen" /> </div>

  const appintmentsEvents: Array<CalendarEvent> | undefined = data?.map(appointment => ({
    id: appointment.id.toString(),
    title: "Meeting",
    description: "desc",
    startDate: new Date(appointment.startTime),
    endDate: new Date(appointment.endTime)
  }))

  return (
    <div className="w-full flex flex-col p-4">

      <div className="w-full">
        <div className="">
          <WeeklyCalendar
            events={appintmentsEvents}
            locale="en-US"
          />
        </div>
      </div>

      <div className="w-full flex flex-col items-center border-l-2 px-4">
        <AppointmentForm />
      </div>
      
    </div>
  );

}
 
export default Appointments;