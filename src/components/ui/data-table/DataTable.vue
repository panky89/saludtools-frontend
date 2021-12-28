<template>
  <div class="table-wrapper">
    <table class="table">
      <thead class="table__head" role="rowgroup">
        <tr role="row">
          <th v-for="col in columns" :key="col.props?.field" role="cell">
            <div class="column__header">
              <span class="column__title">{{ col.props?.header }}</span>

              <Button
                v-if="col.props?.hasOwnProperty('sortable')"
                class="column__sortable"
                size="sm"
                onlyIcon
                @click="sort(col.props?.field)"
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

    <div v-if="loading" class="table__loader">
      <Spinner />
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
  import Spinner from '../spinner/Spinner.vue'

  interface Item {
    [k: string]: string | number | boolean | Item
  }

  const sortAsc = ref(false)
  const sortBy = ref()
  const slots = useSlots()

  const props = defineProps({
    data: { type: Array as PropType<Item[]>, default: () => [] },
    loading: { type: Boolean, default: false },
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

  function sort(field: string) {
    sortBy.value = field
    sortAsc.value = !sortAsc.value
  }

  const items = computed(() => {
    if (!sortBy.value) return props.data

    return orderBy(props.data, sortBy.value, sortAsc.value ? 'asc' : 'desc')
  })

  const columns = computed(() => {
    const children = getChildren()

    return children.filter((c) => typeof c.type === 'object')
  })
</script>

<style scoped>
  .table-wrapper {
    position: relative;
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
</style>
