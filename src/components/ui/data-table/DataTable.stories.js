import DataTable from './DataTable.vue'
import Column from './Column.vue'

const data = [
  {
    id: 1,
    name: 'Medicina General Pirmera Vez 2',
    description: '....',
    color: '#ff00ff',
    duration: 120,
    active: false,
    created_at: '2021-12-28',
    updated_at: '2021-12-24 14:00:00',
  },
  {
    id: 2,
    name: 'Medicina General Pirmera Vez 3',
    description: '....',
    color: '#ff00ff',
    duration: 120,
    active: false,
    created_at: '2021-12-28',
    updated_at: '2021-12-24 14:00:00',
  },
  {
    id: 3,
    name: 'Medicina General Pirmera Vez 1',
    description: '....',
    color: '#ff00ff',
    duration: 120,
    active: false,
    created_at: '2021-12-28',
    updated_at: '2021-12-24 14:00:00',
  },
]

export default {
  title: 'Example/DataTable',
  component: DataTable,
  argTypes: {},
}

const Template = (args) => ({
  components: { DataTable, Column },
  setup() {
    return { args: args }
  },
  template: `<DataTable v-bind="args">
    <Column field="id" header="Id" :sortable="true"></Column> 

    <Column field="name" header="Nombre" :sortable="true">
      <template #body="{ data }">
        <strong>{{ data.name }}</strong>
      </template>

      <template #filter>
        ...
      </template>
    </Column> 

    <Column field="description" header="Descripcion"></Column> 
  </DataTable>`,
})

export const Empty = Template.bind({})
Empty.args = { data: [], loading: false }

export const Full = Template.bind({})
Full.args = { data, loading: false }
