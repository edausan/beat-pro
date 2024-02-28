<script setup lang="ts">
import { computed, ref, toRefs, watch } from "vue";
import { ActiveKit, DivisionItem, DrumKit, DrumKitNames } from "./types";
import { useSequencer } from "../stores/useSequencer";
import { storeToRefs } from "pinia";
import { useKit } from "../stores/useKit";
import HHClose from "../assets/hh-close.png";
import HHOpen from "../assets/hh-open.png";
import Snare from "../assets/snare.png";
import Kick from "../assets/kick.png";
import { useDrumsSound } from "./composables/useDrumsSound";
import SequenceButton from "./common/SequenceButton.vue";

const props = defineProps<{ is16?: boolean; isActive?: boolean; idx: number; beat: DivisionItem }>();
const kit = useKit();
const { isShowAll } = storeToRefs(kit);

const sequencer = useSequencer();
const { isClear } = storeToRefs(sequencer);

const activekit = computed(() => props.beat.selected);

const active = ref<ActiveKit>({
	hats: activekit.value.hats.isSelected,
	snare: activekit.value.snare.isSelected,
	kick: activekit.value.kick.isSelected,
	tomHi: activekit.value.tomHi.isSelected,
	tomMid: activekit.value.tomLo.isSelected,
	tomLo: activekit.value.tomLo.isSelected,
	crash: activekit.value.crash.isSelected,
	bell: activekit.value.bell.isSelected,
});

const isHatsOpen = ref(false);

const isActiveButtons = computed(() => props.isActive);

const drumSounds = useDrumsSound({
	active,
	isActive: isActiveButtons,
	isHatsOpen,
});

const { kickSound, snareSound, hhCloseSound, chinaCymbal, rideSound, tomHiSound, tomLoSound, tomMidSound } = toRefs(drumSounds);

watch(
	() => active.value,
	() => {
		sequencer.setIsClear(false);
		sequencer.updateSequenceItem({
			id: props.beat.id,
			selected: {
				hats: {
					isSelected: active.value.hats,
					// volume: volumes.value.hats,
				},
				snare: {
					isSelected: active.value.snare,
					// volume: volumes.value.snare,
				},
				kick: {
					isSelected: active.value.kick,
					// volume: volumes.value.kick,
				},
				tomHi: {
					isSelected: active.value.tomHi,
					// volume: volumes.value.tomHi,
				},
				tomMid: {
					isSelected: active.value.tomMid,
					// volume: volumes.value.tomMid,
				},
				tomLo: {
					isSelected: active.value.tomLo,
					// volume: volumes.value.tomLo,
				},
				crash: {
					isSelected: active.value.crash,
					// volume: volumes.value.crash,
				},
				bell: {
					isSelected: active.value.bell,
					// volume: volumes.value.bell,
				},
			},
		});
	}
);

watch(
	() => isClear.value,
	(isClear) => {
		if (isClear) {
			active.value.bell = false;
			active.value.crash = false;
			active.value.hats = false;
			active.value.kick = false;
			active.value.snare = false;
			active.value.tomHi = false;
			active.value.tomLo = false;
			active.value.tomMid = false;
		}
	}
);

const handleSetActive = (drum: string) => (active.value = { ...active.value, [drum]: !(active.value as any)[drum] });

const onHold = ref(false);

watch(
	() => onHold.value,
	() => {
		setTimeout(() => {
			if (onHold.value) {
				isHatsOpen.value = !isHatsOpen.value;
			}
		}, 500);
	}
);

const isCount = computed(() => typeof props.beat.id === "number");
</script>

<template>
	<div :class="['flex flex-col gap-2 mt-2 py-2', isCount && 'p-2 bg-zinc-900/30 rounded-md']">
		<template v-if="isShowAll">
			<SequenceButton
				:beat="$props.beat"
				:active="active"
				:is-active="(isActive as boolean)"
				:kit="DrumKit.Crash"
				:label="DrumKitNames.Crash.short"
				@set-active="handleSetActive(DrumKit.Crash)"
				@set-volume="(val: number) => chinaCymbal.volume(val)" />

			<SequenceButton
				:beat="$props.beat"
				:active="active"
				:is-active="(isActive as boolean)"
				:kit="DrumKit.Bell"
				:label="DrumKitNames.Bell.short"
				@set-active="handleSetActive(DrumKit.Bell)"
				@set-volume="(val: number) => rideSound.volume(val)" />
			<div class="mb-1"></div>
		</template>

		<template v-if="isShowAll">
			<SequenceButton
				:beat="$props.beat"
				:active="active"
				:is-active="(isActive as boolean)"
				:kit="DrumKit.TomHi"
				:label="DrumKitNames.TomHi.short"
				@set-active="handleSetActive(DrumKit.TomHi)"
				@set-volume="(val: number) => tomHiSound.volume(val)" />

			<SequenceButton
				:beat="$props.beat"
				:active="active"
				:is-active="(isActive as boolean)"
				:kit="DrumKit.TomMid"
				:label="DrumKitNames.TomMid.short"
				@set-active="handleSetActive(DrumKit.TomMid)"
				@set-volume="(val: number) => tomMidSound.volume(val)" />

			<SequenceButton
				:beat="$props.beat"
				:active="active"
				:is-active="(isActive as boolean)"
				:kit="DrumKit.TomLo"
				:label="DrumKitNames.TomLo.short"
				@set-active="handleSetActive(DrumKit.TomLo)"
				@set-volume="(val: number) => tomLoSound.volume(val)" />

			<div class="mb-1"></div>
		</template>

		<SequenceButton
			:beat="$props.beat"
			:active="active"
			:is-active="(isActive as boolean)"
			:kit="DrumKit.Hats"
			label="H"
			:icon="isHatsOpen ? HHOpen : HHClose"
			@set-active="handleSetActive(DrumKit.Hats)"
			@set-volume="(val: number) => hhCloseSound.volume(val)" />

		<SequenceButton
			:beat="$props.beat"
			:active="active"
			:is-active="(isActive as boolean)"
			:kit="DrumKit.Snare"
			label="S"
			:icon="Snare"
			@set-active="handleSetActive(DrumKit.Snare)"
			@set-volume="(val: number) => snareSound.volume(val)" />

		<SequenceButton
			:beat="$props.beat"
			:active="active"
			:is-active="(isActive as boolean)"
			:kit="DrumKit.Kick"
			:label="DrumKitNames.Kick.short"
			:icon="Kick"
			@set-active="handleSetActive(DrumKit.Kick)"
			@set-volume="(val: number) => kickSound.volume(val)" />
	</div>
</template>

<style scoped>
.btn {
	height: 56px;
	width: 56px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.btn:hover {
	border-color: #0ea5e9;
}
</style>

