<template>
  <Modal title="Crear nueva cita" hideFooter>
    <template #activator="{ toggle }">
      <Button color="blue" @click="toggle">Crear cita</Button>
    </template>

    <template #default>
      <form class="form" @submit.prevent="onSubmit()">
        <Input
          v-model="values.name"
          placeholder="Nombre"
          type="text"
          name="name"
          :error="errors.name"
          @blur="validate"
        />
        <Input
          v-model="values.duration"
          placeholder="Duracion"
          type="number"
          name="duration"
          :error="errors.duration"
          @blur="validate"
        />
        <Input
          v-model="values.description"
          placeholder="Descripcion"
          type="area"
          name="description"
          :error="errors.description"
          @blur="validate"
        />

        <div class="flex justify-end">
          <Button color="blue" type="submit" :disabled="!meta.valid">
            Guardar
          </Button>
        </div>
      </form>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
  import useCreateAppointment from '@/hooks/useCreateAppointment'

  const { values, validate, meta, errors } = useCreateAppointment()

  async function onSubmit() {}
</script>

<style scoped>
  .form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
</style>
