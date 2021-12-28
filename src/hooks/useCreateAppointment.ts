import * as yup from 'yup'
import { useForm } from 'vee-validate'

import { CreateAppointmentRequest } from '@/types/Appointment'

export default function () {
  const validationSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    duration: yup.number().positive().integer().required(),
  })
  const initialValues = {
    name: '',
    description: '',
    duration: 30,
  }
  const form = useForm<CreateAppointmentRequest>({
    validationSchema,
    initialValues,
  })

  return {
    ...form,
  }
}
