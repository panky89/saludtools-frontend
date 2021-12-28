import { useFetch } from '@vueuse/core'

const API_URL = import.meta.env.VITE_API_URL + '/appointment_types'

export default function (id: number) {
  const apiUrl = `${API_URL}/${id}`
  const { execute, isFetching } = useFetch(apiUrl, { immediate: false })
    .delete()
    .json()

  return {
    isFetching,
    removeAppointment: execute,
  }
}
