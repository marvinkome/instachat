import { API_SERVER } from './keys';

export async function auth(endpoint: string, body: any, options?: any) {
    const resp = await fetch(`${API_SERVER.http}/auth/${endpoint}`, {
        ...options,
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            ...(options && options.headers ? options.headers : {}),
            'Content-Type': 'application/json'
        }
    });

    if (resp.status > 200) {
        throw Error(await resp.json());
    }

    return resp.json();
}
