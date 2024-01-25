import { Option, ReadClient, ReadStaffMember, Appointment, AppointmentFormValues } from "../interfaces";

export const formatClientsToOptions = (clients: ReadClient[] = []): Option[] => {
  const formattedList = clients.map(client => ({
    key: client.id,
    label: client.name
  }));

  return formattedList
}

export const formatStaffMembersToOptions = (clients: ReadStaffMember[] = []): Option[] => {
  const formattedList = clients.map(staffMember => ({
    key: staffMember.id,
    label: `${staffMember.firstname} ${staffMember.lastname}`
  }));

  return formattedList
}

export const formatAppointmentFormValues = (values: AppointmentFormValues) => {
  const formattedValues: Appointment = {
    startTime: values.startTime!,
    endTime: values.endTime!,
    clientId: values.client!.key,
    staffMemberId: values.staffMember!.key
  }

  return formattedValues
}