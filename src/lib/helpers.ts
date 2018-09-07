import moment from 'moment';
import { AsyncStorage } from 'react-native';

export function formatDate(date: any, relative?: boolean) {
    const mDate = moment(date);
    return relative ? mDate.fromNow() : mDate.format('h:mm A');
}

export const clientId = async () => {
    const token = await AsyncStorage.getItem('client_id');
    return token;
};
