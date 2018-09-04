import { AsyncStorage } from 'react-native';
import { auth } from './auth';

export const clientId = async () => {
    const token = await AsyncStorage.getItem('client_id');
    return token;
};

export const getAccessToken = async (token: any) => {
    const data = await auth('', { client_token: token });
    return data.payload;
};

async function customFetch(uri: string, options: any) {
    const token = await clientId();

    // if there's token continue
    if (token) {
        // authenticate and get an access token
        try {
            // const accessToken = await getAccessToken(token);
            options.headers.Authorization = `Bearer ${token}`;
        } catch {
            console.warn('Error connecting with server');
            // what do we do?
            // log him out? yeah
            // logout
        }
    } else {
        console.warn('Not authenticated');
    }

    return fetch(uri, options);
}

export default customFetch;
