import React from "react";
import Button from "../components/Button.tsx";
import classNames from "classnames";
import { FormikHelpers, useFormik } from "formik"
import { createClientSchema } from "../schemas/index.ts";
import { useAddClientMutation } from "../store/index.ts"

interface ClientFormValues {
  name: string;
}

const ClientForm: React.FC = () => {

  const [addClient, { isLoading }] = useAddClientMutation();

  const handleSubmitForm = async (values: ClientFormValues, actions: FormikHelpers<ClientFormValues>) => {
    await addClient(values)
    actions.resetForm()
  }

  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik<ClientFormValues>({
    initialValues: {
      name: ''
    },
    validationSchema: createClientSchema,
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

      <div className={`${inputContainerClasses} ${ errors.name && touched.name ? 'border border-red-700 mb-8' : ''}`}>
        <label className={inputLabelClasses}>
          Name
        </label>

        <input
          id="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter client name"
          className={inputClasses}
        />

        { errors.name && touched.name && <div className={errorMessageClasses}> { errors.name } </div> }
      </div>

      <Button
        className="w-4/5 md:w-3/5 justify-center m-4 h-12"
        rounded
        disabled={isSubmitting || isLoading}
        type="submit"
      >
        Create Client
      </Button>

    </form>
  );
}
 
export default ClientForm;