<script lang="ts">
import { PropType, defineComponent } from "vue";
import { Nums } from "./types";
import Buttons from "./Buttons.vue";
import Notes from "./Notes.vue";

export default defineComponent({
  name: "Count",
  components: { Buttons, Notes },
  props: {
    beat: {
      required: true,
      type: Object as PropType<Nums>,
    },
    with16: {
      required: false,
      type: Boolean,
    },
  }
});
</script>

<template>
  <section class="flex flex-col gap-3 text-md">
    <div class="flex flex-row gap-3">
      <div>
        <span class="text-white font-bold">{{ beat.num }}</span>
        <Buttons />
      </div>
        <div v-if="with16" class="flex flex-row gap-3">
          <Notes :beat="beat.e" />
          <Notes :beat="beat.n" />
          <Notes :beat="beat.a" />
        </div>
    </div>
  </section>
</template>

<style scoped></style>
