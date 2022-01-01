import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');

	// TODO https://github.com/sveltejs/kit/issues/1046
	const method = request.url.searchParams.get('_method');
	if (method) {
		request.method = method.toUpperCase();
	}

	console.log(request.url)
	console.log(request.params)

	const response = await resolve(request);

	return response;
};
