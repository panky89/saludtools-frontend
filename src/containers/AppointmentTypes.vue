<template>
  <ModalFormCreateAppointmentType @refresh="getAppointmentTypes" />

  <DataTable
    paginator
    :data="appointmentTypes"
    :loading="isFetching"
    :rows="meta?.total"
    :currentPage="meta?.current_page"
    :rowsPerPage="meta?.per_page"
    :rowsPerPageOptions="[10, 25, 50]"
    @changeSort="onChangeSort"
    @changePage="onChangePage"
    @changeRowsPerPage="onChangeRowsPerPage"
    class="mt-10"
  >
    <Column field="id" header="Id" sortable>
      <template #body="{ data }">
        <strong>{{ data.id }}</strong>
      </template>
    </Column>

    <Column field="name" header="Nombre" sortable filterable></Column>

    <Column field="duration" header="Duracion (min)" sortable></Column>

    <Column field="description" header="Descripcion" sortable></Column>

    <Column field="created_at" header="Creado" sortable>
      <template #body="{ data }">
        <span>{{ $formatDate(data.created_at, 'YYYY-MM-DD HH:mm') }}</span>
      </template>
    </Column>

    <Column field="updated_at" header="Ultima modificacion" sortable>
      <template #body="{ data }">
        <span>{{ $formatDate(data.updated_at, 'YYYY-MM-DD HH:mm') }}</span>
      </template>
    </Column>

    <Column field="color" header="Color">
      <template #body="{ data }">
        <div class="flex items-center">
          <div
            :style="{
              backgroundColor: data.color,
              border: '1px solid gray',
              width: '24px',
              height: '24px',
            }"
          ></div>
          <span class="ml-4">{{ data.color }}</span>
        </div>
      </template>
    </Column>

    <Column field="active" header="Activo">
      <template #body="{ data }">
        <Icon size="24" :color="data.active ? '#16a34a' : '#d2d2d2'">
          <CircleCheck />
        </Icon>
      </template>
    </Column>
  </DataTable>
</template>

<script lang="ts" setup>
  import { Icon } from '@vicons/utils'
  import { CircleCheck } from '@vicons/tabler'

  import ModalFormCreateAppointmentType from '@/components/ModalFormCreateAppointmentType.vue'
  import useGetAppointmentTypes from '@/hooks/useGetAppointmentTypes'

  const { appointmentTypes, meta, getAppointmentTypes, isFetching, params } =
    useGetAppointmentTypes()

  function onChangeSort(field: string, type: 'asc' | 'desc') {
    console.log(field, type)
    params.value.order_by = field
    params.value.order_type = type
  }

  function onChangePage(page: number) {
    console.log(page)
    params.value.page = page
  }

  function onChangeRowsPerPage(rowsPerPage: number) {
    console.log(rowsPerPage)
    params.value.per_page = rowsPerPage
  }
</script>

<style scoped></style>
