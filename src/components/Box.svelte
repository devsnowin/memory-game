<script lang="ts">
	import { send } from '$/lib/transition';
	import { getEmojiUrl } from '$/lib/utils';

	export let emoji: string;
	export let selected: boolean;
	export let found: boolean;
	export let group: 'a' | 'b';
</script>

<div class="box" class:flipped={selected || found}>
	<button on:click disabled={selected || found} />
	<div class="bg"></div>
	{#if !found}
		<img
			out:send={{ key: `${emoji}:${group}` }}
			src={getEmojiUrl(emoji)}
			alt={emoji}
			class="emoji"
		/>
	{/if}
</div>

<style>
	.box {
		position: relative;
		display: grid;
		place-items: center;
		transition: transform 0.5s;
		transform-style: preserve-3d;
	}

	.flipped {
		transform: rotateY(180deg);
	}

	.bg {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: hsl(var(--accent));
		transform: rotateY(180deg);
		backface-visibility: hidden;
		border-radius: var(--radius);
	}

	button {
		all: unset;
		position: absolute;
		width: 100%;
		height: 100%;
		cursor: pointer;
		background-color: hsl(var(--muted));
		backface-visibility: hidden;
		border-radius: var(--radius);
	}

	.emoji {
		z-index: 2;
		width: 6em;
		height: 6em;
		pointer-events: none;
		transform: rotateY(180deg);
		backface-visibility: hidden;
	}
</style>
