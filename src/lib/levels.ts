import { LEVELS } from './constants';

export interface Level {
	label: string;
	size: number;
	duration: number;
	emojis: string[];
}

export const levels: Level[] = [
	{
		label: LEVELS.EASY.LABEL,
		size: 4,
		duration: 60 * 1000,
		emojis: LEVELS.EASY.EMOJIS
	},
	{
		label: LEVELS.MEDIUM.LABEL,
		size: 6,
		duration: 150 * 1000,
		emojis: LEVELS.MEDIUM.EMOJIS
	},
	{
		label: LEVELS.HARD.LABEL,
		size: 6,
		duration: 300 * 1000,
		emojis: LEVELS.HARD.EMOJIS
	}
];
