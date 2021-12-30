export async function fetchFates(url: string) {
    let res = null
    try {
        res = await fetch("http://127.0.0.1:9999"+url)
    } catch (err) {
        res = await fetch("https://fateslist.xyz"+url)
    }
    return res
}