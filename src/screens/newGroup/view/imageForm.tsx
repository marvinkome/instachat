import * as React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import { imgForm as styles } from './styles';

const img = require('../../../../static/yuna.jpg');

export const ImageForm = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Add group image (optional)</Text>
            <Avatar source={img} rounded xlarge />
        </View>
    );
};
