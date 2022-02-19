import { browser } from '$app/env';
import { apiUrl } from './config';

// Change this if cf will ever be used
const usingCf = true

export async function fetchFates(url: string, auth: string, fetch: any, votePage = false, nextApi: boolean = false) {
    // Always use direct if browser
    let headers = {"Frostpaw": "0.1"}

    if(auth) {
        headers["Frostpaw-Auth"] = auth
        headers["Authorization"] = auth
    }
    if(votePage) {
        console.log("Adding vote page headers")
        headers["Frostpaw-Vote-Page"] = "1"
    }
    let capiUrl = apiUrl
    if(nextApi) {
    	capiUrl = "https://next.fateslist.xyz"
    } 
    return await fetch(capiUrl+url, {headers: headers})
}

export async function roll(type: string) {
    const url = `/random-bot`
    const res = await fetchFates(url, "", fetch, false, true)
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

export async function loginUser(noSetStorage: boolean) {
	if(!noSetStorage) {
                localStorage.sunbeamLogin = window.location.href
	}
	let res = await fetch(`${apiUrl}/api/v2/oauth`, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json', 
			"Frostpaw": "0.1.0",
			"Frostpaw-Server": window.location.origin
		},
	})
	let json = await res.json()
	if(!noSetStorage && localStorage.loginError == "1") {
		json.url += "&prompt=none"
		localStorage.removeItem("loginError")
	}
	window.location.href = json.url
}

export async function voteHandler(userID: string, token: string, botID: string, test: boolean) {
    if(!browser) {
        return
    }
	if(!token || !userID) {
		await loginUser(false)
		return
	}
    let res = await fetch(`${apiUrl}/api/dragon/bots/${botID}/votes`, {
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
        alert(data.reason)
	if(!test) {
        	window.location.reload()
	}
    } else {
        alert(data.reason)
    }
}
