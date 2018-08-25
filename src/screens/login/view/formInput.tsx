import * as React from 'react';
import { View } from 'react-native';
import { FormInput, Icon } from 'react-native-elements';
import { formStyles as styles } from './styles';

type IProps = {
    placeholder: string;
    icon: string;
    secure?: boolean;
    onChange: (field: string, text: string) => void;
};

export const Form = ({ placeholder, icon, secure, onChange }: IProps) => {
    return (
        <View style={styles.formCont}>
            <Icon
                name={icon}
                type="evilicon"
                containerStyle={styles.iconCont}
                iconStyle={styles.icon}
            />
            <FormInput
                placeholder={placeholder}
                underlineColorAndroid="transparent"
                secureTextEntry={secure}
                onChangeText={(text) => onChange(placeholder, text)}
            />
        </View>
    );
};

export default Form;
