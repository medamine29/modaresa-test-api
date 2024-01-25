import * as yup from "yup"

const alphabeticalRegex = /^[A-Za-z]+$/

export const createClientSchema = yup.object().shape({
  name: yup.string()
    .min(3, "Name must be at least 3 characters long")
    .matches(alphabeticalRegex, "Name can only contain characters")
    .required("This field is required")
})

export const createStaffMemberSchema = yup.object().shape({
  firstname: yup.string()
    .min(3, "Firstname must be at least 3 characters long")
    .matches(alphabeticalRegex, "Firstname can only contain characters")
    .required("This field is required"),
  lastname: yup.string()
    .min(3, "Lastname must be at least 3 characters long")
    .matches(alphabeticalRegex, "Firstname can only contain characters")
    .required("This field is required")
})

export const createAppointmentSchema = yup.object().shape({
  startTime: yup.date().required("This field is required"),
  endTime: yup.date().required("This field is required")
    .test('is-greater-than-start', 'End time must be greater than start time', (value, context) => value < context.parent.startTime),
  clientId: yup.number().required("This field is required"),
  staffMemberId: yup.number().required("This field is required")
})

