import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/vue'
import DataTable from './DataTable.vue'

describe('DataTable', () => {
  it('should render an empty data message', () => {
    render(DataTable, { props: { data: [] } })

    expect(screen.getByText(/No hay registro/i)).toBeInTheDocument()
  })
})
