export type messageParam = {
    groupId: string;
    msg: string;
    username: string;
    userId: string;
};

export interface ViewProps {
    user: { username: string; id: string };
    group: any;
    sendMsg: (obj: messageParam) => void;
    subscribe?: () => void;
}
