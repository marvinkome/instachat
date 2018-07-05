import * as React from 'react';
import { Content, Text, Thumbnail, Body } from 'native-base';
import Lists from '../../../components/lists';
import { withNavigation, NavigationScreenProp } from 'react-navigation';

interface props {
    navigation?: NavigationScreenProp<{}, {}>;
}

export const MainView = (props: props) => {
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

    const onPress = (screen: string) => {
        if (props.navigation) {
            props.navigation.navigate(screen);
        }
    };

    return (
        <Content>
            <Lists
                renderItems={renderElems}
                listItemProps={{
                    onPress: () => onPress('Chat')
                }}
            />
        </Content>
    );
};

export default withNavigation(MainView);
