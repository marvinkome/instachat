import * as React from 'react';
import { Content, Text, Left, Thumbnail, Body, Right } from 'native-base';
import Lists from '../../../components/lists';

export default class Main extends React.Component {
    render() {
        const listItems = [
            {
                url: require('../../../../static/default-pic.png'),
                name: 'James Bond',
                text: 'Doing what you like will always keep you happy..',
                time: 0
            },
            {
                url: require('../../../../static/default-pic.png'),
                name: 'James Cameroon',
                text: 'Doing what you like will always keep you happy..',
                time: 2
            }
        ];

        const renderElems = listItems.map((item, index) => (
            <React.Fragment key={index}>
                <Left>
                    <Thumbnail source={item.url} />
                </Left>
                <Body>
                    <Text>{item.name}</Text>
                    <Text note>{item.text}</Text>
                </Body>
                <Right>
                    <Text note>{item.time}</Text>
                </Right>
            </React.Fragment>
        ));

        return (
            <Content padder>
                <Lists
                    renderItems={renderElems}
                    listItemProps={{ avatar: true }}
                />
            </Content>
        );
    }
}
