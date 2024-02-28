import { ComputedRef, Ref, watch } from "vue";
import { useSequencer } from "../../stores/useSequencer";
import { storeToRefs } from "pinia";
import { Howl } from "howler";

// sounds
import clickSound from "../../assets/click.mp3";
import HHCloseSound from "../../assets/sounds/hh-close.wav";
import HHOpenSound from "../../assets/sounds/hh-open.wav";
import SnareSound from "../../assets/sounds/snare.wav";
import KickSound from "../../assets/sounds/kick.wav";
import TomHiSound from "../../assets/sounds/tom-hi.wav";
import TomMidSound from "../../assets/sounds/tom-mid.wav";
import TomLoSound from "../../assets/sounds/tom-lo.wav";
import RideSound from "../../assets/sounds/ride.wav";
import ChinaCymbal from "../../assets/sounds/china-cymbal.wav";
import { ActiveKit } from "../types";

type UseDrumsSoundTypes = { isActive: ComputedRef<boolean>; active: Ref<ActiveKit>; isHatsOpen: Ref<boolean> };

export const useDrumsSound = ({ isActive, active, isHatsOpen }: UseDrumsSoundTypes) => {
	const sequencer = useSequencer();
	const { isMetronomeOn, volumes } = storeToRefs(sequencer);

	const click = new Howl({
		src: [clickSound],
	});

	const hhCloseSound = new Howl({
		src: [HHCloseSound],
		volume: volumes.value.hats,
	});
	const hhOpenSound = new Howl({
		src: [HHOpenSound],
		volume: volumes.value.hats,
	});
	const snareSound = new Howl({
		src: [SnareSound],
		volume: volumes.value.snare,
	});
	const kickSound = new Howl({
		src: [KickSound],
		volume: volumes.value.kick,
	});
	const tomHiSound = new Howl({
		src: [TomHiSound],
		volume: volumes.value.tomHi,
	});
	const tomMidSound = new Howl({
		src: [TomMidSound],
		volume: volumes.value.tomMid,
	});
	const tomLoSound = new Howl({
		src: [TomLoSound],
		volume: volumes.value.tomLo,
	});
	const rideSound = new Howl({
		src: [RideSound],
		volume: volumes.value.bell,
	});
	const chinaCymbal = new Howl({
		src: [ChinaCymbal],
		volume: volumes.value.crash,
	});

	watch(
		() => isActive.value,
		(isActive) => {
			if (isActive) {
				isMetronomeOn.value && click.play();
				click.volume(volumes.value.click);

				if (active.value.hats) {
					hhCloseSound.play();
				}
				if (active.value.hats && isHatsOpen.value) {
					hhOpenSound.play();
				}

				if (active.value.kick) {
					kickSound.play();
				}

				if (active.value.snare) {
					snareSound.play();
				}
				if (active.value.tomHi) {
					tomHiSound.play();
				}
				if (active.value.tomMid) {
					tomMidSound.play();
				}
				if (active.value.tomLo) {
					tomLoSound.play();
				}

				if (active.value.crash) {
					chinaCymbal.play();
				}
				if (active.value.bell) {
					rideSound.play();
				}
			}
		}
	);

	return {
		hhCloseSound,
		hhOpenSound,
		snareSound,
		kickSound,
		tomHiSound,
		tomMidSound,
		tomLoSound,
		rideSound,
		chinaCymbal,
	};
};
