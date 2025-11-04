<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	injectAnalytics();
	injectSpeedInsights();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Owen's Wishlist</title>
</svelte:head>

<div class="p-8">
	{@render children()}
</div>
