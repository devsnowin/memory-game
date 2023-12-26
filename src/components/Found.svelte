<script lang="ts">
	import { receive } from '$/lib/transition';
	import { getEmojiUrl } from '$/lib/utils';

	export let found: string[];
</script>

<div class="found">
	{#each found as emoji}
		<div class="pair">
			<img in:receive={{ key: `${emoji}:a` }} src={getEmojiUrl(emoji)} alt={emoji} />
			<img in:receive={{ key: `${emoji}:b` }} src={getEmojiUrl(emoji)} alt={emoji} />
		</div>
	{/each}
</div>

<style>
	.found {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0.5rem;
		filter: drop-shadow(0.2em, 0.2em, 0.5em, rgba(0, 0, 0, 0.2));
	}

	.pair {
		position: relative;
		width: 10em;
		height: 10em;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: hsl(var(--muted));
		border-radius: 50%;
	}

	img {
		position: absolute;
		width: 5em;
		height: 5em;
	}
</style>
