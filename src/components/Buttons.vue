<script setup lang="ts">
import { computed, ref, watch, watchEffect } from "vue";
import { ActiveKit, DrumKit } from "./types";
import { useSequencer } from "../stores/useSequencer";
import { storeToRefs } from "pinia";
import { useKit } from "../stores/useKit";
import HHClose from "../assets/hh-close.png";
import HHOpen from "../assets/hh-open.png";
import Snare from "../assets/snare.png";
import Kick from "../assets/kick.png";

const props = defineProps<{ is16?: boolean; isActive?: boolean }>();
const kit = useKit();
const { isShowAll } = storeToRefs(kit);

const sequencer = useSequencer();
const { isClear } = storeToRefs(sequencer);

const active = ref<ActiveKit>({
	hats: false,
	snare: false,
	kick: false,
	tomHi: false,
	tomMid: false,
	tomLo: false,
	crash: false,
	bell: false,
});

const isHatsOpen = ref(false);

watch(
	() => active.value,
	() => {
		sequencer.setIsClear(false);
	}
);

watch(
	() => isClear.value,
	(isClear) => {
		if (isClear) {
			for (const key in active.value) {
				if (Object.prototype.hasOwnProperty.call(active.value, key)) {
					active.value[key] = false;
				}
			}
		}
	}
);

const handleSetActive = (drum: string) => (active.value = { ...active.value, [drum]: !(active.value as any)[drum] });

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

	return activeKit.value && props.isActive
		? "bg-green-600 !opacity-100"
		: activeKit.value && !props.isActive
		? "bg-sky-600 !opacity-100"
		: "";
};

const onHold = ref(false);

// watchEffect(() => {
// 	console.log({ onHold: onHold.value });
// });

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
</script>

<template>
	<div class="flex flex-col gap-2 mt-2">
		<template v-if="isShowAll">
			<button :id="DrumKit.Crash" :class="[activeClass(DrumKit.Crash), 'btn opacity-50']" @click="handleSetActive(DrumKit.Crash)">
				C
			</button>
			<button :id="DrumKit.Bell" :class="[activeClass(DrumKit.Bell), 'btn opacity-50']" @click="handleSetActive(DrumKit.Bell)">
				B
			</button>
			<div class="mb-1"></div>
		</template>

		<template v-if="isShowAll">
			<button :id="DrumKit.TomHi" :class="[activeClass(DrumKit.TomHi), 'btn opacity-50']" @click="handleSetActive(DrumKit.TomHi)">
				T
			</button>
			<button
				:id="DrumKit.TomMid"
				:class="[activeClass(DrumKit.TomMid), 'btn opacity-50']"
				@click="handleSetActive(DrumKit.TomMid)">
				M
			</button>
			<button :id="DrumKit.TomLo" :class="[activeClass(DrumKit.TomLo), 'btn opacity-50']" @click="handleSetActive(DrumKit.TomLo)">
				L
			</button>
			<div class="mb-1"></div>
		</template>

		<button
			@mousedown="onHold = true"
			@mouseup="onHold = false"
			:id="DrumKit.Hats"
			:class="[activeClass(DrumKit.Hats), 'btn opacity-50']"
			@click="handleSetActive(DrumKit.Hats)">
			<!-- {{ isHatsOpen ? "O" : "H" }} -->
			<img class="h-[30px] invert" :src="isHatsOpen ? HHOpen : HHClose" alt="" />
		</button>
		<button :id="DrumKit.Snare" :class="[activeClass(DrumKit.Snare), 'btn opacity-50']" @click="handleSetActive(DrumKit.Snare)">
			<img class="h-[30px] invert" :src="Snare" alt="" />
		</button>
		<button :id="DrumKit.Kick" :class="[activeClass(DrumKit.Kick), 'btn opacity-50']" @click="handleSetActive(DrumKit.Kick)">
			<img class="h-[30px] invert" :src="Kick" alt="" />
		</button>
	</div>
</template>

<style scoped>
/* .btn {
	opacity: 0.7;
} */
.btn:hover {
	border-color: #0ea5e9;
}
</style>

