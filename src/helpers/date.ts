import dayjs from 'dayjs'

export const formatDate = (value: string | Date, format = 'YYYY-MM-DD') => {
  if (!value) return value

  return dayjs(value).format(format)
}
