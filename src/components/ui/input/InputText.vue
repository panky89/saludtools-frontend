<template>
  <div class="input-wrapper">
    <label v-if="label" :for="name" class="label">{{ label }}</label>

    <input
      class="input-text"
      type="text"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      @keyup.enter="$emit('keyup.enter')"
    />
  </div>
</template>

<script lang="ts" setup>
  defineProps({
    id: { type: String, default: '' },
    name: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    modelValue: { type: String, default: '' },
    label: { type: String, default: '' },
  })

  const emit = defineEmits(['update:modelValue', 'keyup.enter'])

  function onInput(e: Event) {
    const target = e.target as HTMLInputElement
    const value = target.value
    emit('update:modelValue', value)
  }
</script>

<style scoped>
  .input-wrapper {
    display: grid;
    grid-template-rows: 1.5rem 1fr;
    padding: 0.5rem 0;
  }
  .input-text {
    border: 1px solid rgb(220, 220, 220);
    border-radius: 0.25rem;
    padding: 0.5rem;
  }
  .label {
    text-transform: capitalize;
  }
</style>
