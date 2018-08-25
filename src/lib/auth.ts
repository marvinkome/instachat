export async function auth(endpoint: string, body: any) {
    const resp = await fetch(`http://localhost:5000/auth/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return resp.json();
}
