<template>
  <Modal
    v-model="isOpen"
    title="Crear nueva tipo cita"
    hideFooter
    @open="resetForm()"
  >
    <template #activator="{ toggle }">
      <Button color="blue" @click="toggle">Crear nueva tipo cita</Button>
    </template>

    <template #default>
      <form class="form" @submit.prevent="onSubmit()">
        <div class="form__fields">
          <Input
            v-model="values.name"
            class="form__name"
            placeholder="Nombre"
            type="text"
            name="name"
            :error="errors.name"
            @input="validate"
          />
          <Input
            v-model="values.duration"
            class="form__duration"
            placeholder="Duracion"
            type="number"
            name="duration"
            :error="errors.duration"
            @input="validate"
          />
          <Input
            v-model="values.color"
            class="form__color"
            type="color"
            name="color"
            :error="errors.color"
          />
          <Input
            v-model="values.description"
            class="form__description"
            placeholder="Descripcion"
            type="area"
            name="description"
            :error="errors.description"
            @input="validate"
          />
        </div>

        <div class="flex justify-end mt-10">
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
  const { values, validate, meta, errors, resetForm } = form

  async function onSubmit() {
    if (!(await validate())) return

    await createAppointment()
    emit('refresh')
    isOpen.value = false
  }
</script>

<style scoped>
  .form {
    display: flex;
    flex-direction: column;
  }
  .form__fields {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    grid-template-areas: 'name duration color' 'description description description';
  }
  .form__name {
    grid-area: name;
  }
  .form__color {
    grid-area: color;
  }
  .form__description {
    grid-area: description;
  }
  .form__duration {
    grid-area: duration;
  }
</style>
