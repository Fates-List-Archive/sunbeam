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
	if (cookies["sunbeam-session"]) {
		let jwt = cookies["sunbeam-session"]
		let key = cookies["sunbeam-key"]
		console.log({jwt, key})

		let res = await fetch("https://api.fateslist.xyz/api/v2/jwtparse/_sunbeam", {
			method: "POST",
			headers: {
				"Frostpaw": "0.1.0",
				"Content-Type": "application/json",
			}, 
			body: JSON.stringify({jwt: jwt, key: key})
		})
		let json = await res.json()
		sessionData = json
	}

	try {
		return {
			"url": event.url.toJSON(), // CF adpter workaround, hopefully works?
			"query": {},
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