import { logger } from '$lib/logger';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request, locals }) => {
	const session = await locals.auth();

	if (session?.user) {
		logger.info('Loaded page ' + request.url, { user: session.user, type: 'access' });
	} else {
		logger.info('Loaded page ' + request.url, { type: 'access' });
	}

	return {
		session
	};
};
