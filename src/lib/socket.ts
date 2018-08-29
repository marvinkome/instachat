import io from 'socket.io-client';
import { ToastAndroid } from 'react-native';
import { getAccessToken, clientId } from './fetch';

const Socket = async () => {
    const token = await clientId();
    const accessToken = await getAccessToken(token);

    const socket = io('http://localhost:5000', {
        transports: ['websocket'],
        query: {
            token: accessToken
        }
    });

    socket.on('disconnect', () => {
        ToastAndroid.show(
            'disconnected, possible authentication issues or server issues',
            ToastAndroid.LONG
        );
        console.warn('');
    });

    return socket;
};

export default Socket;
