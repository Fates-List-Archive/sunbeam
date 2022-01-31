export async function get({ url }) {
	let reqUrl = url.searchParams.get("url")
	if(reqUrl) {
		let res = await fetch(reqUrl)
		if(!res.ok) {
			return {status: res.status}
		} else {
			let json = await res.json()
			return {status: 200, body: json}
		}
	} else {
		return {status: 404}
	}
}
