import cookie from 'cookie';
import type { Handle } from '@sveltejs/kit';
import type { GetSession } from '@sveltejs/kit';
import RD from "reallydangerous"

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
		let newJwt = cookies["sunbeam-session-v2"]
		let key = cookies["sunbeam-key"]

		if(newJwt) {
			try {
				// First base64 decode it
				let data = Buffer.from(newJwt, "base64").toString("binary")
				console.log(key)
				// Then decode it using itsdanger
				let signer = new RD.TimestampSigner(key, "auth");
				let rawData = signer.unsign(data)
				sessionData = JSON.parse(rawData)
			} catch (e) {
				console.log(e)
			}
		}
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