<template>
  <div class="table-wrapper">
    <div class="table__actions">
      <Paginator
        :currentPage="currentPage"
        :pages="pages"
        @change="onChangePage"
      />

      <select
        class="table_per-pages"
        :value="rowsPerPage"
        @change="onChangeRowsPerPage"
      >
        <option v-for="item in rowsPerPageOptions" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
    </div>

    <div v-if="loading" class="table__progress">
      <div class="table__progress-bar"></div>
    </div>

    <div class="table__content">
      <table class="table">
        <thead class="table__head" role="rowgroup">
          <tr role="row">
            <th
              v-for="col in columns"
              :key="col.props?.field"
              :style="{ width: col.props?.width }"
              role="cell"
            >
              <div class="column__header">
                <span class="column__title">{{ col.props?.header }}</span>

                <Button
                  v-if="col.props?.hasOwnProperty('sortable')"
                  class="column__sortable"
                  size="sm"
                  onlyIcon
                  @click="onSort(col.props?.field)"
                >
                  <Icon>
                    <template v-if="sortBy === col.props?.field">
                      <SortAscending v-if="sortAsc" />
                      <SortDescending v-else />
                    </template>

                    <template v-else>
                      <ArrowsSort />
                    </template>
                  </Icon>
                </Button>

                <Menu v-if="col.props?.hasOwnProperty('filterable')">
                  <template #activator="{ toggle }">
                    <Button
                      class="column__filter"
                      onlyIcon
                      size="sm"
                      @click="toggle"
                    >
                      <Icon>
                        <Filter />
                      </Icon>
                    </Button>
                  </template>

                  <template #default="{ toggle }">
                    <Input placeholder="buscar" @keyup.enter="toggle" />

                    <div class="filter__actions mt-2">
                      <Button @click="toggle"> Cancelar </Button>
                      <Button color="blue"> Filtrar </Button>
                    </div>
                  </template>
                </Menu>
              </div>
            </th>
          </tr>
        </thead>

        <tbody v-if="!loading" class="table__body" role="rowgroup">
          <tr v-for="(item, index) in items" :key="index">
            <td v-for="col in columns" :key="col.props?.field">
              <component
                v-if="hasBody(col.children)"
                :is="renderBody(col.children)"
                :data="item"
              />

              <template v-else>
                {{ item[col.props?.field] }}
              </template>
            </td>
          </tr>

          <tr v-if="!items || items?.length === 0">
            <td :colspan="columns.length">
              <div class="table__empty">
                <Icon size="48" color="gray">
                  <Database />
                </Icon>

                <span>No hay registro</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, defineProps, PropType, ref, useSlots } from 'vue'
  import { Icon } from '@vicons/utils'
  import {
    Database,
    Filter,
    SortAscending,
    SortDescending,
    ArrowsSort,
  } from '@vicons/tabler'
  import { orderBy } from '../../../helpers/data'

  import Button from '../button/Button.vue'
  import Menu from '../menu/Menu.vue'
  import Input from '../input/Input.vue'
  import Paginator from '../paginator/Paginator.vue'

  interface Item {
    [k: string]: string | number | boolean | Item
  }

  const sortAsc = ref(false)
  const sortBy = ref()
  const slots = useSlots()

  const emit = defineEmits(['changePage', 'changeRowsPerPage', 'changeSort'])
  const props = defineProps({
    data: { type: Array as PropType<Item[]>, default: () => [] },
    loading: { type: Boolean, default: false },
    paginator: { type: Boolean, default: false },
    currentPage: { type: Number, default: 1 },
    rows: { type: Number, default: 1 },
    rowsPerPage: { type: Number, default: 10 },
    rowsPerPageOptions: {
      type: Array as PropType<Array<number>>,
      default: () => [10, 25, 50],
    },
  })

  function getChildren() {
    return slots.default ? slots.default() : []
  }

  function hasBody(children: any) {
    return !!children?.body
  }

  function renderBody(children: any) {
    return children.body
  }

  function onSort(field: string) {
    sortBy.value = field
    sortAsc.value = !sortAsc.value

    const type = sortAsc.value ? 'asc' : 'desc'
    emit('changeSort', field, type)
  }

  function onChangePage(page: number) {
    emit('changePage', page)
  }

  function onChangeRowsPerPage(e: Event) {
    const target = e.target as HTMLSelectElement
    const value = parseInt(target.value)

    emit('changeRowsPerPage', value)
  }

  const items = computed(() => {
    if (!sortBy.value) return props.data

    return orderBy(props.data, sortBy.value, sortAsc.value ? 'asc' : 'desc')
  })

  const columns = computed(() => {
    const children = getChildren()

    return children.filter((c) => typeof c.type === 'object')
  })

  const pages = computed(() => {
    const value = props.rows / props.rowsPerPage
    return Math.trunc(value + 1)
  })
</script>

<style scoped>
  .table-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .table__content {
    overflow-x: auto;
  }
  .table__loader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    min-height: 200px;
  }
  .table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
  }
  .table__head th,
  .table__body td {
    text-align: left;
    padding: 0.5rem;
    border-top: 1px solid rgb(220, 220, 220);
    border-bottom: 1px solid rgb(220, 220, 220);
  }
  .table__head th:hover {
    background-color: rgb(250, 250, 250);
  }
  .table__body tr:hover {
    background-color: rgb(250, 250, 250);
  }
  .column__header {
    display: grid;
    grid-template-columns: 1fr auto auto;
    align-items: center;
    gap: 0.25rem;
  }
  .table__empty {
    color: gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
  }
  .filter__actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.25rem;
  }
  .table__actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  .table_per-pages {
    border: none;
    background-color: var(--gray);
    border-radius: 4px;
    padding: 0.5rem;
  }
  .table_per-pages:hover {
    opacity: 0.7;
  }
  .table__progress {
    height: 4px;
    width: 100%;
  }

  .table__progress-bar {
    width: 100%;
    height: 100%;
    background-color: var(--blue);
    animation: indeterminate 1s infinite linear;
    transform-origin: 0% 50%;
  }

  @keyframes indeterminate {
    0% {
      transform: translateX(0) scaleX(0);
    }
    40% {
      transform: translateX(0) scaleX(0.4);
    }
    100% {
      transform: translateX(100%) scaleX(0.5);
    }
  }

  @media (min-width: 1024px) {
    .table__actions {
    }
  }
</style>
