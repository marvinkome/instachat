import moment from 'moment';

export function formatDate(date: any, relative?: boolean) {
    const mDate = moment(date);
    return relative ? mDate.fromNow() : mDate.format('h:mm A');
}
