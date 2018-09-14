import moment from 'moment';
import { AsyncStorage } from 'react-native';
import { MessageBarManager } from 'react-native-message-bar';

export function formatDate(date: any, relative?: boolean) {
    const momentDate = moment(date);
    const now = moment();
    const diff = now.diff(momentDate, 'days');

    if (diff <= 0) {
        // if it's today show the hour and minute
        return momentDate.format('h:mm A');
    } else if (diff === 1) {
        // if it's yesterday show yesterday
        return 'yesterday';
    } else {
        // if it isn't both return the date in d/m/yy
        return momentDate.format('D[/]M[/]YY');
    }
}

export async function clientId() {
    const token = await AsyncStorage.getItem('client_id');
    return token;
}

export function showAlert(msg: string, type?: string) {
    MessageBarManager.showAlert({
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
