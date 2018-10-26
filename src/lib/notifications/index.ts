import firebase from 'react-native-firebase';

export default async function configure() {
    const messaging = firebase.messaging();
    const enabled = await messaging.hasPermission();
    if (!enabled) {
        try {
            await messaging.requestPermission();
        } catch (e) {
            return;
        }
    }

    return;
}
