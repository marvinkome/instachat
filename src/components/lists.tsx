import * as React from 'react';
import { List, ListItem } from 'native-base';

type Props = {
    listProps?: {};
    listItemProps?: {};
    renderItems: JSX.Element[];
};

export default class Lists extends React.Component<Props> {
    render() {
        return (
            <List
                {...this.props.listProps}
                dataArray={this.props.renderItems}
                renderRow={(element) => (
                    <ListItem {...this.props.listItemProps}>{element}</ListItem>
                )}
            />
        );
    }
}
