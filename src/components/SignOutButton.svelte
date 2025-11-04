<script>
	import { signOut } from '@auth/sveltekit/client';
</script>

<div class="mt-8 flex flex-row items-center justify-center">
	<button class="rounded-md bg-red-500 px-4 py-2 text-white" on:click={() => signOut()}
		>Logout of account</button
	>
</div>
