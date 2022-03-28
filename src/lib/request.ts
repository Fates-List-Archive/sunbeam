import { browser } from '$app/env';
import { apiUrl, nextUrl } from './config';
import alertstore  from "./alertstore";

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
    	capiUrl = nextUrl
    } 
    return await fetch(capiUrl+url, {headers: headers})
}

export async function roll(type: string) {
    const url = `/random-${type}`
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
	let res = await fetch(`${nextUrl}/oauth2`, {
		method: "GET",
		headers: {
			'Content-Type': 'application/json', 
			"Frostpaw": "0.1.0",
			"Frostpaw-Server": window.location.origin
		},
	})
	let json = await res.json()
	if(!noSetStorage && localStorage.loginError == "1") {
		json.context += "&prompt=none"
		localStorage.removeItem("loginError")
	}

    if(!noSetStorage) {
        localStorage.sunbeamLoginState = json.reason;
    }

	window.location.href = json.context
}

export async function voteHandler(userID: string, token: string, botID: string, test: boolean) {
    if(!browser) {
        return
    }
	if(!token || !userID) {
		await loginUser(false)
		return
	}
    let res = await fetch(`${nextUrl}/users/${userID}/bots/${botID}/votes?test=${test}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json', 
            "Frostpaw": "0.1.0", 
            "Authorization": token
        },
    })
    return res
}

export async function addReviewHandler(
    user_id, 
    token, 
    target_id, 
    type, 
    parent_id,
    review_text,
    star_rating,
    method="POST",
    review_id=null,
) {
    if(!browser) {
        return
    }

    let targetType = 0
    if(type == "server") {
        targetType = 1
    }
    let json = {
        review_text: review_text,
        star_rating: star_rating,
        flagged: false,
        reply: parent_id != null,
        parent_id: parent_id,
        epoch: [],
        replies: [],
        votes: {
            upvotes: [],
            downvotes: [],
            votes: []
        }
    }

    if(review_id) {
        json.id = review_id
    }

    json.user = {
        id: user_id,
        username: "",
        avatar: "",
        disc: "",
        status: "Unknown",
        bot: false
    }

    let res = await fetch(`${nextUrl}/reviews/${target_id}?user_id=${user_id}&target_type=${targetType}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Frostpaw": "0.1.0",
            "Authorization": token
        },
        body: JSON.stringify(json)
    })
    if(res.ok) {
        alert("Successfully posted your review")
        return true
    }
    let err = await res.json()
    alert(err.reason)	
    return false;
}
