import React from "react";
import Button from "../components/Button.tsx";
import classNames from "classnames";
import { FormikHelpers, useFormik } from "formik"
import { createStaffMemberSchema } from "../schemas/index.ts";
import { useAddStaffMemberMutation } from "../store/index.ts"

interface StaffMemberFormValues {
  firstname: string;
  lastname: string;
}

const StaffMemberForm: React.FC = () => {

  const [addStaffMember, { isLoading }] = useAddStaffMemberMutation();

  const handleSubmitForm = async (values: StaffMemberFormValues, actions: FormikHelpers<StaffMemberFormValues>) => {
    await addStaffMember(values)
    actions.resetForm()
  }

  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik<StaffMemberFormValues>({
    initialValues: {
      firstname: '',
      lastname: ''
    },
    validationSchema: createStaffMemberSchema,
    onSubmit: handleSubmitForm
  })

  const inputContainerClasses = classNames('relative flex flex-col p-2 m-2 bg-gray-200 w-4/5 md:w-3/5 gap-1 h-16 rounded')
  const inputLabelClasses = classNames('font-semibold')
  const inputClasses = classNames('bg-transparent focus:outline-none')
  const errorMessageClasses = classNames('text-sm text-red-700')

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center p-4"
    >
      <div className="text-3xl my-4 font-bold w-4/5 md:w-3/5 text-center">
        Create 
      </div>

      <div className={`${inputContainerClasses} ${ errors.firstname && touched.firstname ? 'border border-red-700 mb-8' : ''}`}>
        <label className={inputLabelClasses}>
          Firstname
        </label>

        <input
          id="firstname"
          value={values.firstname}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter staff member firstname"
          className={inputClasses}
        />

        { errors.firstname && touched.firstname && <div className={errorMessageClasses}> { errors.firstname } </div> }
      </div>

      <div className={`${inputContainerClasses} ${ errors.lastname && touched.lastname ? 'border border-red-700 mb-8' : ''}`}>
        <label className={inputLabelClasses}>
          Lastname
        </label>

        <input
          id="lastname"
          value={values.lastname}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter staff member lastname"
          className={inputClasses}
        />

        { errors.lastname && touched.lastname && <div className={errorMessageClasses}> { errors.lastname } </div> }
      </div>

      <Button
        className="w-4/5 md:w-3/5 justify-center m-4 h-12"
        rounded
        disabled={isSubmitting || isLoading}
        type="submit"
      >
        Create Staff Member
      </Button>

    </form>
  );
}
 
export default StaffMemberForm;