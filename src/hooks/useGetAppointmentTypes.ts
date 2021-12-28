import { computed, Ref, ref } from 'vue'
import { useFetch } from '@vueuse/core'

import { ApiResponse, Specification } from '@/types/Api'
import { AppointmentType } from '@/types/AppointmentType'

const API_URL = import.meta.env.VITE_API_URL + '/appointment_types'

export default function () {
  const params: Ref<Specification> = ref({
    page: 1,
    per_page: 10,
    order_by: 'created_at',
    order_type: 'desc',
  })

  const apiUrl = computed(() => {
    const queryString = Object.keys(params.value)
      .map((key) => {
        const data = params.value as any
        return `${key}=${data[key]}`
      })
      .join('&')
    return API_URL + '?' + queryString
  })

  const { data, execute, isFetching } = useFetch(apiUrl, { refetch: true })
    .get()
    .json<ApiResponse<AppointmentType>>()

  return {
    meta: computed(() => data.value?.meta),
    appointmentTypes: computed(() => data.value?.data || []),
    getAppointmentTypes: execute,
    isFetching,
    params,
  }
}
