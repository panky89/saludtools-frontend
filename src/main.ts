import { createApp } from 'vue'
import App from './App.vue'

import './styles/main.css'
import Button from './components/ui/button/Button.vue'
import Input from './components/ui/input/Input.vue'
import Menu from './components/ui/menu/Menu.vue'
import Modal from './components/ui/modal/Modal.vue'
import Spinner from './components/ui/spinner/Spinner.vue'
import DataTable from './components/ui/data-table/DataTable.vue'
import Column from './components/ui/data-table/Column.vue'

import { formatDate } from '@/helpers/date'
import { trunc } from '@/helpers/string'

const app = createApp(App)
app.config.globalProperties.$trunc = trunc
app.config.globalProperties.$formatDate = formatDate

app.component('Button', Button)
app.component('Input', Input)
app.component('Menu', Menu)
app.component('Modal', Modal)
app.component('Spinner', Spinner)
app.component('Button', Button)
app.component('DataTable', DataTable)
app.component('Column', Column)

app.mount('#app')

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $trunc: (value: string, limit?: number) => string
    $formatDate: (value: string, format?: string) => string
  }
}
