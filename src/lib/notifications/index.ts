import PushNotifications from 'react-native-push-notification';

export function localNotification() {
    PushNotifications.localNotification({
        autoCancel: true,
        largeIcon: 'ic_launcher',
        smallIcon: 'ic_notification',
        bigText: 'My big text that will be shown when notification is expanded',
        subText: 'This is a subText',
        color: 'green',
        vibrate: true,
        vibration: 300,
        title: 'Notification Title',
        message: 'Notification Message',
        playSound: true,
        soundName: 'default',
        actions: '["Accept", "Reject"]'
    });
}

export function subscribeToGroup(groupId: string) {
    PushNotifications.subscribeToTopic(groupId);
}

export default function configure() {
    PushNotifications.configure({
        onRegister: (token) => {
            console.warn(token);
        },

        onNotification: (notification) => {
            console.warn('notifications');
        },

        senderID: '64393229649'
    });
}
