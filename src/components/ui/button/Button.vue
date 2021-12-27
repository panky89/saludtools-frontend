<template>
  <button
    class="button"
    :class="{ [`button-${color}`]: true, [`button-${size}`]: true }"
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
      <div class="button__loader-icon">
        <Icon class="button__loader--fixed">
          <Loader />
        </Icon>

        <Icon class="button__loader--rotate">
          <LoaderQuarter />
        </Icon>
      </div>
    </div>
  </button>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue'
  import { Icon } from '@vicons/utils'
  import { Loader, LoaderQuarter } from '@vicons/tabler'

  type Color = 'blue' | 'gray' | 'red' | 'green'
  type Size = 'sm' | 'md' | 'lg'
  type Type = 'button' | 'submit' | 'reset'

  defineProps({
    color: { type: String as PropType<Color>, default: 'gray' },
    size: { type: String as PropType<Size>, default: 'md' },
    type: { type: String as PropType<Type>, default: 'button' },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
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
  }
  .button__disabled--loader {
    opacity: 0;
    cursor: not-allowed;
  }
  .button__loader-icon {
    position: relative;
    width: max-content;
    height: max-content;
  }
  .button__loader--fixed {
    opacity: 0.4;
    position: absolute;
    left: 0;
    top: 0;
  }
  .button__loader--rotate {
    opacity: 1;
    animation: spin 1.5s linear infinite;
  }
</style>
