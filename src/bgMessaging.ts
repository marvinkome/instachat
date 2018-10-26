import firebase from 'react-native-firebase';
import { RemoteMessage } from 'react-native-firebase/messaging';

const CHANNEL_ID = 'test-channel';
const oldNotifications: string[] = [];

function createChannel(channelId: string) {
    const channel = new firebase.notifications.Android.Channel(
        channelId,
        'Test Channel',
        firebase.notifications.Android.Importance.Max
    ).setDescription('My apps test channel');
    firebase.notifications().android.createChannel(channel);
}

function summaryNotif(title: string, body: string, group: string) {
    oldNotifications.push(body);
    const notification = new firebase.notifications.Notification()
        .setNotificationId(group)
        .setTitle(title)
        .setBody(oldNotifications.length > 1 ? `${oldNotifications.length} new messages` : body)
        .android.setSmallIcon('ic_launcher')
        .android.setAutoCancel(true)
        .android.setChannelId(CHANNEL_ID)
        .android.setGroup(group)
        .android.setGroupSummary(true)
        .android.setGroupAlertBehaviour(firebase.notifications.Android.GroupAlert.Children);

    notification.android.setBigText(oldNotifications.join('\n'));
    return notification;
}

function notif(title: string, body: string, id: string, group: string) {
    return new firebase.notifications.Notification()
        .setNotificationId(id)
        .setTitle(title)
        .setBody(body)
        .android.setChannelId(CHANNEL_ID)
        .android.setSmallIcon('ic_launcher')
        .android.setBigText(body)
        .android.setAutoCancel(true)
        .android.setGroup(group)
        .android.setGroupAlertBehaviour(firebase.notifications.Android.GroupAlert.Children);
}

export default async (message: RemoteMessage) => {
    // create channel
    createChannel(CHANNEL_ID);

    // unpack values
    // @ts-ignore
    const { title, msg, groupId, msgId } = message.data;

    const notification = notif(title, msg, msgId, groupId);
    firebase.notifications().displayNotification(notification);

    const summaryNotification = summaryNotif(title, msg, groupId);
    firebase.notifications().displayNotification(summaryNotification);

    return Promise.resolve();
};
