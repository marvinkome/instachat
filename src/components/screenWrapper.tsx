import * as React from 'react';
import Topbar from './topbar';
import { Container } from 'native-base';

type Prop = {
    render: () => JSX.Element;
    screenHeader: string;
};

export default class screenWrapper extends React.Component<Prop, {}> {
    render() {
        return (
            <Container>
                <Topbar headerText={this.props.screenHeader} />
                {this.props.render()}
            </Container>
        );
    }
}
