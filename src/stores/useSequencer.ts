import { defineStore } from "pinia";
import { ref } from "vue";

export const useSequencer = defineStore("sequencer", () => {
	const isClear = ref(true);

	const setIsClear = (state: boolean) => {
		isClear.value = state;
	};

	return { isClear, setIsClear };
});
