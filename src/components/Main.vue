<script lang="ts" setup>
import { computed, ref, watch, watchEffect } from "vue";
import { Divisions, DivisionValues } from "./types";
import { useNotesPerBeat } from "./composables/useNotesPerBeat";
import Notes from "./Notes.vue";
import { useSequencer } from "../stores/useSequencer";
import { useKit } from "../stores/useKit";
import { storeToRefs } from "pinia";
import MetronomeIcon from "../assets/metronome-icon.svg";

const sequencer = useSequencer();
const kit = useKit();
const { isClear, isMetronomeOn, sequences } = storeToRefs(sequencer);
const { isShowAll } = storeToRefs(kit);

const selectedDivision = ref<number>(Divisions.eight);
const count = ref(0);
const isPlaying = ref(false);
const interval = ref();
const bpm = ref(120);

const initialSequences = computed(() => {
	switch (selectedDivision.value) {
		case Divisions.quarter:
			return DivisionValues.quarter;
		case Divisions.eight:
			return DivisionValues.eight;
		case Divisions.sixteen:
			return DivisionValues.sixteen;
		// case Divisions.quarterTriplet:
		// 	return DivisionValues.quarterTriplet;
		case Divisions.eightTriplet:
			return DivisionValues.eightTriplet;
		case Divisions.sixteenTriplet:
			return DivisionValues.sixteenTriplet;

		default:
			return DivisionValues.quarter;
	}
});

const sequenceLength = computed(() => sequences.value.length);

watchEffect(() => {
	sequencer.setSequence(initialSequences.value);
});

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
				if (count.value === sequenceLength.value) {
					return (count.value = 1);
				}

				count.value = count.value + 1;
			}, 1000 / notesPerSecond.value);
		} else {
			clearInterval(interval.value);
		}
	}
);

watchEffect(() => {
	document.addEventListener("keydown", (e) => {
		if (e.code === "Space") {
			isPlaying.value = !isPlaying.value;
		}
	});
});

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

// const handleAddBar = () => {
// 	const seqLength = sequences.value.length;
// 	switch (selectedDivision.value) {
// 		case Divisions.quarter:
// 			return sequencer.updateSequence([
// 				{
// 					id: seqLength + 1,
// 					selected,
// 				},
// 			]);

// 		case Divisions.eight:
// 			return sequencer.updateSequence([
// 				{
// 					id: seqLength / 2 + 1,
// 					selected,
// 				},
// 				nCount,
// 			]);

// 		case Divisions.sixteen:
// 			sequencer.updateSequence([
// 				{
// 					id: seqLength / 4 + 1,
// 					selected,
// 				},
// 				eCount,
// 				nCount,
// 				aCount,
// 			]);
// 			break;

// 		default:
// 			return sequencer.updateSequence([
// 				{
// 					id: seqLength + 1,
// 					selected,
// 				},
// 			]);
// 	}
// };
</script>

<template>
	<section class="w-full flex flex-col gap-4">
		<article class="flex gap-4 mx-auto">
			<div class="flex flex-col max-w-[200px] text-left gap-2">
				<select
					v-model="selectedDivision"
					name="division"
					id="division"
					class="py-3 px-4 bg-[#1a1a1a] rounded-md transition-all cursor-pointer border border-transparent hover:border-[#646cff]">
					<option :value="Divisions.quarter">Quarter</option>
					<!-- <option :value="Divisions.quarterTriplet">Quarter Triplet</option> -->
					<option :value="Divisions.eight">Eight</option>
					<option :value="Divisions.eightTriplet">Eight Triplet</option>
					<option :value="Divisions.sixteen">Sixteen</option>
					<option :value="Divisions.sixteenTriplet">Sixteen Triplet</option>
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
				<button @click="kit.toggleShowAll">{{ isShowAll ? "Hide other" : "Show Full kit" }}</button>
			</div>

			<div class="flex items-end">
				<button
					@click="sequencer.toggleMetronome"
					:class="['min-h-[38px] border hover:border-indigo-500', isMetronomeOn ? 'bg-indigo-500' : '']">
					<img :src="MetronomeIcon" class="h-[18px] invert" alt="" />
				</button>
			</div>
		</article>

		<div class="flex gap-4 mx-auto">
			<div class="flex flex-row max-w-[1280px] text-center overflow-auto">
				<Notes
					v-for="(sequence, index) in sequences"
					:key="index"
					:idx="index"
					:beat="sequence"
					:count="count"
					:is-active="index === count - 1" />
			</div>

			<!-- <button @click="handleAddBar" class="btn">+ Add bar</button> -->
		</div>
	</section>
</template>

<style scoped>
.btn:hover {
	border-color: #0ea5e9;
}
</style>

