<script lang="ts">
</script>

<dialog open class="modal" id="modal">
	<div class="modal-content">
		<slot />
	</div>
</dialog>

<style>
	.modal {
		all: unset;
		z-index: 999;
		position: absolute;
		inset: 0;
		display: block;
		width: 100%;
		height: 100vh;
		background-color: hsla(1, 1%, 1%, 0.5);
		border-radius: 10px;
		backdrop-filter: blur(10px);
	}

	.modal-content {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
