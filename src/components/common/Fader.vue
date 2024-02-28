<script lang="ts" setup>
import { useSequencer } from "../../stores/useSequencer";

const sequencer = useSequencer();

const props = defineProps<{ kit: string; volume?: number }>();

const handleVolume = (e: any) => {
	sequencer.setVolume({ kit: props.kit, volume: e.target.value });
};
</script>

<template>
	<div class="flex flex-col place-items-center">
		<input @input="handleVolume" :value="$props.volume" type="range" orient="vertical" step="0.01" max="1" min="0" />
		<label for="" class="capitalize text-xs">{{ $props.kit }}</label>
	</div>
</template>
