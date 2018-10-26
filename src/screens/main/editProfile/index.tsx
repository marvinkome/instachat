import * as React from 'react';
import { ToastAndroid } from 'react-native';
import { graphql, DataValue, compose, MutationFunc } from 'react-apollo';

import { showAlert } from '../../../lib/helpers';
import { USER_INFO, UPDATE_INFO } from './gql';
import { stackStyles } from './style';
import View from './view';

interface Props {
    updateInfo: MutationFunc<{}>;
    profile: DataValue<
        {
            user: {
                id: string;
                username: string;
                about: string;
                email: string;
            };
        },
        {}
    >;
}

class EditProfile extends React.Component<Props> {
    static navigationOptions = {
        title: 'Edit Profile',
        headerStyle: stackStyles.header,
        headerTitleStyle: stackStyles.title,
        headerTintColor: '#fff'
    };

    updateUser = async (variables: any) => {
        try {
            await this.props.updateInfo({
                variables
            });

            ToastAndroid.show('Profile Updated', ToastAndroid.SHORT);
        } catch (e) {
            return;
        }
    };
    render() {
        const profile = this.props.profile;
        if (profile.error && !profile.user) {
            showAlert('Something is wrong', 'error');
            return null;
        }

        if (profile.user) {
            return <View user={profile.user} updateUser={this.updateUser} />;
        }

        return null;
    }
}

const queryEnhancer = graphql(USER_INFO, {
    name: 'profile'
});

const mutationEnhancer = graphql(UPDATE_INFO, {
    name: 'updateInfo'
});

// @ts-ignore
export default compose(
    queryEnhancer,
    mutationEnhancer
)(EditProfile);
