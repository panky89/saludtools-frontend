<template>
  <slot :toggle="toggle" :isOpen="isOpen" name="activator"></slot>

  <teleport to="body">
    <transition name="fade" appear mode="out-in">
      <div v-if="isOpen" class="modal-wrapper" @click="isOpen = false">
        <div class="modal" @click.stop>
          <button class="button__close" @click="isOpen = false">
            <Icon>
              <X />
            </Icon>
          </button>

          <header class="modal__header">
            <slot
              v-if="$slots.header"
              :toggle="toggle"
              :isOpen="isOpen"
              name="header"
            ></slot>
            <h2 v-else-if="title" class="modal__title">{{ title }}</h2>
          </header>

          <div class="modal__body">
            <slot :toggle="toggle" :isOpen="isOpen"></slot>
          </div>

          <footer class="modal_footer">
            <slot
              v-if="$slots.footer"
              :toggle="toggle"
              :isOpen="isOpen"
              name="footer"
            ></slot>

            <div v-else class="modal__actions">
              <Button @click="isOpen = false">Cancelar</Button>
              <Button color="blue">Aceptar</Button>
            </div>
          </footer>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { Icon } from '@vicons/utils'
  import { X } from '@vicons/tabler'

  import Button from '../button/Button.vue'

  defineProps({
    modalValue: { type: Boolean, default: false },
    title: { type: String, default: '' },
  })

  const isOpen = ref(false)

  function toggle() {
    isOpen.value = !isOpen.value
  }
</script>

<style scoped>
  .modal-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .modal {
    background-color: white;
    border-radius: 0.25rem;
    padding: 2rem;
    display: grid;
    grid-template-rows: auto 1fr auto;
    position: relative;
    gap: 1rem;
    max-width: 100vw;
    width: max-content;
  }
  .button__close {
    position: absolute;
    top: 0.25rem;
    right: 0;
    border: none;
    background-color: transparent;
    font-size: 20px;
    color: gray;
    cursor: pointer;
  }
  .button__close:hover {
    transform: scale(1.1);
  }
  .modal__actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
  .modal__title {
    margin: 0;
    padding: 0;
  }
  .modal__body {
    padding: 1rem 0;
  }
</style>
