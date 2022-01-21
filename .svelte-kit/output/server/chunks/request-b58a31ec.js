async function fetchFates(url, auth, fetch2) {
  let headers = { "Frostpaw": "0.1" };
  if (auth) {
    headers["Frostpaw-Auth"] = auth;
  }
  return await fetch2("https://api.fateslist.xyz" + url, { headers });
}
async function roll(type) {
  const url = `https://api.fateslist.xyz/api/${type}s/0/random`;
  const res = await fetch(url);
  const roll2 = await res.json();
  console.log(roll2);
  return roll2;
}
export { fetchFates as f, roll as r };
