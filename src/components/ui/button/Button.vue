<template>
  <button
    class="button"
    :class="{ [`button-${color}`]: true, [`button-${size}`]: true }"
    :type="type"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue'

  type Color = 'blue' | 'gray' | 'red' | 'green'
  type Size = 'sm' | 'md' | 'lg'
  type Type = 'button' | 'submit' | 'reset'

  defineProps({
    color: { type: String as PropType<Color>, default: 'gray' },
    size: { type: String as PropType<Size>, default: 'md' },
    type: { type: String as PropType<Type>, default: 'button' },
  })
</script>

<style scoped>
  .button {
    border: none;
    cursor: pointer;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
  }
  .button-sm {
    font-size: 0.7rem;
    height: 1.25rem;
  }
  .button-md {
    font-size: 0.85rem;
    height: 1.5rem;
  }
  .button-lg {
    font-size: 1rem;
    height: 1.75rem;
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
</style>
