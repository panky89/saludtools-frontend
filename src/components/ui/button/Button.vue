<template>
  <button
    class="button"
    :class="{
      [`button-${color}`]: true,
      [`button-${size}`]: true,
      'px-4': !onlyIcon,
      'button__only-icon': onlyIcon,
    }"
    :type="type"
    :disabled="disabled"
  >
    <div
      class="button__content"
      :class="{ 'button__disabled--loader': loading }"
    >
      <slot></slot>
    </div>

    <div v-if="loading" class="button__loader">
      <Spinner />
    </div>
  </button>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue'
  import Spinner from '../spinner/Spinner.vue'

  type Color = 'blue' | 'gray' | 'red' | 'green'
  type Size = 'sm' | 'md' | 'lg'
  type Type = 'button' | 'submit' | 'reset'

  defineProps({
    color: { type: String as PropType<Color>, default: 'gray' },
    size: { type: String as PropType<Size>, default: 'md' },
    type: { type: String as PropType<Type>, default: 'button' },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    onlyIcon: { type: Boolean, default: false },
  })
</script>

<style scoped>
  .button {
    border: none;
    cursor: pointer;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    position: relative;
  }
  .button-sm {
    font-size: 0.8rem;
    height: 1.5rem;
  }
  .button-md {
    font-size: 0.95rem;
    height: 2rem;
  }
  .button-lg {
    font-size: 1.1rem;
    height: 2.5rem;
  }
  .button-blue {
    color: white;
    background-color: var(--blue);
  }
  .button-gray {
    color: black;
    background-color: var(--gray);
  }
  .button-red {
    color: white;
    background-color: var(--red);
  }
  .button-green {
    color: white;
    background-color: var(--green);
  }
  .button:hover {
    opacity: 0.8;
  }
  .button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  .button__content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .button__loader {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    cursor: not-allowed;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
  }
  .button__disabled--loader {
    opacity: 0;
    cursor: not-allowed;
  }
  .button__only-icon {
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
