import { Observable, fromEvent } from 'rxjs';

export function RxFromIo(socket: SocketIOClient.Socket, eventname: string) {
    return fromEvent(socket, eventname);
}
