import * as yup from 'yup'

import { useForm } from 'vee-validate'
import { useFetch } from '@vueuse/core'

import { CreateAppointmentTypeRequest } from '@/types/AppointmentType'

const API_URL = import.meta.env.VITE_API_URL + '/appointment_types'

export default function () {
  const validationSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    duration: yup.number().positive().integer().required(),
    color: yup.string().required(),
  })
  const initialValues = {
    name: '',
    description: '',
    duration: 30,
    color: '#ffffff',
  }
  const form = useForm<CreateAppointmentTypeRequest>({
    validationSchema,
    initialValues,
  })
  const { execute, isFetching } = useFetch(API_URL, { immediate: false })
    .post(form.values)
    .json()

  return {
    form,
    isFetching,
    createAppointment: execute,
  }
}
