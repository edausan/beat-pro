<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { ActiveKit, DivisionItem, DrumKit } from "../types";
import { useSequencer } from "../../stores/useSequencer";
import { storeToRefs } from "pinia";

const sequencer = useSequencer();
const { isClear } = storeToRefs(sequencer);

watch(
	() => isClear.value,
	(isClear) => {
		if (isClear) {
			clickCount.value = 0;
			emit("setVolume", props.kit === DrumKit.Crash ? 0.01 : 0.02);
		}
	}
);

const props = defineProps<{
	kit: string;
	active: ActiveKit;
	isActive: boolean;
	icon?: string;
	label: string;
	kitHowl?: Howl;
	beat: DivisionItem;
}>();

props.kitHowl?.volume(1);

const emit = defineEmits<{
	(e: "setActive"): void;
	(e: "setVolume", val: number): void;
}>();

const clickCount = ref(0);

watch(
	() => clickCount.value,
	() => {
		switch (clickCount.value) {
			case 1:
				return sequencer.setSequenceItemVolume({
					id: props.beat.id,
					kit: props.kit,
					volume: props.kit === DrumKit.Crash ? 0.01 : 0.25,
				});
			case 2:
				return sequencer.setSequenceItemVolume({
					id: props.beat.id,
					kit: props.kit,
					volume: 0.5,
				});
			case 3:
				return sequencer.setSequenceItemVolume({
					id: props.beat.id,
					kit: props.kit,
					volume: 1,
				});

			default:
				return 0;
		}
	}
);

//
const volumeLevel = computed(() => {
	if (props.kit === DrumKit.Crash) {
		switch (clickCount.value) {
			case 1:
				emit("setVolume", 0.01);
				return 0.25;
			case 2:
				emit("setVolume", 0.2);
				return 0.5;
			case 3:
				emit("setVolume", 0.5);
				return 1;

			default:
				return 0;
		}
	} else {
		switch (clickCount.value) {
			case 1:
				emit("setVolume", 0.02);
				return 0.25;
			case 2:
				emit("setVolume", 0.5);
				return 0.5;
			case 3:
				emit("setVolume", 1);
				return 1;

			default:
				return 0;
		}
	}
});

// for styling
const level = computed(() => {
	switch (volumeLevel.value) {
		case 0.25:
			return "quarter";
		case 0.5:
			return "half";
		case 1:
			return "full";

		default:
			return 0;
	}
});

const active = computed(() => props.active);

const activeClass = (kit: string) => {
	const activeKit = computed(() => {
		switch (kit) {
			case DrumKit.Hats:
				return active.value.hats;
			case DrumKit.Snare:
				return active.value.snare;
			case DrumKit.Kick:
				return active.value.kick;
			case DrumKit.TomHi:
				return active.value.tomHi;
			case DrumKit.TomMid:
				return active.value.tomMid;
			case DrumKit.TomLo:
				return active.value.tomLo;
			case DrumKit.Crash:
				return active.value.crash;
			case DrumKit.Bell:
				return active.value.bell;

			default:
				return active.value.hats;
		}
	});

	return activeKit.value && props.isActive ? "bg-green-600 scale-105" : activeKit.value && !props.isActive ? "bg-sky-600 " : "";
};
</script>

<template>
	<button
		:id="DrumKit.Kick"
		:class="[activeClass($props.kit), 'btn opacity-50 transition-all ease-out', level]"
		@click="
			() => {
				clickCount = clickCount + 1;
				if (clickCount === 1) {
					$emit('setActive');
				}
				if (clickCount > 3) {
					clickCount = 0;
					$emit('setActive');
				}
			}
		">
		<div class="volume-level">
			<span :class="[level]"></span>
		</div>
		<img v-if="$props.icon" class="h-[25px] min-w-[25px] invert" :src="$props.icon" alt="" />
		<span v-else>{{ $props.label }}</span>
	</button>
</template>

<style scoped>
.volume-level {
	position: absolute;
	left: 4px;
	bottom: 4px;
	width: 4px;
	height: calc(100% - 8px);
	border-radius: 3px;
	background-color: #ffffff1c;
	box-sizing: border-box;
	z-index: 1000;
	overflow: hidden;
}

.volume-level > span {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	background-color: #fff;
	z-index: 1001;
	height: 100%;
	transform: translateY(100%);
	transition: transform 250ms ease-in-out;
}

.volume-level > span.quarter {
	transform: translateY(75%);
}

.volume-level > span.half {
	transform: translateY(50%);
}

.volume-level > span.full {
	transform: translateY(0);
}

.btn {
	height: 50px;
	width: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	transition: opacity 250ms ease-in-out;
}

.btn.quarter {
	opacity: 70%;
}
.btn.half {
	opacity: 85%;
}
.btn.full {
	opacity: 100%;
}
.btn:hover {
	border-color: #0ea5e9;
}
</style>
