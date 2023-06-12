<script lang="ts">
import { defineComponent, ref } from "vue";
import Count from "./Count.vue";
import { Nums } from "./types";

export default defineComponent({
  name: "MainWrapper",
  components: { Count },
  setup() {
    const beatsNum = ref<Nums[]>([]);
    const with16 = ref<boolean>(false);

    return { beatsNum, with16 };
  },
  mounted() {
    this.handleNums();
  },
  methods: {
    handleNums() {
      const nums = ["1", "2", "3", "4"].map((num) => {
        return {
          num,
          e: "e",
          n: "n",
          a: "a",
        };
      });

      this.beatsNum = nums;
    },

    handleSetWith16() {
      this.with16 = !this.with16;
    },
  },
});
</script>

<template>
  <div class="mb-4">
    <button @click="handleSetWith16()">
      {{ with16 ? "without" : "with" }} 16th notes
    </button>
  </div>
  <div class="flex flex-row gap-4">
    <Count v-for="beat in beatsNum" :beat="beat" :with16="with16" />
  </div>
</template>

<style scoped></style>
