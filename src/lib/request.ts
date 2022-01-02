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