import { ALLOWED_USERS } from '$env/static/private';
import { prisma } from '$lib/database';
import { logger } from '$lib/logger.js';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ parent }) => {
	const { session } = await parent();

	logger.warning(`Loading admin page for ${session?.user?.email}`, {
		user: session?.user,
		type: 'admin.view'
	});

	if (!session) return redirect(307, '/');
	if (!session.user) return redirect(307, '/');
	if (!session.user.email) return redirect(307, '/');

	if (!ALLOWED_USERS.split(',').includes(session.user?.email)) return redirect(307, '/');

	return {
		gifts: await prisma.gift.findMany({
			orderBy: {
				id: 'asc'
			}
		})
	};
};

export const actions = {
	async delete({ request, locals }) {
		const session = await locals.auth();
		if (!session || session.user?.email !== 'owenrumage@gmail.com')
			return fail(403, 'Unauthorized');

		const formData = await request.formData();
		const id = formData.get('id');

		if (typeof id !== 'string') return fail(400, 'Invalid ID');

		logger.warning(`Deleting gift ${id}`, { user: session.user, type: 'admin.delete' });
		await prisma.gift.delete({
			where: {
				id: parseInt(id)
			}
		});
	},
	async create({ request, locals }) {
		const session = await locals.auth();
		if (!session || session.user?.email !== 'owenrumage@gmail.com')
			return fail(403, 'Unauthorized');

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

		logger.info(`Creating gift ${name}}`, { user: session.user, type: 'admin.create' });

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
