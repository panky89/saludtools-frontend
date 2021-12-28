<template>
  <Modal v-model="isOpen" hideFooter>
    <template #activator="{ toggle }">
      <Button color="gray" @click="toggle">
        <Icon>
          <Trash />
        </Icon>
      </Button>
    </template>

    <template #default>
      <form class="form" @submit.prevent="onSubmit()">
        <div class="form__warning">
          <Icon color="orange" size="96">
            <AlertTriangle />
          </Icon>

          <div class="flex flex-col">
            <h2>Eliminar cita medica</h2>
            <p>
              ¿Esta seguro que desea eliminar el registro, este cambio no se
              podra revertir?
            </p>
          </div>
        </div>

        <div class="flex justify-end">
          <Button type="button" class="mr-2" @click="isOpen = false">
            Cancelar
          </Button>

          <Button color="red" type="submit" :loading="isFetching">
            Eliminar
          </Button>
        </div>
      </form>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { Icon } from '@vicons/utils'
  import { Trash, AlertTriangle } from '@vicons/tabler'

  import useRemoveAppointmentType from '@/hooks/useRemoveAppointmentType'

  const props = defineProps({
    appointmentTypeId: {
      type: Number,
      required: true,
    },
  })
  const emit = defineEmits(['refresh'])
  const isOpen = ref(false)

  const { isFetching, removeAppointment } = useRemoveAppointmentType(
    props.appointmentTypeId
  )

  async function onSubmit() {
    await removeAppointment()
    emit('refresh')
    isOpen.value = false
  }
</script>

<style scoped>
  .form {
    display: flex;
    flex-direction: column;
  }
  .form__warning {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
    color: rgb(60, 60, 60);
  }
</style>
