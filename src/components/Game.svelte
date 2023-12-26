<script lang="ts">
	import CardBox from './Boxes.svelte';
	import Found from '$/components/Found.svelte';
	import { shuffle } from '$/lib/utils';
	import { type Level } from '$/lib/levels';
	import Countdown from './Countdown.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let size: number;
	let grid: string[] = [];
	let found: string[] = [];
	let remaining: number;
	let duration: number;
	let playing: boolean;

	export function start(level: Level) {
		size = level.size;
		remaining = duration = level.duration;

		const sliced = level.emojis.slice();
		const pairs: string[] = [];

		// pick a set of emojis at random
		for (let i = 0; i < (size * size) / 2; i += 1) {
			const index = Math.floor(Math.random() * sliced.length);
			const emoji = sliced[index];
			sliced.splice(index, 1);
			pairs.push(emoji);
		}

		// repeat the set
		grid = shuffle([...pairs, ...pairs]);
		found = [];

		resume();
	}

	export function resume() {
		playing = true;
		countdown();

		dispatch('play');
	}

	function countdown() {
		const start = Date.now();
		let remainingAtStart = remaining;

		function loop() {
			if (!playing) return;

			requestAnimationFrame(loop);

			remaining = remainingAtStart - (Date.now() - start);

			if (remaining <= 0) {
				playing = false;
				dispatch('lose');
			}
		}

		loop();
	}
</script>

<div class="game" style="--size: {size}">
	<div class="info">
		{#if playing}
			<Countdown
				{remaining}
				{duration}
				on:click={() => {
					playing = false;
					dispatch('pause');
				}}
			/>
		{/if}
	</div>
	<div class="box-container">
		{#key grid}
			<CardBox
				{grid}
				on:found={(e) => {
					found = [...found, e.detail.emoji];

					if (found.length === (size * size) / 2) {
						playing = false;
						setTimeout(() => {
							playing = false;
							dispatch('win');
						}, 1000);
					}
				}}
				{found}
			/>
		{/key}
	</div>
	<div class="info">
		<Found {found} />
	</div>
</div>

<style>
	.game {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		font-size: min(1vmin, 0.3rem);
	}

	.info {
		width: 80em;
		height: 20em;
	}

	.box-container {
		width: 90em;
		height: 90em;
	}
</style>
