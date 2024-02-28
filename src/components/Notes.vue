<script lang="ts" setup>
import Buttons from "./Buttons.vue";
import { DivisionItem } from "./types";

defineProps<{
	beat: DivisionItem;
	is16?: boolean;
	isN?: boolean;
	idx: number;
	isActive?: boolean;
}>();
</script>

<template>
	<div :id="idx.toString()" :key="idx" :class="[$props.isActive && ' bg-green-500/10', 'p-1 rounded-lg']">
		<span :class="$props.isActive && 'font-extrabold text-green-600'">{{ beat.id }}</span>
		<Buttons :is16="$props.is16" :is-active="$props.isActive" :idx="$props.idx" :beat="$props.beat" />
	</div>
</template>

