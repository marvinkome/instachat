import firebase from 'react-native-firebase';
import { RemoteMessage } from 'react-native-firebase/messaging';

// types
type groupNotif = { name: string; messages: string[]; image?: string };
type notifStore = groupNotif[];

// constants
const CHANNEL_ID = 'test-channel';
const groupsNotifications: notifStore = [];

// functions
function createChannel(channelId: string) {
    const channel = new firebase.notifications.Android.Channel(
        channelId,
        'Test Channel',
        firebase.notifications.Android.Importance.Max
    ).setDescription('My apps test channel');
    firebase.notifications().android.createChannel(channel);
}

function summaryNotif(title: string, body: string, group: groupNotif) {
    const messagesLength = group.messages.length;
    const notification = new firebase.notifications.Notification()
        .setNotificationId(group.name)
        .setTitle(title)
        .setBody(messagesLength > 1 ? `${messagesLength} new messages` : body)
        .setData({ group: group.name })
        .android.setSmallIcon('ic_launcher_round')
        .android.setAutoCancel(true)
        .android.setChannelId(CHANNEL_ID)
        .android.setGroup(group.name)
        .android.setGroupSummary(true)
        .android.setDefaults([firebase.notifications.Android.Defaults.All])
        .android.setPriority(firebase.notifications.Android.Priority.High)
        .android.setGroupAlertBehaviour(firebase.notifications.Android.GroupAlert.Children);

    if (messagesLength > 1) {
        notification.android.setBigText(
            group.messages.join('\n'),
            undefined,
            `${messagesLength} new messages`
        );
        notification.android.setNumber(messagesLength);
    }

    if (group.image) {
        notification.android.setLargeIcon(group.image);
    }

    return notification;
}

function notif(title: string, body: string, id: string, group: string, image: string | null) {
    const notification = new firebase.notifications.Notification()
        .setNotificationId(id)
        .setTitle(title)
        .setBody(body)
        .setData({ group })
        .android.setChannelId(CHANNEL_ID)
        .android.setSmallIcon('ic_launcher_round')
        .android.setBigText(body)
        .android.setAutoCancel(true)
        .android.setGroup(group)
        .android.setDefaults([firebase.notifications.Android.Defaults.All])
        .android.setPriority(firebase.notifications.Android.Priority.High)
        .android.setGroupAlertBehaviour(firebase.notifications.Android.GroupAlert.Children);

    if (image) {
        notification.android.setLargeIcon(image);
    }

    return notification;
}

export default async (message: RemoteMessage) => {
    // create channel
    createChannel(CHANNEL_ID);

    // unpack values
    // @ts-ignore
    const { title, msg, groupId, msgId, groupImg } = message.data;

    // create notification
    const notification = notif(title, msg, msgId, groupId, groupImg);
    firebase.notifications().displayNotification(notification);

    // find group
    let group = groupsNotifications.find((item) => item.name === groupId);

    // if there's a group
    if (group) {
        // add new notificaion
        group.messages.push(msg);
    } else {
        // create new group
        group = {
            name: groupId,
            messages: [msg],
            image: groupImg
        };
        groupsNotifications.push(group);
    }

    // display summary notification
    const summaryNotification = summaryNotif(title, msg, group);
    firebase.notifications().displayNotification(summaryNotification);

    return Promise.resolve();
};
