import * as yup from "yup"

const alphabeticalRegex = /^[A-Za-z]+$/

export const signupSchema = yup.object().shape({
  username: yup.string().min(3).matches(alphabeticalRegex, "Le nom ne peut contenir que des lettres").required("Ce champs est requis"),
  email: yup.string().email("Veuillez saisir un email valide").required("Ce champs est requis"),
  password: yup.string().min(8, "Le mot de passe de doit être au moins de longueur 8 ").required("Ce champs est requis"),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Les mots de passes ne concordent pas").required("Ce champs est requis")
})

export const createClientSchema = yup.object().shape({
  name: yup.string()
    .min(3, "Name must be at least 3 characters long")
    .matches(alphabeticalRegex, "Name can only contain characters")
    .required("This field is required")
})