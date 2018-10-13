export interface ListingType {
    id: string;
    name: string;
    text: string;
    timestamp: string;
    unread: number;
    image: null;
    onPress: () => void;
}

export interface ViewProps {
    data: {
        groups: Array<{
            id: string;
            name: string;
            unreadCount: number;
            lastMessage: {
                id: string;
                message: string;
                timestamp: string;
            };
        }>;
    };
}
