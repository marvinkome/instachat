import moment from 'moment';

export function formatDate(date: any) {
    return moment(date).fromNow();
}
