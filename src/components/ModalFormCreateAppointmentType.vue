<template>
  <Modal v-model="isOpen" title="Crear nueva cita" hideFooter>
    <template #activator="{ toggle }">
      <Button color="blue" @click="toggle">Crear nueva tipo cita</Button>
    </template>

    <template #default>
      <form class="form" @submit.prevent="onSubmit()">
        <Input
          v-model="values.name"
          placeholder="Nombre"
          type="text"
          name="name"
          :error="errors.name"
          @input="validate"
        />
        <Input
          v-model="values.duration"
          placeholder="Duracion"
          type="number"
          name="duration"
          :error="errors.duration"
          @input="validate"
        />
        <Input
          v-model="values.description"
          placeholder="Descripcion"
          type="area"
          name="description"
          :error="errors.description"
          @input="validate"
        />

        <div class="flex justify-end">
          <Button
            color="blue"
            type="submit"
            :loading="isFetching"
            :disabled="!meta.valid"
          >
            Guardar
          </Button>
        </div>
      </form>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import useCreateAppointmentType from '@/hooks/useCreateAppointmentType'

  const emit = defineEmits(['refresh'])
  const isOpen = ref(false)

  const { form, isFetching, createAppointment } = useCreateAppointmentType()
  const { values, validate, meta, errors } = form

  async function onSubmit() {
    if (!(await validate())) return

    await createAppointment()
    emit('refresh')
    isOpen.value = false
  }
</script>

<style scoped>
  .form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
</style>
