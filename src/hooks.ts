import cookie from 'cookie';
import type { Handle } from '@sveltejs/kit';
import type { GetSession } from '@sveltejs/kit';
import { decode } from '@cfworker/base64url';

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');

	// TODO https://github.com/sveltejs/kit/issues/1046
	console.log(event.url);

	const response = await resolve(event);

	return response;
};

export const getSession: GetSession = async (event) => {
	console.log('getSession called');

	// Bypass dumb cloudflare bug
	/*let query = {}
	event.url.searchParams.forEach((v, k) => {
		query[k] = v
	})*/

	const cookies = cookie.parse(event.request.headers.get('cookie') || '');

	let sessionData = {};
	if (cookies['sunbeam-session:warriorcats']) {
		let newJwt = cookies['sunbeam-session:warriorcats'];

		try {
			// First base64 decode it
			let data = decode(newJwt);
			sessionData['rawData'] = data;
			// Then decode it using itsdanger
			sessionData = JSON.parse(data);
		} catch (e) {
			console.log(e);
		}
	}

	try {
		return {
			url: event.url.toJSON(), // CF adpter workaround, hopefully works?
			query: {},
			session: sessionData
		};
	} catch (err) {
		return {
			url: 'https://fateslist.xyz',
			query: {},
			session: {}
		};
	}
};
