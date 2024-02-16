<script lang="ts" setup>
import { computed } from "vue";
import Buttons from "./Buttons.vue";
import Notes from "./Notes.vue";
import { Divisions } from "./types";

const props = defineProps<{
	beat: any;
	division: number;
	metro: number;
	idx: number;
}>();

const subDiv = computed(() => props.division === Divisions.eight || props.division === Divisions.sixteen);
</script>

<template>
	<section class="flex flex-col gap-3 text-md">
		<div class="flex flex-row gap-3">
			<div>
				<span class="text-white font-bold">{{ $props.beat.num }}</span>
				<Buttons />
			</div>

			<div v-if="$props.division === Divisions.eight" class="flex flex-row gap-3">
				<Notes :beat="$props.beat.n" :is16="subDiv" is-n />
			</div>

			<div v-if="$props.division === Divisions.sixteen" class="flex flex-row gap-3">
				<Notes :beat="$props.beat.e" :is16="subDiv" />
				<Notes :beat="$props.beat.n" :is16="subDiv" is-n />
				<Notes :beat="$props.beat.a" :is16="subDiv" />
			</div>
		</div>
	</section>
</template>

<style scoped></style>

