import { browser } from '$app/env';
export async function fetchFates(url: string) {
    let res = null
    if(browser || process.env.NODE_VERSION) {
        // Always use direct if browser
        return await fetch("https://fateslist.xyz"+url)
    }
    try {
        res = await fetch("http://127.0.0.1:9999"+url)
    } catch (err) {
        res = await fetch("https://fateslist.xyz"+url)
    }
    return res
}