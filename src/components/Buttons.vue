<script setup lang="ts">
import { ref } from "vue";

const active = ref<{h: boolean; s: boolean; k: boolean}>({
      h: false,
      s: false,
      k: false
    })

const handleSetActive = (drum: string) => {
  active.value = {...active.value, [drum]:!(active.value as any)[drum]}
}
</script>

<template>
  <div class="flex flex-col gap-2 mt-2">
      <button :class="active.h ? 'bg-sky-500' : ''" @click="handleSetActive('h')">H</button>
      <button :class="active.s ? 'bg-sky-500' : ''" @click="handleSetActive('s')">S</button>
      <button :class="active.k ? 'bg-sky-500' : ''" @click="handleSetActive('k')">K</button>
    </div>
</template>

<style scoped></style>
