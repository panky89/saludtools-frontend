<template>
  <div class="input-wrapper">
    <label
      :for="name"
      class="input-label"
      :class="{ 'input-label__show': value }"
    >
      {{ label || placeholder }}
    </label>

    <input
      class="input-text"
      type="text"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      :value="value"
      @input="onInput"
      @keyup.enter="$emit('keyup.enter')"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  defineProps({
    id: { type: String, default: '' },
    name: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    modelValue: { type: String, default: '' },
    label: { type: String, default: '' },
  })

  const value = ref('')
  const emit = defineEmits(['update:modelValue', 'keyup.enter'])

  function onInput(e: Event) {
    const target = e.target as HTMLInputElement
    value.value = target.value
    emit('update:modelValue', value.value)
  }
</script>

<style scoped>
  .input-wrapper {
    position: relative;
    background-color: rgb(240, 240, 240);
    border-radius: 4px;
    border: 2px solid transparent;
    width: max-content;
    height: 3.25rem;
    transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .input-wrapper:hover {
    background-color: rgb(216, 220, 230);
  }
  .input-text {
    border: none;
    background-color: transparent;
    outline: none;
    width: 100%;
    height: 100%;
    padding: 0.15rem 1rem;
    color: rgb(50, 50, 50);
    font-size: 0.9rem;
  }
  .input-wrapper:focus-within {
    border-bottom: 2px solid var(--blue);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .input-label {
    display: none;
    text-transform: capitalize;
    font-size: 0.8rem;
    position: absolute;
    color: var(--blue);
    top: 0.25rem;
    left: 1rem;
    transition: 300ms;
  }
  .input-wrapper:focus-within .input-label {
    display: block;
  }
  .input-wrapper:focus-within .input-text::placeholder {
    color: transparent;
  }
  .input-label__show {
    display: block;
  }
</style>
