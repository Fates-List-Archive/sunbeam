async function proxy(request, method) {
  let proxiedURL = request.url.href.replace("sunbeam.fateslist.xyz", "fateslist.xyz").replace("sunbeam-cf.fateslist.xyz", "fateslist.xyz").replace("fateslist.xyz", "api.fateslist.xyz");
  let response = {
    status: 307,
    headers: { "Location": proxiedURL }
  };
  return response;
}
async function get(request) {
  return await proxy(request);
}
async function post(request) {
  return await proxy(request);
}
async function put(request) {
  return await proxy(request);
}
async function patch(request) {
  return await proxy(request);
}
async function del(request) {
  return await proxy(request);
}
async function options(request) {
  return await proxy(request);
}
async function head(request) {
  return await proxy(request);
}
export { del, get, head, options, patch, post, put };
