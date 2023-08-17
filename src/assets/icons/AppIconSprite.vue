<template>
  <svg :style="{ display: 'none' }">
    <symbol width="19" height="20" viewBox="0 0 19 20" fill="none" :id="`${EIconNames.Search}_icon`">
      <circle cx="8" cy="8" r="7" stroke="#26D2A9" stroke-width="2" />
      <rect x="12.4141" y="12" width="8.0012" height="2" rx="1" transform="rotate(45 12.4141 12)" fill="#26D2A9" />
    </symbol>
  </svg>
</template>

<script setup lang="ts">
import { EIconNames } from './types';
</script>