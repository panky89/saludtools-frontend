<template>
  <slot :toggle="toggle" :isOpen="isOpen" name="activator"></slot>

  <transition name="fade" appear>
    <div v-if="isOpen" class="modal__overlay" @click="isOpen = false"></div>
  </transition>

  <transition name="pop" appear>
    <div
      v-if="isOpen"
      class="modal"
      :class="{ [`modal__${size}`]: true }"
      @click.stop
    >
      <button class="button__close" @click="isOpen = false">
        <Icon>
          <X />
        </Icon>
      </button>

      <header v-if="!hideHeader" class="modal__header">
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

      <footer v-if="!hideFooter" class="modal_footer">
        <slot
          v-if="$slots.footer"
          :toggle="toggle"
          :isOpen="isOpen"
          name="footer"
        ></slot>

        <div v-else class="modal__actions">
          <Button @click="cancel()">Cancelar</Button>
          <Button color="blue" @click="accept()">Aceptar</Button>
        </div>
      </footer>
    </div>
  </transition>
</template>

<script lang="ts" setup>
  import { PropType, ref, watch } from 'vue'
  import { Icon } from '@vicons/utils'
  import { X } from '@vicons/tabler'
  import Button from '../button/Button.vue'

  type Size = 'sm' | 'md' | 'lg' | 'full'

  const props = defineProps({
    modelValue: { type: Boolean, default: false },
    size: { type: String as PropType<Size>, default: 'md' },
    title: { type: String, default: '' },
    hideFooter: { type: Boolean, default: false },
    hideHeader: { type: Boolean, default: false },
  })

  const emit = defineEmits([
    'accept',
    'cancel',
    'open',
    'close',
    'update:modelValue',
  ])
  const isOpen = ref(false)

  function toggle() {
    isOpen.value = !isOpen.value
  }

  function accept() {
    emit('accept')
    isOpen.value = false
  }

  function cancel() {
    emit('cancel')
    isOpen.value = false
  }

  watch(props, () => (isOpen.value = props.modelValue))

  watch(isOpen, () => {
    emit('update:modelValue', isOpen.value)

    if (isOpen.value) {
      emit('open')
    } else {
      emit('close')
    }
  })
</script>

<style scoped>
  .modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 100%;
    height: fit-content;
    max-width: 90%;
    padding: 2rem;
    border-radius: 0.25rem;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
    background-color: white;
    z-index: 1;
  }
  .modal__overlay {
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    z-index: 1;
  }
  .button__close {
    position: absolute;
    top: 1rem;
    right: 0.75rem;
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
    padding: 0.25rem 0;
  }

  @media (min-width: 1024px) {
    .modal__sm {
      max-width: 15vw;
    }
    .modal__md {
      max-width: 30vw;
    }
    .modal__lg {
      max-width: 50vw;
    }
    .modal__full {
      max-width: 100%;
      height: 100vh;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .pop-enter-active,
  .pop-leave-active {
    transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
  }

  .pop-enter,
  .pop-leave-to {
    opacity: 0;
    transform: scale(0.3) translateY(-50%);
  }
</style>
