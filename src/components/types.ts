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
	quarterTriplet = 12,
	eightTriplet = 12,
	sixteenTriplet = 24,
}

export enum NotesPerBeat {
	quarter = 1,
	quarterTriplet = 1.5,
	eight = 2,
	eightTriplet = 3,
	sixteen = 4,
	sixteenTriplet = 6,
}

export const subs = ["e", "n", "a"];
export const triplet = ["n", "a"];
export const eightTriplet = ["t", "l"];

export type SelectedKit = {
	isSelected: boolean;
	volume?: number;
};

const SelectedKitValue = {
	isSelected: false,
	volume: 0.02,
} as SelectedKit;

export type DivisionItem = {
	id: string | number;
	selected: {
		hats: SelectedKit;
		snare: SelectedKit;
		kick: SelectedKit;
		tomHi: SelectedKit;
		tomMid: SelectedKit;
		tomLo: SelectedKit;
		crash: SelectedKit;
		bell: SelectedKit;
	};
};

export const selected = {
	hats: SelectedKitValue,
	snare: SelectedKitValue,
	kick: SelectedKitValue,
	tomHi: SelectedKitValue,
	tomMid: SelectedKitValue,
	tomLo: SelectedKitValue,
	crash: SelectedKitValue,
	bell: SelectedKitValue,
};

export const counts = [
	{
		id: 1,
		selected,
	},
	{
		id: 2,
		selected,
	},
	{
		id: 3,
		selected,
	},
	{
		id: 4,
		selected,
	},
] as DivisionItem[];

export const nCount = {
	id: "n",
	selected,
} as DivisionItem;

export const eCount = {
	id: "e",
	selected,
} as DivisionItem;

export const aCount = {
	id: "a",
	selected,
} as DivisionItem;

export const tripCount = {
	id: "trip",
	selected,
} as DivisionItem;
export const letCount = {
	id: "let",
	selected,
} as DivisionItem;

export const DivisionValues = {
	quarter: counts,
	eight: [counts[0], nCount, counts[1], nCount, counts[2], nCount, counts[3], nCount],
	sixteen: [
		counts[0],
		eCount,
		nCount,
		aCount,
		counts[1],
		eCount,
		nCount,
		aCount,
		counts[2],
		eCount,
		nCount,
		aCount,
		counts[3],
		eCount,
		nCount,
		aCount,
	],
	eightTriplet: [
		counts[0],
		tripCount,
		letCount,
		counts[1],
		tripCount,
		letCount,
		counts[2],
		tripCount,
		letCount,
		counts[3],
		tripCount,
		letCount,
	],
	sixteenTriplet: [
		counts[0],
		tripCount,
		letCount,
		nCount,
		tripCount,
		letCount,
		counts[1],
		tripCount,
		letCount,
		nCount,
		tripCount,
		letCount,
		counts[2],
		tripCount,
		letCount,
		nCount,
		tripCount,
		letCount,
		counts[3],
		tripCount,
		letCount,
		nCount,
		tripCount,
		letCount,
	],
};

export enum DrumKit {
	Hats = "hats",
	Snare = "snare",
	Kick = "kick",
	TomHi = "tomHi",
	TomMid = "tomMid",
	TomLo = "tomLo",
	Crash = "crash",
	Bell = "bell",
	Click = "click",
}

export const DrumKitNames = {
	Hats: {
		short: "HH",
		long: "Hats",
	},
	Snare: {
		short: "S",
		long: "Snare",
	},
	Kick: {
		short: "K",
		long: "Kick",
	},
	TomHi: {
		short: "H",
		long: "Tom Hi",
	},
	TomMid: {
		short: "M",
		long: "Tom Mid",
	},
	TomLo: {
		short: "L",
		long: "Tom Lo",
	},
	Crash: {
		short: "C",
		long: "Crash",
	},
	Bell: {
		short: "B",
		long: "Bell",
	},
};

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

