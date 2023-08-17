<template>
  <svg :width="width" :height="height">
    <use :xlink:href="createXlinkHref" />
  </svg>
</template>

<script setup lang='ts'>
import { EIconNames } from './types';

const props = defineProps({
  width: {
    required: true,
    type: [Number, String]
  },

  height: {
    required: true,
    type: [Number, String]
  },

  name: {
    required: true,
    type: String as () => EIconNames
  },
  createXlinkHref(): string {
    return `#${this.name}_icon`
  }
})
</script>