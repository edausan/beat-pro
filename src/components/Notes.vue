<script lang="ts" setup>
import { watch } from "vue";
import Buttons from "./Buttons.vue";

const props = defineProps<{
	beat: string;
	is16?: boolean;
	isN?: boolean;
	idx: number;
	isActive?: boolean;
}>();

watch(
	() => props.isActive,
	() => {}
);
</script>

<template>
	<div :id="idx.toString()" :key="idx" :class="[$props.isActive && ' bg-green-500/10', 'p-2 rounded-lg']">
		<span :class="$props.isActive && 'font-extrabold text-green-600'">{{ beat }}</span>
		<Buttons :is16="$props.is16" :is-active="$props.isActive" />
	</div>
</template>

