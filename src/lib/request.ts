import { browser } from '$app/env';

// Change this if cf will ever be used
const usingCf = true

export async function fetchFates(url: string) {
    // Always use direct if browser
    return await fetch("https://api.fateslist.xyz"+url, {headers: {"Frostpaw": "0.1"}})
}

export async function roll(type: string) {
    const url = `https://api.fateslist.xyz/api/${type}s/0/random`
    const res = await fetch(url)
    const roll = await res.json()
    console.log(roll)
    return roll
}

export function getCookie(name, cookie) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = null;
    if(cookie) {
        match = cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    }
    match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}

export async function loginUser() {
	localStorage.sunbeamLogin = window.location.href
	let res = await fetch("https://api.fateslist.xyz/api/v2/oauth", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json', 
			"Frostpaw": "0.1.0",
			"Frostpaw-Server": window.location.origin
		},
		body: JSON.stringify({"scopes": ["identify"]})
	})
	let json = await res.json()
	window.location.href = json.url
}

export async function voteHandler(userID: string, token: string, botID: string, test: boolean) {
    if(!browser) {
        return
    }
	if(!token || !userID) {
		await loginUser()
		return
	}
    let res = await fetch(`https://api.fateslist.xyz/api/dragon/bots/${botID}/votes`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json', 
            "Frostpaw": "0.1.0", 
            "Authorization": token
        },
        body: JSON.stringify({user_id: userID, test: test})
    })
    let data = await res.json()
    if(res.ok) {
        alert("Successfully voted for this bot!")
        window.location.reload()
    } else {
        alert(JSON.stringify(data.reason))
    }
}
