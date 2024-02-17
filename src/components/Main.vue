<script lang="ts" setup>
import { computed, ref, watch, watchEffect } from "vue";
import { Divisions, DivisionValues } from "./types";
import clickSound from "../assets/click.mp3";
import { useNotesPerBeat } from "./composables/useNotesPerBeat";
import Notes from "./Notes.vue";
import { useSequencer } from "../stores/useSequencer";
import { useKit } from "../stores/useKit";
import { storeToRefs } from "pinia";

const sequencer = useSequencer();

const kit = useKit();
const { isClear } = storeToRefs(sequencer);
const { isShowAll } = storeToRefs(kit);

const selectedDivision = ref<number>(Divisions.eight);

const sequences = computed(() => {
	if (selectedDivision.value === Divisions.quarter) {
		return DivisionValues.quarter;
	} else if (selectedDivision.value === Divisions.eight) {
		return DivisionValues.eight;
	}

	return DivisionValues.sixteen;
});

const count = ref(0);
const isPlaying = ref(false);
const interval = ref();
const bpm = ref(80);

const { notesPerBeat } = useNotesPerBeat({ selectedDivision });

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
				// check of count is equal to divisions
				if (count.value === selectedDivision.value) {
					return (count.value = 1);
				}

				count.value = count.value + 1;
			}, 1000 / notesPerSecond.value);
		} else {
			clearInterval(interval.value);
			clickSoundRef.value.pause();
		}
	}
);

watch(
	() => count.value,
	() => {
		clickSoundRef.value.play();
		setTimeout(() => {
			clickSoundRef.value.pause();
			clickSoundRef.value.currentTime = 0;
		}, 100);
	}
);

const reset = () => {
	clearInterval(interval.value);
	count.value = 0;
};

const handleClear = () => {
	isPlaying.value = false;
	sequencer.setIsClear(true);
	reset();
};

const handleStop = () => {
	isPlaying.value = false;
	reset();
};

const clickSoundRef = ref();
</script>

<template>
	<section class="w-[100vw] flex flex-col gap-4">
		<audio :src="clickSound" ref="clickSoundRef"></audio>
		<article class="flex gap-4 mx-auto">
			<div class="flex flex-col max-w-[200px] text-left gap-2">
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
				<input
					@keydown.enter="isPlaying = true"
					v-model="bpm"
					type="number"
					class="py-[0.6em] px-4 bg-[#1a1a1a] rounded-md transition-all cursor-pointer border border-transparent hover:border-[#646cff] outline-none max-w-[100px]"
					placeholder="BPM" />
			</div>

			<div class="flex items-end">
				<button
					:class="isPlaying ? 'bg-orange-500 hover:border-orange-300' : 'bg-green-500 hover:border-green-300'"
					@click="isPlaying = !isPlaying">
					{{ isPlaying ? "Pause" : "Play" }}
				</button>
			</div>
			<div class="flex items-end">
				<button
					:disabled="!isPlaying"
					:class="[isPlaying ? 'bg-red-500 hover:border-red-300 disabled:text-white/30' : '']"
					@click="handleStop">
					Stop
				</button>
			</div>

			<div class="flex items-end">
				<button :disabled="isClear" @click="handleClear">Clear</button>
			</div>

			<div class="flex items-end">
				<button @click="kit.toggleShowAll">{{ isShowAll ? "Hide other" : "Show all" }}</button>
			</div>
		</article>

		<div class="flex flex-row mx-auto text-center">
			<Notes
				v-for="(sequence, index) in sequences"
				:key="index"
				:idx="index"
				:beat="sequence"
				:count="count"
				:is-active="index === count - 1" />
		</div>
	</section>
</template>

<style scoped></style>

