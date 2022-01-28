import cookie from 'cookie';
import type { Handle } from '@sveltejs/kit';
import type { GetSession } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get("cookie") || '');

	// TODO https://github.com/sveltejs/kit/issues/1046
	console.log(event.url)

	const response = await resolve(event);

	return response;
};

export const getSession: GetSession = async (event) => {
	console.log("getSession called")

	// Bypass dumb cloudflare bug
	/*let query = {}
	event.url.searchParams.forEach((v, k) => {
		query[k] = v
	})*/

	const cookies = cookie.parse(event.request.headers.get("cookie") || '');

	let sessionData = {}
	if (cookies["sunbeam-key"]) {
		let newJwt = cookies["sunbeam-session:warriorcats"]

		// First base64 decode it
		let data = ""
		function base64_decode(s) {   
			try {   
				return decodeURIComponent(escape(atob(s)));
			} catch (err) {
				return Buffer.from(s, 'base64').toString('binary')
			}
		}
		data = base64_decode(newJwt)
		sessionData["rawData"] = data
		// Then decode it using itsdanger
		sessionData = JSON.parse(data)
	}

	try {
		return {
			"url": event.url.toJSON(), // CF adpter workaround, hopefully works?
			"query": {},
			"session": sessionData
		}
	} catch(err) {
		throw err
		return {
			"url": "https://fateslist.xyz",
			"query": {},
			"session": {}
		}
	}
}