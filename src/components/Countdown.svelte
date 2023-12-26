<script lang="ts">
	export let remaining: number;
	export let duration: number;
</script>

<div class="countdown">
	<button on:click>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
			><title>pause-circle</title><path
				d="M15,16H13V8H15M11,16H9V8H11M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
				fill="hsl(var(--accent))"
			/></svg
		>
	</button>

	<div class="duration">
		<div class="remaining" style="--p: {remaining / duration}"></div>
	</div>
</div>

<style>
	.countdown {
		display: flex;
		height: 100%;
		align-items: center;
		gap: 1rem;
	}

	button {
		all: unset;
		cursor: pointer;
		width: 1em;
		display: grid;
		place-items: center;
		font-size: 8em;
	}

	.duration {
		position: relative;
		flex: 1;
		height: 1em;
		background-color: hsl(var(--accent));
	}

	.remaining {
		position: absolute;
		width: calc(100% * var(--p));
		height: 100%;
		background-color: hsl(var(--muted));
	}
</style>
