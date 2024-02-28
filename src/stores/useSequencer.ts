import { defineStore } from "pinia";
import { ref } from "vue";
import { DivisionItem } from "../components/types";

export const useSequencer = defineStore("sequencer", () => {
	const isClear = ref(true);
	const isMetronomeOn = ref(false);
	const volumes = ref({
		click: 0.5,
		hats: 0.3,
		snare: 0.7,
		kick: 0.2,
		tomHi: 0.3,
		tomMid: 0.3,
		tomLo: 0.3,
		crash: 0.2,
		bell: 0.5,
	});

	// const localSequences = computed(() => JSON.parse(localStorage.getItem("sequences") as string) || []);
	// const localVolumes = computed(() => JSON.parse(localStorage.getItem("volumes") as string));
	const sequences = ref<DivisionItem[]>([]);

	const persistToLocalStorage = () => {
		// localStorage.setItem("volumes", JSON.stringify(volumes.value));
		localStorage.setItem("sequences", JSON.stringify(sequences.value));
	};

	const updateSequence = (newSeq: DivisionItem[]) => {
		sequences.value = [...sequences.value, ...newSeq];
		// persistToLocalStorage();
	};

	const setSequence = (seq: DivisionItem[]) => {
		sequences.value = seq;
		// persistToLocalStorage();
	};

	const updateSequenceItem = (updatedSeq: DivisionItem) => {
		sequences.value = sequences.value.map((seq) => {
			if (seq.id === updatedSeq.id) {
				return updatedSeq;
			}
			return seq;
		});
		// persistToLocalStorage();
	};

	const setSequenceItemVolume = ({ id, kit, volume }: { id: string | number; kit: string; volume: number }) => {
		sequences.value = sequences.value.map((seq) => {
			if (seq.id === id) {
				return {
					...seq,
					selected: {
						...seq.selected,
						[kit]: {
							...(seq.selected as any)[kit],
							volume,
						},
					},
				};
			}

			return seq;
		});
		// persistToLocalStorage();
	};

	const setIsClear = (state: boolean) => {
		isClear.value = state;
	};

	const toggleMetronome = () => {
		isMetronomeOn.value = !isMetronomeOn.value;
	};

	const setVolume = ({ kit, volume }: { kit: string; volume: number }) => {
		volumes.value = { ...volumes.value, [kit]: volume };
	};

	return {
		isClear,
		setIsClear,
		isMetronomeOn,
		toggleMetronome,
		volumes,
		setVolume,
		sequences,
		updateSequence,
		setSequence,
		updateSequenceItem,
		setSequenceItemVolume,
	};
});
