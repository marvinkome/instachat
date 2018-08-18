import { AsyncStorage } from 'react-native';
import { auth } from './auth';

const clientId = async () => {
    const token = await AsyncStorage.getItem('client_id');
    return token;
};

async function customFetch(uri: string, options: any) {
    const token = await clientId();

    // if there's token continue
    if (token) {
        // authenticate and get an access token
        try {
            const data = await auth('', { client_token: token });
            const accessToken = data.payload;
            options = {
                header: {
                    authorization: `Bearer ${accessToken}`
                }
            };
        } catch {
            // what do we do?
            // log him out? yeah
            // logout
        }
    }

    return fetch(uri, options);
}

export default customFetch;
