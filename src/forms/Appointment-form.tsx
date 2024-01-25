import React, { ReactNode } from "react";
import Button from "../components/Button.tsx";
import classNames from "classnames";
import { FormikHelpers, useFormik } from "formik"
import { createAppointmentSchema } from "../schemas/index.ts";
import { useAddAppointmentMutation, useFetchClientsQuery, useFetchStaffMembersQuery } from "../store/index.ts"
import { DateTimePicker } from 'react-rainbow-components';
import Dropdown from "../components/Dropdown.tsx";
import { Option, AppointmentFormValues } from "../interfaces/index.ts";
import { formatClientsToOptions, formatStaffMembersToOptions, formatAppointmentFormValues } from "../helpers/formatter.helper.ts";

const AppointmentForm: React.FC = () => {

  const { data: clientsData } = useFetchClientsQuery()
  const { data: clientsStaffMembers } = useFetchStaffMembersQuery()
  const [addAppointment, { isLoading }] = useAddAppointmentMutation();

  const clientsOptions: Option[] = formatClientsToOptions(clientsData)
  const staffMembersOptions: Option[] = formatStaffMembersToOptions(clientsStaffMembers)

  const handleSubmitForm = async (values: AppointmentFormValues, actions: FormikHelpers<AppointmentFormValues>) => {
    const formattedValues = formatAppointmentFormValues(values)
    await addAppointment(formattedValues)
    actions.resetForm()
  }

  const { values, errors, touched, isSubmitting, setFieldValue, handleSubmit } = useFormik<AppointmentFormValues>({
    initialValues: {
      startTime: new Date(),
      endTime: new Date()
    },
    validationSchema: createAppointmentSchema,
    onSubmit: handleSubmitForm
  })

  const inputContainerClasses = classNames('relative flex flex-col p-2 m-2 bg-gray-200 w-4/5 md:w-3/5 gap-1 h-20 rounded')
  const inputLabelClasses = classNames('font-semibold')
  const inputClasses = classNames('bg-transparent focus:outline-none')
  const errorMessageClasses = classNames('text-sm text-red-700')

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center p-4"
    >
      <div className="text-3xl my-4 font-bold w-4/5 md:w-3/5 text-center">
        New Appointment
      </div>

      <div className={`${inputContainerClasses} ${ errors.startTime && touched.startTime ? 'border border-red-700 mb-8' : ''}`}>
        <label className={inputLabelClasses}>
          Start Time
        </label>

        <DateTimePicker
          id="startTime"
          value={values.startTime}
          onChange={(value) => { setFieldValue("startTime", new Date(value)) }}
          className={inputClasses}
          placeholder="Enter start time"
        />

        { errors.startTime && touched.startTime && <div className={errorMessageClasses}> { errors.startTime as ReactNode } </div> }
      </div>

      <div className={`${inputContainerClasses} ${ errors.endTime && touched.endTime ? 'border border-red-700 mb-8' : ''}`}>
        <label className={inputLabelClasses}>
          End Time
        </label>

        <DateTimePicker
          id="endTime"
          value={values.endTime}
          onChange={(value) => { setFieldValue("endTime", new Date(value)) }}
          className={inputClasses}
          placeholder="Enter end time"
        />

        { errors.endTime && touched.endTime && <div className={errorMessageClasses}> { errors.endTime as ReactNode } </div> }
      </div>

      <div className={`${inputContainerClasses} ${ errors.client && touched.client ? 'border border-red-700 mb-8' : ''}`}>
        <label className={inputLabelClasses}>
          Client
        </label>

        <Dropdown
          value={values.client}
          options={clientsOptions}
          onChange={(value) => { setFieldValue("client", value) }}
          className={inputClasses}
          placeholder="Select client"
        />

        { errors.client && <div className={errorMessageClasses}> { errors.client as ReactNode } </div> }
      </div>
      
      <div className={`${inputContainerClasses} ${ errors.staffMember && touched.staffMember ? 'border border-red-700 mb-8' : ''}`}>
        <label className={inputLabelClasses}>
          Client
        </label>

        <Dropdown
          value={values.staffMember}
          options={staffMembersOptions}
          onChange={(value) => { setFieldValue("staffMember", value) }}
          className={inputClasses}
          placeholder="Select staff member"
        />
        
        { errors.staffMember && <div className={errorMessageClasses}> { errors.staffMember as ReactNode } </div> }
      </div>

      <Button
        className="w-4/5 md:w-3/5 justify-center m-4 h-12"
        rounded
        disabled={isSubmitting || isLoading}
        type="submit"
      >
        Create Appointment
      </Button>

    </form>
  );
}
 
export default AppointmentForm;