export interface ListingType {
    id: string;
    name: string;
    text: string;
    timestamp: string;
    unread: number;
    image: any;
    onPress: () => void;
    typing?: boolean;
}

export interface ViewProps {
    typingData?: {
        userGroupTyping: {
            user: {
                username: string;
            };
            group: {
                id: string;
            };
            isTyping: boolean;
        };
    };
    data: {
        groups: Array<{
            id: string;
            name: string;
            unreadCount: number;
            image: string;
            lastMessage: {
                id: string;
                message: string;
                timestamp: string;
            };
        }>;
    };
}
