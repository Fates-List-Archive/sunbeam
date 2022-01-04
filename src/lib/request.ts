import { browser } from '$app/env';

// Change this if cf will ever be used
const usingCf = true

export async function fetchFates(url: string) {
    let res = null
    if(browser || usingCf) {
        // Always use direct if browser
        return await fetch("https://fateslist.xyz"+url, {headers: {"Frostpaw": "0.1"}})
    }
    try {
        res = await fetch("http://127.0.0.1:9999"+url)
    } catch (err) {
        res = await fetch("https://fateslist.xyz"+url)
    }
    return res
}

export async function roll(type: string) {
    const url = `https://fateslist.xyz/api/${type}s/0/random`
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

export async function voteHandler(userID: string, token: string, botID: string, test: boolean) {
    if(!browser) {
        return
    }
	if(!token || !userID) {
		alert("You must be logged in to vote for bots!")
		return
	}
    let res = await fetch(`https://fateslist.xyz/api/dragon/bots/${botID}/votes`, {
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
