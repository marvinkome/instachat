import moment, { Moment } from 'moment';
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
