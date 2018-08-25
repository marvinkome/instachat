import * as React from 'react';
import Topbar from './topbar';
import { Title, Icon, Button } from 'native-base';

export const navOptions = ({ navigation }: any) => ({
    header: (props: any) => {
        return (
            <Topbar
                renderBody={<Title>{navigation.state.routeName}</Title>}
                renderLeftIcon={
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" />
                    </Button>
                }
                showLeftIcon={props.navigation.state.routes.length > 1}
            />
        );
    }
});
