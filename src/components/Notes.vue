<script lang="ts" setup>
import Buttons from "./Buttons.vue";

defineProps<{
	beat: string;
	is16?: boolean;
	isN?: boolean;
}>();
</script>

<template>
	<div>
		<span :class="[$props.isN ? 'text-orange-500' : 'text-sky-400']">{{ beat }}</span> <Buttons :is16="$props.is16" />
	</div>
</template>

