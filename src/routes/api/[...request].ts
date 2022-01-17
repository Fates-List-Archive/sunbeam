// Simple request proxy
async function proxy(request: any, method: string) {
    let proxiedURL = request.url.href.replace("sunbeam.fateslist.xyz", "fateslist.xyz").replace("sunbeam-cf.fateslist.xyz", "fateslist.xyz").replace("fateslist.xyz", "api.fateslist.xyz")

    let response = {
        status: 307,
        headers: {"Location": proxiedURL}
    }

    return response
}

export async function get(request) {
    return await proxy(request, "GET")
}

export async function post(request) {
    return await proxy(request, "POST")
}

export async function put(request) {
    return await proxy(request, "PUT")
}

export async function patch(request) {
    return await proxy(request, "PATCH")
}

export async function del(request) {
    return await proxy(request, "DELETE")
}

export async function options(request) {
    return await proxy(request, "OPTIONS")
}

export async function head(request) {
    return await proxy(request, "HEAD")
}
