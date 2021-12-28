import { useFetch } from '@vueuse/core'
import { AppointmentType } from '@/types/AppointmentType'

const API_URL = import.meta.env.VITE_API_URL + '/appointment_types'

export default function () {
  const { data, execute, isFetching } = useFetch(API_URL, { refetch: true })
    .get()
    .json<AppointmentType[]>()

  return {
    appointments: data,
    getAppointments: execute,
    isFetching,
  }
}
