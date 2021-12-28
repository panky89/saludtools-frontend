export interface AppointmentType {
  active: boolean
  color: string
  created_at: string
  description: string
  duration: number
  id: number
  updated_at: string
  name: string
}

export interface CreateAppointmentTypeRequest {
  name: string
  description: string
  duration: number | null
}
