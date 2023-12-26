<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Box from './Box.svelte';

	export let grid: string[];
	export let found: string[];

	const dispatch = createEventDispatcher();

	let a: number = -1;
	let b: number = -1;

	let resetTimeout: number;

	function handleBoxClick(emoji: string, i: number) {
		if (a > -1 && b > -1) {
			clearTimeout(resetTimeout);
			a = i;
			b = -1;
		} else if (a > -1) {
			b = i;

			if (grid[a] === grid[b]) {
				// correct — remove from grid
				found = [...found, grid[a]];
				dispatch('found', { emoji: grid[a] });
			} else {
				// incorrect — reset after timeout
				resetTimeout = setTimeout(() => {
					a = b = -1;
				}, 1000);
			}
		} else {
			a = i;
		}
	}
</script>

<div class="boxes">
	{#each grid as emoji, i}
		<Box
			{emoji}
			on:click={() => handleBoxClick(emoji, i)}
			selected={a === i || b === i}
			found={found.includes(emoji)}
			group={i === grid.indexOf(emoji) ? 'a' : 'b'}
		/>
	{/each}
</div>

<style>
	.boxes {
		height: 100%;
		display: grid;
		gap: 0.5rem;
		grid-template-columns: repeat(var(--size), 1fr);
		grid-template-rows: repeat(var(--size), 1fr);
		perspective: 100vw;
	}
</style>
