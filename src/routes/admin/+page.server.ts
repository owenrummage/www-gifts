import { prisma } from '$lib/database';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	const { session } = await parent();

	if (!session) return redirect(307, '/');
	if (session.user?.email !== 'owenrumage@gmail.com') return redirect(307, '/');

	return {
		gifts: await prisma.gift.findMany({
			orderBy: {
				id: 'asc'
			}
		})
	};
};

export const actions = {
	async delete({ request }) {
		const formData = await request.formData();
		const id = formData.get('id');

		if (typeof id !== 'string') return fail(400, 'Invalid ID');

		await prisma.gift.delete({
			where: {
				id: parseInt(id)
			}
		});
	},
	async create({ request }) {
		const formData = await request.formData();
		const name = formData.get('name');
		const description = formData.get('description');
		const image = formData.get('image');
		const price = formData.get('price');
		const rating = formData.get('rating');
		const link = formData.get('link');

		if (
			typeof name !== 'string' ||
			typeof image !== 'string' ||
			typeof price !== 'string' ||
			typeof rating !== 'string' ||
			typeof link !== 'string'
		)
			return fail(400, 'Invalid input');

		await prisma.gift.create({
			data: {
				name,
				description: typeof description === 'string' ? description : null,
				image,
				price: parseFloat(price),
				rating: parseInt(rating),
				link
			}
		});
	}
};
