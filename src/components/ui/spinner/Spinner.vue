<template>
  <div class="loader">
    <Icon class="loader--fixed">
      <Loader />
    </Icon>

    <Icon class="loader--rotate">
      <LoaderQuarter />
    </Icon>
  </div>
</template>

<script lang="ts" setup>
  import { Icon } from '@vicons/utils'
  import { Loader, LoaderQuarter } from '@vicons/tabler'
</script>

<style scoped>
  .loader {
    position: relative;
    width: max-content;
    height: max-content;
    margin-top: 4px;
  }
  .loader--fixed {
    opacity: 0.4;
    position: absolute;
    left: 0;
    top: 0;
  }
  .loader--rotate {
    opacity: 1;
    animation: spin 1.5s linear infinite;
  }
</style>
