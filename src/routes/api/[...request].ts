async function proxy(request: any, method: string) {
    let proxiedURL = request.url.href.replace("sunbeam.fateslist.xyz", "fateslist.xyz").replace("sunbeam-cf.fateslist.xyz", "fateslist.xyz")
    let headers = {
        'content-type': 'application/json', 
        "Frostpaw": "0.1.0", 
        "method": method
    }

    for (const property in request.headers) {
        if(property === "host" || property === "connection") {
            continue
        } else {
            headers[property.toLowerCase()] = request.headers[property]
        }
    }

    let res = await fetch(proxiedURL, {
        method: method,
        headers: headers,
        body: JSON.stringify(request.body)
    })

    let response = {
        status: res.status,
    }
    if(method !== "HEAD") {
        response["body"] = await res.json()
        response["body"]["new_api_url"] = "https://api.fateslist.xyz"
        response["body"]["_proxy"] = {
            headers: headers,
            method: method,
            data: request.body,
            dataStr: JSON.stringify(request.body)
        }
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