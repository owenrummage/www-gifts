import { prisma } from '$lib/database';
import { logger } from '$lib/logger.js';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	return {
		gifts: await prisma.gift.findMany({
			orderBy: {
				id: 'asc'
			}
		})
	};
};

export const actions = {
	unreserve: async ({ request, locals }) => {
		const session = await locals.auth();
		const formData = await request.formData();
		const id = formData.get('id') as string;

		if (!session?.user) return fail(401, 'Not signed in');
		if (!id) return fail(400, 'Missing id');

		const gift = await prisma.gift.findFirst({
			where: { id: parseInt(id) }
		});

		if (!gift) return fail(404, 'Gift not found');
		if (gift.reservedBy !== session?.user?.email)
			return fail(403, 'You do not have permission to unreserve this gift');

		logger.info(`Unreserved gift "${gift?.name}" for ${session.user.email}`, {
			user: session.user,
			type: 'unreserve'
		});
		await prisma.gift.update({
			where: { id: parseInt(id) },
			data: { reservedBy: null }
		});
	},

	reserve: async ({ request, locals }) => {
		const session = await locals.auth();
		const formData = await request.formData();
		const id = formData.get('id') as string;

		if (!session?.user) return fail(401, 'Not signed in');
		if (!id) return fail(400, 'Missing id');

		const gift = await prisma.gift.findFirst({
			where: { id: parseInt(id) }
		});

		if (gift?.reservedBy) return fail(403, 'This gift is already reserved');

		logger.info(`Reserved gift "${gift?.name}" for ${session.user.email}`, {
			user: session.user,
			type: 'reserve'
		});

		await prisma.gift.update({
			where: { id: parseInt(id) },
			data: { reservedBy: session.user.email }
		});
	}
};
