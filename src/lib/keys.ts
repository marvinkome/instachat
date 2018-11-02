function getApiUrl(env: string) {
    switch (env) {
        case 'production':
            return {
                http: 'https://instachat-api.herokuapp.com',
                ws: 'wss://instachat-api.herokuapp.com'
            };
        default:
            return { http: 'http://localhost:3000', ws: 'ws://localhost:3000' };
    }
}

export const API_SERVER = getApiUrl('production');
