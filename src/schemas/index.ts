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

