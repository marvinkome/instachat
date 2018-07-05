import * as React from 'react';
import { Header, Left, Body, Right, Icon, Button } from 'native-base';

type Props = {
    renderBody: JSX.Element;
    renderLeftIcon?: JSX.Element;
    renderRightIcon?: JSX.Element;
    showLeftIcon?: boolean;
};

export default class Topbar extends React.Component<Props> {
    render() {
        return (
            <Header>
                {this.props.showLeftIcon && (
                    <Left>
                        {this.props.renderLeftIcon || (
                            <Button transparent>
                                <Icon name="menu" />
                            </Button>
                        )}
                    </Left>
                )}
                <Body>{this.props.renderBody}</Body>
                <Right>{this.props.renderRightIcon}</Right>
            </Header>
        );
    }
}
