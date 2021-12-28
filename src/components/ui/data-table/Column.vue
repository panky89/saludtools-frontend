<script lang="ts" setup>
  import { defineProps } from 'vue'

  defineProps({
    field: { type: String, required: true },
    header: { type: String, required: true },
    sortable: { type: Boolean, default: false },
    filterable: { type: Boolean, default: false },
    width: { type: String, default: 'auto' },
  })
</script>
