import PushNotifications, { PushNotification } from 'react-native-push-notification';

export function localNotification(notification: PushNotification) {
    // @ts-ignore
    PushNotifications.localNotification({
        group: 'Fakers',
        priority: 'high',
        visibility: 'private',
        importance: 'high',

        // @ts-ignore
        message: notification.msg,
        ...notification
    });
}

export function subscribeToGroup(groupId: string) {
    // @ts-ignore
    PushNotifications.subscribeToTopic(groupId);
}

export default function configure(
    onRegister: (token: any) => Promise<any>,
    onNotification?: (notification: any) => void
) {
    PushNotifications.configure({
        onRegister: (token) => {
            onRegister(token).catch((e) => null);
            console.log(token);
        },

        onNotification: (notification) => {
            if (!notification.foreground) {
                // @ts-ignore
                localNotification(notification);
            }
            if (onNotification) {
                onNotification(notification);
            }
            console.log('notifications', notification);
        },

        senderID: '64393229649'
    });
}
