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