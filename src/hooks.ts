import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');

	// TODO https://github.com/sveltejs/kit/issues/1046
	const method = request.query.get('_method');
	if (method) {
		request.method = method.toUpperCase();
	}

	const response = await resolve(request);

	request.locals.session = null;

	if (cookies.session) {
		// TODO: Fetch session data from backend here
		request.locals.session = cookies.session;
	}

	return response;
};
