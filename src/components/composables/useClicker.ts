import { Ref, watch } from "vue";

export type UseClickerTypes = {
	count: Ref<number>;
	selectedDivision: Ref<number>;
	isPlaying: Ref<boolean>;
	click: Ref<any>;
	kit: {
		hats: Ref<any>;
		snares: Ref<any>;
		kicks: Ref<any>;
	};
};

export const useClicker = ({ click, count, isPlaying, selectedDivision, kit }: UseClickerTypes) => {
	watch(
		() => count.value,
		(count) => {
			if (count <= selectedDivision.value && isPlaying.value) {
				// click
				click.value[click.value.length - 1]?.classList.remove("active");
				click.value[click.value.length - 1]?.classList.add("default-bg");
				click.value[count - 2]?.classList.remove("active");
				click.value[count - 2]?.classList.add("default-bg");
				click.value[count - 1]?.classList.remove("default-bg");
				click.value[count - 1]?.classList.add("active");

				// hats
				kit.hats.value[kit.hats.value.length - 1]?.classList.remove("active-kit");
				kit.hats.value[kit.hats.value.length - 1]?.classList.add("btn__default-bg");
				kit.hats.value[count - 2]?.classList.remove("active-kit");
				kit.hats.value[count - 2]?.classList.add("btn__default-bg");
				kit.hats.value[count - 1]?.classList.remove("btn__default-bg");
				kit.hats.value[count - 1]?.classList.add("active-kit");

				// snares
				kit.snares.value[kit.snares.value.length - 1]?.classList.remove("active-kit");
				kit.snares.value[kit.snares.value.length - 1]?.classList.add("btn__default-bg");
				kit.snares.value[count - 2]?.classList.remove("active-kit");
				kit.snares.value[count - 2]?.classList.add("btn__default-bg");
				kit.snares.value[count - 1]?.classList.remove("btn__default-bg");
				kit.snares.value[count - 1]?.classList.add("active-kit");

				// kicks
				kit.kicks.value[kit.kicks.value.length - 1]?.classList.remove("active-kit");
				kit.kicks.value[kit.kicks.value.length - 1]?.classList.add("btn__default-bg");
				kit.kicks.value[count - 2]?.classList.remove("active-kit");
				kit.kicks.value[count - 2]?.classList.add("btn__default-bg");
				kit.kicks.value[count - 1]?.classList.remove("btn__default-bg");
				kit.kicks.value[count - 1]?.classList.add("active-kit");
			}
		}
	);
};
