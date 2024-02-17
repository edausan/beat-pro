import { Ref, computed } from "vue";
import { Divisions } from "../types";

type NotesPerBeatType = {
	selectedDivision: Ref<number>;
};

export const useNotesPerBeat = ({ selectedDivision }: NotesPerBeatType) => {
	const notesPerBeat = computed(() => {
		if (selectedDivision.value === Divisions.quarter) {
			return 1;
		} else if (selectedDivision.value === Divisions.eight) {
			return 2;
		}
		return 4;
	});

	return { notesPerBeat };
};
