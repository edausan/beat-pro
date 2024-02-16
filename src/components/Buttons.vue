<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{ is16?: boolean }>();

const active = ref<{ h: boolean; s: boolean; k: boolean }>({
	h: false,
	s: false,
	k: false,
});

const handleSetActive = (drum: string) => {
	active.value = { ...active.value, [drum]: !(active.value as any)[drum] };
};

// const isActive = computed(() => false);
// const hatClasses = computed(() => [
// 	props.is16 && active.value.h
// 		? "bg-orange-500 is-sixteen active__hat"
// 		: !props.is16 && active.value.h
// 		? `bg-sky-500 active__hat font-bold`
// 		: "",
// 	props.is16 && "text-xs",
// 	"h-[50px]",
// ]);

const hatsClasses = computed(() => [
	props.is16 && active.value.h
		? "bg-orange-500 is-sixteen active__kit"
		: !props.is16 && active.value.h
		? `bg-sky-500 active__kit font-bold`
		: "",
	props.is16 && "text-xs",
	"h-[50px]",
]);

const snareClasses = computed(() => [
	props.is16 && active.value.s
		? "bg-orange-500 is-sixteen active__kit"
		: !props.is16 && active.value.s
		? `bg-sky-500 active__kit font-bold`
		: "",
	props.is16 && "text-xs",
	"h-[50px]",
]);

const kickClasses = computed(() => [
	props.is16 && active.value.k
		? "bg-orange-500 is-sixteen active__kit"
		: !props.is16 && active.value.k
		? `bg-sky-500 active__kit font-bold`
		: "",
	props.is16 && "text-xs",
	"h-[50px] w-[50px]",
]);
</script>

<template>
	<div class="flex flex-col gap-2 mt-2">
		<button id="hats" :class="hatsClasses" @click="handleSetActive('h')">H</button>
		<button id="snares" :class="snareClasses" @click="handleSetActive('s')">S</button>
		<button id="kicks" :class="kickClasses" @click="handleSetActive('k')">K</button>
		<button id="click" disabled :class="['bg-[#1f1f1f]', $props.is16 && 'desat']"></button>
	</div>
</template>

<style scoped>
.active {
	background-color: #f59e0b;
}
.active__kit.active-kit {
	background-color: #84cc16;
}

.active.desat {
	background-color: #92410eac;
}

.default-bg {
	background-color: #1f1f1f;
}

.is-sixteen.btn__default-bg {
	background-color: #f97316;
}
</style>

