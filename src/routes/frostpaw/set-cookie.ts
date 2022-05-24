// We have to set these cookies server side, this API does this

export async function get({ url }) {
	const json = url.searchParams.get('json');

	const removal = url.searchParams.get('removal');

	if(removal) {
		return {
			headers: {
				"set-cookie": [`sunbeam-session=;httponly;secure;path=/;expires=${new Date(0).toUTCString()};samesite=strict`]
			}
		}
	}
	return {
		headers: {
		  'set-cookie': [`sunbeam-session=${json};httponly;secure;path=/;max-age=28800;samesite=strict`]
		},
	};	
} 
