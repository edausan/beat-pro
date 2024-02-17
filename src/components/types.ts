export interface Nums {
	num: string;
	e: string;
	n: string;
	a: string;
}

export enum Divisions {
	quarter = 4,
	eight = 8,
	sixteen = 16,
}

export enum DrumKit {
	Hats = "hats",
	Snare = "snare",
	Kick = "kick",
	TomHi = "tomHi",
	TomMid = "tomMid",
	TomLo = "tomLo",
	Crash = "crash",
	Bell = "bell",
}

export type ActiveKit = {
	hats: boolean;
	snare: boolean;
	kick: boolean;
	tomHi: boolean;
	tomMid: boolean;
	tomLo: boolean;
	crash: boolean;
	bell: boolean;
};

const subs = ["e", "n", "a"];
export const DivisionValues = {
	quarter: ["1", "2", "3", "4"],
	eight: ["1", "n", "2", "n", "3", "n", "4", "n"],
	sixteen: ["1", ...subs, "2", ...subs, "3", ...subs, "4", ...subs],
};

