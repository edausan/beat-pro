<script lang="ts">
import { defineComponent } from "vue";
import Buttons from "./Buttons.vue";

export default defineComponent({
  name: "Notes",
	components: { Buttons },
  props: {
    beat: {
      required: false,
      type: String,
    },
  }
});
</script>

<template>
  <div><span class="text-sky-400">{{ beat }}</span> <Buttons /></div>
</template>
