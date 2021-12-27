export const clone = (data: any) => JSON.parse(JSON.stringify(data))

export const orderBy = (data: any, field: string, asc: 'asc' | 'desc') =>
  clone(data).sort((a: any, b: any) => {
    if (asc === 'asc') {
      if (a[field] < b[field]) return 1
      if (a[field] > b[field]) return -1
    } else {
      if (a[field] > b[field]) return 1
      if (a[field] < b[field]) return -1
    }

    return 0
  })
