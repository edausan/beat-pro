<script lang="ts" setup>
import { computed } from "vue";
import Notes from "./Notes.vue";
import { Divisions, Nums } from "./types";

const props = defineProps<{
	beat: Nums;
	division: number;
	metro: number;
	idx: number;
}>();

const subDiv = computed(() => props.division === Divisions.eight || props.division === Divisions.sixteen);
</script>

<template>
	<Notes :beat="$props.beat.num" :idx="idx" />

	<Notes :idx="idx" v-if="$props.division === Divisions.eight" :beat="$props.beat.n" :is16="subDiv" is-n />

	<template v-if="$props.division === Divisions.sixteen">
		<Notes :idx="idx" :beat="$props.beat.e" :is16="subDiv" />
		<Notes :idx="idx" :beat="$props.beat.n" :is16="subDiv" is-n />
		<Notes :idx="idx" :beat="$props.beat.a" :is16="subDiv" />
	</template>
</template>

<style scoped></style>

