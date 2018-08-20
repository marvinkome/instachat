import * as React from 'react';
// import Contacts from 'react-native-contacts';
import { View } from 'react-native';
import { List } from 'react-native-elements';
import Listing from './listing';
import { ViewStyles as styles } from './styles';

export default class ScreenView extends React.Component {
    // componentDidMount() {
    //     Contacts.getAll((err, contacts) => {
    //         if (err) {
    //             console.warn(err);
    //         }

    //         console.warn(contacts);
    //     });
    // }
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
