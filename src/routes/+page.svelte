<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';

	import Game from '$/components/Game.svelte';
	import Model from '$/components/Modal.svelte';
	import { levels } from '$/lib/levels';

	let state: 'waiting' | 'playing' | 'paused' | 'won' | 'lost' = 'waiting';

	let game: Game;
</script>

<div class="main-wrapper">
	<Game
		bind:this={game}
		on:play={() => {
			state = 'playing';
		}}
		on:pause={() => {
			state = 'paused';
		}}
		on:win={() => {
			state = 'won';
		}}
		on:lose={() => {
			state = 'lost';
		}}
	/>

	{#if state !== 'playing'}
		<Model>
			<header class="modal-head">
				<h1>Memory <span>Game</span></h1>
				<p>Find the correct match</p>
			</header>
			<div class="container">
				{#if state === 'waiting'}
					<h2>Choose a level</h2>
				{:else if state === 'paused'}
					<h2>Paused</h2>
				{:else if state === 'won' || state === 'lost'}
					<p>You have {state} the game</p>
				{/if}

				<div class="buttons">
					{#if state === 'paused'}
						<button on:click={game.resume}>Resume</button>
						<button on:click={() => (state = 'waiting')}>Quit</button>
					{:else}
						{#each levels as level}
							<button
								on:click={() => {
									game.start(level);
									state = 'playing';
								}}>{level.label}</button
							>
						{/each}
					{/if}
				</div>
			</div>
		</Model>
	{/if}

	{#if state === 'won'}
		<div
			class="confetti"
			use:confetti={{
				stageHeight: innerHeight,
				stageWidth: innerWidth
			}}
		></div>
	{/if}
</div>

<style>
	.main-wrapper {
		height: 100vh;
	}

	span {
		color: hsl(var(--primary));
	}

	.modal-head {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.4rem;
		text-align: center;
	}

	.container {
		margin-top: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	.buttons {
		display: flex;
		align-items: center;
		gap: 0.8rem;
	}

	button {
		all: unset;
		cursor: pointer;
		/* background-color: hsl(var(--primary)); */
		border: 2px solid hsl(var(--primary));
		height: 4vh;
		padding-inline: 2rem;
		border-radius: var(--radius);
		transition: background-color 0.3s ease;
	}

	.buttons button:hover {
		background-color: hsl(var(--primary), 1);
	}

	.confetti {
		position: fixed;
		top: 30%;
		left: 50%;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
</style>
