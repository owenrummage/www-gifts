<script>
	import { enhance } from '$app/forms';

	export let data;
	$: gifts = data.gifts;
</script>

<div class="mb-12 w-full md:max-w-2xl" id="intro">
	<h1 class="text-2xl font-medium">Admin Area</h1>
	<p>
		Please see below for a list of gifts you can get me. All of the gifts on this list are
		thoughtful things that I need for school, work, or my hobbies and would appreciate and use for
	</p>
</div>

<div class="mb-8 w-full md:max-w-2xl">
	<h2 class="mb-4 text-xl font-medium">Add New Gift</h2>
	<form method="POST" action="?/create" class="space-y-4" use:enhance>
		<div>
			<label for="name" class="mb-1 block text-sm font-medium text-gray-300">Name</label>
			<input
				type="text"
				id="name"
				name="name"
				required
				class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
		</div>
		<div>
			<label for="description" class="mb-1 block text-sm font-medium text-gray-300"
				>Description</label
			>
			<textarea
				id="description"
				name="description"
				rows="3"
				class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
			></textarea>
		</div>
		<div>
			<label for="image" class="mb-1 block text-sm font-medium text-gray-300">Image URL</label>
			<input
				type="url"
				id="image"
				name="image"
				required
				class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
		</div>
		<div>
			<label for="price" class="mb-1 block text-sm font-medium text-gray-300">Price</label>
			<input
				type="number"
				id="price"
				name="price"
				step="0.01"
				min="0"
				required
				class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
		</div>
		<div>
			<label for="rating" class="mb-1 block text-sm font-medium text-gray-300">Rating</label>
			<input
				type="number"
				id="rating"
				name="rating"
				min="1"
				max="5"
				required
				class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
		</div>
		<div>
			<label for="link" class="mb-1 block text-sm font-medium text-gray-300">Link</label>
			<input
				type="url"
				id="link"
				name="link"
				required
				class="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
			/>
		</div>
		<button
			type="submit"
			class="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
		>
			Add Gift
		</button>
	</form>
</div>

<div class="overflow-x-auto">
	<table class="min-w-full border border-gray-700 bg-black">
		<thead class="bg-gray-900">
			<tr>
				<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase"
					>ID</th
				>
				<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase"
					>Name</th
				>
				<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase"
					>Description</th
				>
				<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase"
					>Image</th
				>
				<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase"
					>Price</th
				>
				<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase"
					>Rating</th
				>
				<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase"
					>Link</th
				>
				<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase"
					>Reserved By</th
				>
				<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase"
					>Reserved At</th
				>
				<th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase"
					>Actions</th
				>
			</tr>
		</thead>
		<tbody class="divide-y divide-gray-700 bg-black">
			{#each gifts as gift (gift.id)}
				<tr>
					<td class="px-6 py-4 text-sm whitespace-nowrap text-white">{gift.id}</td>
					<td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-white">{gift.name}</td>
					<td class="px-6 py-4 text-sm text-white">{gift.description || '-'}</td>
					<td class="px-6 py-4 text-sm whitespace-nowrap text-white">
						<img src={gift.image} alt={gift.name} class="h-16 w-16 rounded object-cover" />
					</td>
					<td class="px-6 py-4 text-sm whitespace-nowrap text-white">${gift.price.toFixed(2)}</td>
					<td class="px-6 py-4 text-sm whitespace-nowrap text-white">
						<div class="flex items-center">
							{#each Array(5) as _, i (i)}
								<svg
									class="h-4 w-4 {i < gift.rating ? 'text-yellow-400' : 'text-gray-600'}"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
									/>
								</svg>
							{/each}
							<span class="ml-1 text-sm text-gray-400">({gift.rating})</span>
						</div>
					</td>
					<td class="px-6 py-4 text-sm whitespace-nowrap text-white">
						<a
							href={gift.link}
							target="_blank"
							rel="noopener noreferrer"
							class="text-blue-400 hover:text-blue-300">View</a
						>
					</td>
					<td class="px-6 py-4 text-sm whitespace-nowrap text-white">{gift.reservedBy || '-'}</td>
					<td class="px-6 py-4 text-sm whitespace-nowrap text-white">
						{gift.reservedAt ? new Date(gift.reservedAt).toLocaleDateString() : '-'}
					</td>
					<td class="px-6 py-4 text-sm whitespace-nowrap text-white">
						<form method="POST" action="?/delete" use:enhance>
							<input type="hidden" name="id" value={gift.id} />
							<button
								type="submit"
								class="text-red-400 hover:text-red-300"
								on:click={(e) => {
									if (!confirm('Are you sure you want to delete this gift?')) {
										e.preventDefault();
									}
								}}
							>
								Delete
							</button>
						</form>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
