<template>
  <ul class="paginator">
    <li>
      <Button only-icon @click="firstPage()">
        <Icon>
          <ChevronsLeft />
        </Icon>
      </Button>
    </li>
    <li>
      <Button only-icon :disabled="currentPage === 1" @click="prevPage()">
        <Icon>
          <ChevronLeft />
        </Icon>
      </Button>
    </li>

    <li v-for="page in pages">
      <button
        class="paginator__item"
        :class="{ 'paginator__item--active': page === currentPage }"
        @click="onChangePage(page)"
      >
        {{ page }}
      </button>
    </li>

    <li>
      <Button only-icon :disabled="currentPage === pages" @click="nextPage()">
        <Icon>
          <ChevronRight />
        </Icon>
      </Button>
    </li>
    <li>
      <Button only-icon @click="lastPage()">
        <Icon>
          <ChevronsRight />
        </Icon>
      </Button>
    </li>
  </ul>
</template>

<script lang="ts" setup>
  import Button from '../button/Button.vue'
  import { Icon } from '@vicons/utils'
  import {
    ChevronLeft,
    ChevronsLeft,
    ChevronRight,
    ChevronsRight,
  } from '@vicons/tabler'

  const emit = defineEmits(['change'])
  const props = defineProps({
    currentPage: { type: Number, required: true },
    pages: { type: Number, required: true },
  })

  function onChangePage(page: number) {
    emit('change', page)
  }

  function nextPage() {
    emit('change', props.currentPage + 1)
  }

  function prevPage() {
    emit('change', props.currentPage - 1)
  }

  function lastPage() {
    emit('change', props.pages)
  }

  function firstPage() {
    emit('change', 1)
  }
</script>

<style scoped>
  .paginator {
    display: flex;
    align-items: center;
    list-style: none;
    gap: 0.5rem;
    padding: 0;
  }
  .paginator__item {
    cursor: pointer;
    padding: 0.5rem 0.75rem;
    background-color: transparent;
    border: none;
    border-radius: 4px;
  }
  .paginator__item:hover {
    background-color: var(--gray);
    opacity: 0.7;
  }
  .paginator__item--active {
    color: black;
    font-weight: 900;
  }
</style>
