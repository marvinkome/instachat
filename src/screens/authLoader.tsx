import * as React from 'react';
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
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center'
                }}
            >
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    private setupApp = async () => {
        const token = await AsyncStorage.getItem('client_id');

        this.props.navigation.navigate(token ? 'Main' : 'Login');
    };
}
