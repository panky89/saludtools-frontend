interface Meta {
  total: number
  per_page: number
  current_page: number
  last_page: number
  first_page: number
  first_page_url: string
  last_page_url: string
  next_page_url: string
  previous_page_url: string | number
}

export interface ApiResponse<T> {
  meta: Meta
  data: T[]
}

export interface Specification {
  page: number
  per_page: number
  order_by: string
  order_type: string
}
