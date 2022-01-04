import cookie from 'cookie';
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

export async function getSession(request) {
	console.log("getSession called")

	// Bypass dumb cloudflare bug
	let query = {}
	request.url.searchParams.forEach((v, k) => {
		query[k] = v
	})

	const cookies = cookie.parse(request.headers.cookie || '');

	let sessionData = {}
	if (cookies["sunbeam-session"]) {
		let jwt = cookies["sunbeam-session"]
		let sessionRes = await fetch(`https://api.fateslist.xyz/api/v2/jwtparse/_sunbeam?jwt=${jwt}`)
		try {
			sessionData = await sessionRes.json()
		} catch(err) {
			sessionData = {}
		}
	}
	try {
		return {
			"url": request.url.toJSON(), // CF adpter workaround, hopefully works?
			"query": query,
			"session": sessionData
		}
	} catch(err) {
		return {
			"url": "https://fateslist.xyz",
			"query": {},
			"session": {}
		}
	}
}