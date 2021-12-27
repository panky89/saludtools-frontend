<template>
  <Icon class="loader">
    <Loader />
  </Icon>
</template>

<script lang="ts" setup>
  import { Icon } from '@vicons/utils'
  import { Loader, LoaderQuarter } from '@vicons/tabler'
</script>

<style scoped>
  .loader {
    width: max-content;
    height: max-content;
    animation: spin 3s linear infinite;
  }
</style>
