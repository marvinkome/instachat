import * as React from 'react';
import { View, Text } from 'react-native';
import { ListItem, Badge, Avatar } from 'react-native-elements';
import { ViewStyles as styles } from './styles';

type IProps = {
    avatar: any;
    title: string;
    subtitle: string;
    subtitleStyle?: any;
    showBadge?: boolean;
    badgeText?: string;
    badgeValue?: number;
};

const MainListItem = (props: IProps) => {
    return (
        <ListItem
            containerStyle={styles.listItemContainer}
            avatar={<Avatar small rounded source={props.avatar} />}
            title={props.title}
            titleStyle={styles.name}
            subtitle={props.subtitle}
            subtitleStyle={[props.subtitleStyle, styles.message]}
            hideChevron
            badge={
                props.showBadge
                    ? {
                          element: (
                              <View style={styles.rightContainer}>
                                  <Text style={styles.time}>
                                      {props.badgeText}
                                  </Text>
                                  <Badge
                                      value={props.badgeValue}
                                      containerStyle={styles.badgeContainer}
                                      textStyle={styles.badgeText}
                                  />
                              </View>
                          )
                      }
                    : undefined
            }
        />
    );
};

export default MainListItem;
