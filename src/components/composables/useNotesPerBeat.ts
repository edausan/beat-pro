import { Ref, computed } from "vue";
import { Divisions, NotesPerBeat } from "../types";

type NotesPerBeatType = {
	selectedDivision: Ref<number>;
};

export const useNotesPerBeat = ({ selectedDivision }: NotesPerBeatType) => {
	const notesPerBeat = computed(() => {
		switch (selectedDivision.value) {
			case Divisions.quarter:
				return NotesPerBeat.quarter;
			case Divisions.eight:
				return NotesPerBeat.eight;
			case Divisions.sixteen:
				return NotesPerBeat.sixteen;
			case Divisions.quarterTriplet:
				return NotesPerBeat.quarterTriplet;
			case Divisions.eightTriplet:
				return NotesPerBeat.eightTriplet;

			default:
				return NotesPerBeat.quarter;
		}
	});

	return { notesPerBeat };
};
