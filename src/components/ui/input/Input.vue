<template>
  <div class="field">
    <div
      class="input-wrapper"
      :style="{ height: type === 'area' ? '100%' : '60px' }"
    >
      <label
        class="input-label"
        :for="name"
        :class="{ 'input-label__show': value }"
      >
        {{ label || placeholder }}
      </label>

      <input
        v-if="type !== 'area'"
        class="input"
        :name="name"
        :id="id"
        :placeholder="placeholder"
        :value="value"
        :type="type"
        @input="onInput"
        @blur="onBlur"
        @keyup.enter="$emit('keyup.enter')"
      />

      <textarea
        v-else
        class="input textarea"
        :name="name"
        :id="id"
        :placeholder="placeholder"
        :value="value"
        cols="4"
        @input="onInput"
        @blur="onBlur"
        @keyup.enter="$emit('keyup.enter')"
      />
    </div>

    <span v-if="touched && error" class="field__error">
      {{ error }}
    </span>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watchEffect } from 'vue'

  const props = defineProps({
    id: { type: String, default: '' },
    name: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    modelValue: { type: String, default: '' },
    label: { type: String, default: '' },
    type: { type: String, default: 'text' },
    error: { type: String, default: '' },
  })

  const touched = ref(false)
  const value = ref('')
  const emit = defineEmits([
    'update:modelValue',
    'keyup.enter',
    'input',
    'blur',
  ])

  function onInput(e: Event) {
    const target = e.target as HTMLInputElement
    value.value = target.value
    emit('update:modelValue', value.value)
    emit('input', value.value)
  }

  function onBlur(e: Event) {
    emit('blur', e)
    touched.value = true
  }

  watchEffect(() => {
    value.value = props.modelValue
  })
</script>

<style scoped>
  .input-wrapper {
    position: relative;
    background-color: rgb(240, 240, 240);
    border-radius: 4px;
    border: 2px solid transparent;
    border-top-width: 10px;
    border-bottom-width: px;
    width: max-content;
    transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
  }
  .input-wrapper:hover {
    background-color: rgb(216, 220, 230);
  }
  .input {
    border: none;
    background-color: transparent;
    outline: none;
    width: 100%;
    height: 100%;
    color: rgb(50, 50, 50);
    font-size: 0.9rem;
    padding-left: 0.5rem;
    max-width: calc(100% - 0.5rem);
  }
  .textarea {
    padding-top: 1rem;
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
    top: -0.25rem;
    left: 0.5rem;
    transition: 300ms;
  }
  .input-wrapper:focus-within .input-label {
    display: block;
  }
  .input-wrapper:focus-within .input::placeholder {
    color: transparent;
    font-size: 0.9rem;
  }
  .input-label__show {
    display: block;
  }
  .field__error {
    text-transform: capitalize;
    color: var(--red);
    font-size: 0.75rem;
  }
</style>
