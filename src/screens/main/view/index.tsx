import * as React from 'react';
import { Content, Text, Thumbnail, Body } from 'native-base';
import { TouchableHighlight, View } from 'react-native';
import Lists from '../../../components/lists';

export default class Main extends React.Component {
    render() {
        const listItems = [
            {
                url: require('../../../../static/default-pic.png'),
                name: 'James Bond',
                text: 'Doing what you like..',
                time: '13:47pm'
            },
            {
                url: require('../../../../static/default-pic.png'),
                name: 'James Cameroon',
                text: 'Doing what you like when you like',
                time: '17/06/2017'
            }
        ];

        const renderElems = listItems.map((item, index) => (
            <React.Fragment key={index}>
                <Thumbnail square size={80} source={item.url} />
                <Body>
                    <Text numberOfLines={1}>{item.name}</Text>
                    <Text numberOfLines={1} note>
                        {item.text}
                    </Text>
                </Body>
                <Text note style={{ fontSize: 13 }}>
                    {item.time}
                </Text>
            </React.Fragment>
        ));

        return (
            <Content>
                <Lists renderItems={renderElems} />
            </Content>
        );
    }
}
