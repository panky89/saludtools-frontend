import * as yup from 'yup'

import { useForm } from 'vee-validate'
import { useFetch } from '@vueuse/core'

import { UpdateAppointmentTypeRequest } from '@/types/AppointmentType'

const API_URL = import.meta.env.VITE_API_URL + '/appointment_types'

export default function (
  id: number,
  initialValues: UpdateAppointmentTypeRequest
) {
  const validationSchema = yup.object({
    name: yup.string().optional(),
    description: yup.string().optional(),
    duration: yup.number().positive().integer().optional(),
    color: yup.string().optional(),
    active: yup.boolean().optional(),
  })
  const form = useForm<UpdateAppointmentTypeRequest>({
    validationSchema,
    initialValues,
  })

  const apiUrl = `${API_URL}/${id}`
  const { execute, isFetching } = useFetch(apiUrl, { immediate: false })
    .put(form.values)
    .json()

  return {
    form,
    isFetching,
    updateAppointment: execute,
  }
}
