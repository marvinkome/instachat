export async function auth(endpoint: string, body: any, options?: any) {
    const resp = await fetch(`http://localhost:3000/auth/${endpoint}`, {
        ...options,
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return resp.json();
}
