import moment, { Moment } from 'moment';
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';
import { AsyncStorage } from 'react-native';
import { MessageBarManager } from 'react-native-message-bar';

export function formatDate(date: any, full?: boolean) {
    const currDate = moment();
    const myDate = moment(date);
    const today = currDate.clone().startOf('day');
    const yday = currDate
        .clone()
        .subtract(1, 'days')
        .startOf('day');

    function isToday(mdate: Moment) {
        return mdate.isSame(today, 'd');
    }

    function isYesterday(mdate: Moment) {
        return mdate.isSame(yday, 'd');
    }

    if (isToday(myDate)) {
        return full ? myDate.format('[Today at] LT') : myDate.format('h:mm A');
    }

    if (isYesterday(myDate)) {
        return full ? myDate.format('[Yesterday at] LT') : 'Yesterday';
    }

    return full ? myDate.format('D MMM YYYY LT') : myDate.format('D[/]M[/]YY');
}

export async function clientId() {
    const token = await AsyncStorage.getItem('client_id');
    return token;
}

export function showAlert(msg: string, type?: string, options?: any) {
    MessageBarManager.showAlert({
        ...options,
        message: msg,
        shouldHideAfterDelay: false,
        alertType: type || 'warning',
        messageNumberOfLines: 1,
        durationToShow: 0,
        durationToHide: 0,
        messageStyle: {
            fontFamily: 'PT_Sans',
            textAlign: 'center',
            fontSize: 14
        }
    });
}

export function hideAlert() {
    MessageBarManager.hideAlert();
}

export function generateErrorId(args?: { optimistic?: boolean }) {
    return args && args.optimistic
        ? Math.floor(Math.random() * (-0 - -100) + -100)
        : Math.floor(Math.random() * (-101 - -200) + -200);
}

type respArgs = {
    message: string;
    userId: string;
    username: string;
    id: number;
};
export function createFakeResp({ id, message, userId, username }: respArgs) {
    return {
        sendMessage: {
            id: String(id),
            message,
            timestamp: Date.now(),
            from: {
                id: String(userId),
                username,
                __typename: 'User'
            },
            __typename: 'Message'
        }
    };
}

export function uploadImage(uri: string, name: string) {
    return firebase
        .storage()
        .ref(`images/${name}`)
        .putFile(uri)
        .then((file) => {
            return file.downloadURL;
        })
        .catch((e) => showAlert('Error uploading image', 'error', { shouldHideAfterDelay: true }));
}

export function showImagePicker(title: string) {
    return new Promise((resolve: (value: { path: string; name: string }) => void, reject) => {
        ImagePicker.showImagePicker(
            {
                title,
                takePhotoButtonTitle: 'Take photo',
                chooseFromLibraryButtonTitle: 'Choose photo from gallery',
                mediaType: 'photo'
            },
            (response) => {
                if (response.didCancel) {
                    reject('User cancelled image picker');
                    return;
                }

                if (response.error) {
                    reject(response.error);
                    return;
                }

                if (response.path && response.fileName) {
                    resolve({ path: response.path, name: response.fileName });
                }
            }
        );
    });
}
