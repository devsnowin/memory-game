<script lang="ts">
	import { levels, type Level } from '$/lib/levels';
</script>

<div class="container">
	<p>Memory Game - Find the correct match</p>
	<h2>Choose a level</h2>

	<div class="buttons">
		{#each levels as level}
			<button on:click>{level.label}</button>
		{/each}
	</div>
</div>

<style>
</style>
