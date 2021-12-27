<template>
  <div ref="target" class="menu">
    <slot :toggle="toggle" :isOpen="isOpen" name="activator"></slot>

    <div v-show="isOpen" class="menu__content">
      <slot :toggle="toggle"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onBeforeUnmount, onMounted, ref } from 'vue'

  const isOpen = ref(false)
  const target = ref(null)

  function toggle() {
    isOpen.value = !isOpen.value
  }

  function outsideClick(e: Event) {
    e.stopPropagation()
    if (!target.value) return

    const el = target.value as HTMLElement
    const isClickInsideElement = el.contains(e.target as HTMLElement)

    if (!isClickInsideElement) isOpen.value = false
  }

  onMounted(() => document.addEventListener('click', outsideClick))

  onBeforeUnmount(() => document.removeEventListener('click', outsideClick))
</script>

<style scoped>
  .menu {
    position: relative;
    display: inline-block;
    width: max-content;
  }
  .menu__content {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    padding: 0.5rem;
    border-radius: 0.25rem;
    box-shadow: 1px 4px 9px 0px rgba(200, 200, 200, 0.75);
    width: max-content;
  }
</style>
