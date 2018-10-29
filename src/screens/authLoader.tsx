import * as React from 'react';
import theme from '../lib/colors';
import { ActivityIndicator, View, AsyncStorage } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

export default class AuthLoader extends React.Component<NavigationScreenProps> {
    constructor(props: any) {
        super(props);
        this.setupApp();
    }

    render() {
        return (
            <View
                style={{
                    backgroundColor: theme.primary.regular,
                    flex: 1,
                    justifyContent: 'center'
                }}
            >
                <ActivityIndicator size="large" color={theme.secondary.regular} />
            </View>
        );
    }

    private setupApp = async () => {
        const token = await AsyncStorage.getItem('client_id');

        this.props.navigation.navigate(token ? 'Main' : 'Login');
    };
}
