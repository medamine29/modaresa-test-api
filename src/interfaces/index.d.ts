export interface Client {
  id?: number;
  name: string;
}

export interface ReadClient extends Required<Client> {}

interface StaffMember {
  id?: number;
  firstname: string;
  lastname: string;
}

export interface ReadStaffMember extends Required<StaffMember> {}

export interface Option {
  key: number;
  label: string;
}

interface Appointment {
  id?: number;
  startTime: Date;
  endTime: Date;
  clientId: number;
  staffMemberId: number;
}

interface ReadAppointment {
  id: number,
  startTime: Date;
  endTime: Date;
  client: ReadClient;
  staffMember: ReadStaffMember;
}

interface AppointmentFormValues {
  startTime?: Date;
  endTime?: Date;
  client?: Option;
  staffMember?: Option;
}