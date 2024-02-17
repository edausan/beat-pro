import { defineStore } from "pinia";
import { ref } from "vue";

export const useKit = defineStore("kit", () => {
	const isShowAll = ref(false);

	const toggleShowAll = () => {
		isShowAll.value = !isShowAll.value;
	};

	return { isShowAll, toggleShowAll };
});
