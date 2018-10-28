import * as React from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import { ListItem, Badge, Avatar, ListItemProps } from 'react-native-elements';
import { ViewStyles as styles } from './styles';

type IProps = {
    avatarImg: any;
    title: string;
    subtitle: string;
    subtitleStyle?: any;
    showBadge?: boolean;
    badgeText?: string;
    badgeValue?: number;
};

class Component extends React.Component {
    render() {
        return (
            <TouchableNativeFeedback {...this.props}>
                <View {...this.props}>{this.props.children}</View>
            </TouchableNativeFeedback>
        );
    }
}

const MainListItem = ({
    subtitleStyle,
    avatarImg,
    showBadge,
    badgeText,
    badgeValue,
    ...props
}: IProps & ListItemProps) => {
    return (
        <ListItem
            component={Component}
            containerStyle={styles.listItemContainer}
            subtitleStyle={[subtitleStyle, styles.message]}
            titleStyle={styles.name}
            avatar={avatarImg}
            hideChevron
            badge={{
                element: (
                    <View style={styles.rightContainer}>
                        <Text style={styles.time}>{badgeText}</Text>
                        {showBadge && (
                            <Badge
                                value={badgeValue}
                                containerStyle={styles.badgeContainer}
                                textStyle={styles.badgeText}
                            />
                        )}
                    </View>
                )
            }}
            {...props}
        />
    );
};

export default MainListItem;
