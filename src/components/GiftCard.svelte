<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import type { Gift } from '../generated/prisma/browser';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	export let gift: Gift;
</script>

<div
	class:hidden={gift.reservedBy && gift.reservedBy !== $page.data?.session?.user?.email}
	class="flex h-full flex-col rounded border border-neutral-800 bg-neutral-900 p-4 shadow-sm"
>
	<img src={gift.image} alt="Product" class="mb-2 min-h-0 w-full flex-1 rounded object-cover" />
	<div class="flex justify-between">
		<h1 class="mb-2 text-xl font-semibold">{gift.name}</h1>
		<span class="text-lg font-bold">${gift.price}</span>
	</div>
	<h1 class="mb-2">
		{gift.description ? gift.description : 'No description available'}
	</h1>
	{#if $page.data?.session?.user}
		{#if gift.reservedBy && gift.reservedBy == $page.data.session.user.email}
			<form method="POST" use:enhance>
				<input type="hidden" name="id" value={gift.id} />
				<button
					formaction="?/unreserve"
					class="w-full rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
				>
					Unreserve
				</button>
			</form>
		{:else if !gift.reservedBy}
			<form method="POST" use:enhance>
				<input type="hidden" name="id" value={gift.id} />
				<button
					formaction="?/reserve"
					class="w-full rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
				>
					Reserve
				</button>
			</form>
		{/if}
	{:else}
		<button
			class="w-full rounded bg-neutral-600 px-4 py-2 text-white transition-colors hover:bg-neutral-700"
			on:click={() => signIn('google')}
		>
			Sign In to Reserve Gift
		</button>
	{/if}
</div>
