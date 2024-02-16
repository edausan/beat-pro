<script lang="ts" setup>
import { computed, onMounted, onUpdated, ref, watch, watchEffect } from "vue";
import Count from "./Count.vue";
import { Divisions, Nums } from "./types";
import { useClicker } from "./composables/useClicker";

const selectedDivision = ref<number>(Divisions.eight);

const beatsNum = computed(
	() =>
		["1", "2", "3", "4"].map((num) => {
			return {
				num,
				e: "e",
				n: "n",
				a: "a",
			};
		}) as Nums[]
);

const count = ref(0);
const isPlaying = ref(false);
const interval = ref();
const bpm = ref(80);
const click = ref();
const hats = ref();
const snares = ref();
const kicks = ref();

useClicker({
	click,
	count,
	isPlaying,
	selectedDivision,
	kit: {
		hats,
		snares,
		kicks,
	},
});

const notesPerBeat = computed(() => {
	if (selectedDivision.value === Divisions.quarter) {
		return 1;
	} else if (selectedDivision.value === Divisions.eight) {
		return 2;
	}
	return 4;
});

const notesPerSecond = computed(() => (bpm.value / 60) * notesPerBeat.value);

watchEffect(() => {
	if (bpm.value) {
		isPlaying.value = false;
	}
});

watch(
	() => isPlaying.value,
	(isPlaying) => {
		if (isPlaying) {
			interval.value = setInterval(() => {
				if (count.value === selectedDivision.value) {
					return (count.value = 1);
				}
				count.value = count.value + 1;
			}, 1000 / notesPerSecond.value);
		} else {
			reset();
		}
	}
);

const clearClickBg = () => {
	click.value.forEach((item: any) => {
		item.classList.remove("active");
		item.classList.add("default-bg");
	});
};

onMounted(() => {
	click.value = document.querySelectorAll("#click");
	hats.value = document.querySelectorAll("#hats");
	snares.value = document.querySelectorAll("#snares");
	kicks.value = document.querySelectorAll("#kicks");
});

const reset = () => {
	clearClickBg();
	clearInterval(interval.value);
	count.value = 0;
};

onUpdated(() => {
	if (selectedDivision.value) {
		click.value = document.querySelectorAll("#click");
		hats.value = document.querySelectorAll("#hats");
		snares.value = document.querySelectorAll("#snares");
		kicks.value = document.querySelectorAll("#kicks");
	}
});
</script>

<template>
	<section class="w-[100vw] flex flex-col gap-4">
		<article class="flex gap-4 mx-auto">
			<div class="flex flex-col max-w-[200px] text-left gap-2">
				<label for="division">Select note division:</label>
				<select
					v-model="selectedDivision"
					name="division"
					id="division"
					class="py-3 px-4 bg-[#1a1a1a] rounded-md transition-all cursor-pointer border border-transparent hover:border-[#646cff]">
					<option :value="Divisions.quarter">Quarter</option>
					<option :value="Divisions.eight">Eight</option>
					<option :value="Divisions.sixteen">Sixteen</option>
				</select>
			</div>

			<div class="flex items-end">
				<button @click="isPlaying = !isPlaying">{{ isPlaying ? "Stop" : "Play" }}</button>
			</div>

			<div class="flex items-end">
				<input
					@keydown.enter="isPlaying = true"
					v-model="bpm"
					type="number"
					class="py-[0.6em] px-4 bg-[#1a1a1a] rounded-md transition-all cursor-pointer border border-transparent hover:border-[#646cff] outline-none"
					placeholder="BPM" />
			</div>
		</article>

		<div class="flex flex-row gap-4 mx-auto text-center">
			<Count v-for="(beat, index) in beatsNum" :beat="beat" :division="selectedDivision" :metro="count" :idx="index" />
		</div>
	</section>
</template>

<style scoped></style>

