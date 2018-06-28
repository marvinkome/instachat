import * as React from 'react';
import { Header, Left, Body, Right, Title, Icon, Button } from 'native-base';

type Props = {
    headerText: string;
};

export default class Topbar extends React.Component<Props> {
    render() {
        return (
            <Header>
                <Left>
                    <Button transparent>
                        <Icon name="arrow-back" />
                    </Button>
                </Left>
                <Body>
                    <Title>{this.props.headerText}</Title>
                </Body>
                <Right />
            </Header>
        );
    }
}
