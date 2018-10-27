import firebase from 'react-native-firebase';
import { RemoteMessage } from 'react-native-firebase/messaging';

// types
type groupNotif = { name: string; messages: string[] };
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
        .android.setSmallIcon('ic_launcher')
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

    return notification;
}

function notif(title: string, body: string, id: string, group: string) {
    return new firebase.notifications.Notification()
        .setNotificationId(id)
        .setTitle(title)
        .setBody(body)
        .setData({ group })
        .android.setChannelId(CHANNEL_ID)
        .android.setSmallIcon('ic_launcher')
        .android.setBigText(body)
        .android.setAutoCancel(true)
        .android.setGroup(group)
        .android.setDefaults([firebase.notifications.Android.Defaults.All])
        .android.setPriority(firebase.notifications.Android.Priority.High)
        .android.setGroupAlertBehaviour(firebase.notifications.Android.GroupAlert.Children);
}

export default async (message: RemoteMessage) => {
    // create channel
    createChannel(CHANNEL_ID);

    // unpack values
    // @ts-ignore
    const { title, msg, groupId, msgId } = message.data;

    // create notification
    const notification = notif(title, msg, msgId, groupId);
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
            messages: [msg]
        };
        groupsNotifications.push(group);
    }

    // display summary notification
    const summaryNotification = summaryNotif(title, msg, group);
    firebase.notifications().displayNotification(summaryNotification);

    return Promise.resolve();
};
