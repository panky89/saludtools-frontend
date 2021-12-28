<template>
  <ModalFormCreateAppointmentType @refresh="getAppointments" />

  <DataTable :data="appointments" :loading="isFetching" class="mt-10">
    <Column field="id" header="Id"></Column>

    <Column field="name" header="Nombre" sortable filterable></Column>

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

    <Column field="active" header="Activo"></Column>
  </DataTable>
</template>

<script lang="ts" setup>
  import ModalFormCreateAppointmentType from '@/components/ModalFormCreateAppointmentType.vue'
  import useGetAppointmentTypes from '@/hooks/useGetAppointmentTypes'

  const { appointments, getAppointments, isFetching } = useGetAppointmentTypes()
</script>

<style scoped></style>
