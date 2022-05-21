export async function get({ url }) {
	const reqUrl = url.searchParams.get('url');
	if (reqUrl) {
		const res = await fetch(reqUrl);
		if (!res.ok) {
			return { status: res.status };
		} else {
			const json = await res.json();
			return { status: 200, body: json };
		}
	} else {
		return { status: 404 };
	}
}
