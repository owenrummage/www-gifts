<script>
	import { page } from '$app/stores';
	import GiftCard from '../components/GiftCard.svelte';
	import SignOutButton from '../components/SignOutButton.svelte';
</script>

<div class="w-full md:max-w-2xl" id="intro">
	<h1 class="text-2xl font-medium">Welcome to <strong>Owen's Gift Site</strong></h1>
	<p>
		Please see below for a list of gifts you can get me. All of the gifts on this list are
		thoughtful things that I need for school, work, or my hobbies and would appreciate and use for
	</p>
	<ul class="mt-4 ml-4">
		<li><strong>Step 1:</strong> Reserve the gift</li>
		<li><strong>Step 2:</strong> Buy the gift</li>
		<li><strong>Step 3:</strong> Give it to Owen at the right time</li>
	</ul>
</div>

<div id="gifts" class="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	{#if $page.data.gifts.length > 0}
		{#each $page.data.gifts as gift (gift.id)}
			<GiftCard {gift} />
		{/each}
	{:else}
		<p>No gifts available</p>
	{/if}
</div>

{#if $page.data.session?.user}
	<SignOutButton />
{/if}
