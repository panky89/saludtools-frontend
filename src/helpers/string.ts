export const trunc = (value: string, n = 30) => {
  if (!value) return ''
  if (value.length < n) return value

  return value.substring(0, n) + '...'
}
