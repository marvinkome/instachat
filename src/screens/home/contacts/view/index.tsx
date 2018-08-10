import * as React from 'react';
import { View } from 'react-native';
import { List } from 'react-native-elements';
import Listing from './listing';
import { ViewStyles as styles } from './styles';

export default class ScreenView extends React.Component {
    render() {
        const lists = [
            {
                name: 'Larry John',
                about: 'Just a cool guy',
                image: require('../../../../../static/pp.jpg')
            },
            {
                name: 'Jane Doe',
                about: 'Currently coding',
                image: require('../../../../../static/yuna.jpg')
            }
        ];
        return (
            <View style={styles.container}>
                <List containerStyle={styles.listContainer}>
                    {lists.map((item, index) => (
                        <Listing key={index} listItem={item} />
                    ))}
                </List>
            </View>
        );
    }
}
