export function shuffle<T>(vaules: T[]) {
	let i = vaules.length;

	while (i--) {
		const j = Math.floor(Math.random() * i + 1);
		const temp = vaules[i];
		vaules[i] = vaules[j];
		vaules[j] = temp;
	}

	return vaules;
}

export function getEmojiUrl(emoji: string) {
	const code = [...emoji].map((char) => char.codePointAt(0)!.toString(16)).join('-');
	return `/emoji/${code}.svg`;
}
