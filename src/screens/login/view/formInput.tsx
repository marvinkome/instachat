import * as React from 'react';
import { View } from 'react-native';
import { FormInput, Icon } from 'react-native-elements';
import { formStyles as styles } from './styles';

type IProps = { placholder: string; icon: string; secure?: boolean };

export const Form = ({ placholder, icon, secure }: IProps) => {
    return (
        <View style={styles.formCont}>
            <Icon
                name={icon}
                type="evilicon"
                containerStyle={styles.iconCont}
                iconStyle={styles.icon}
            />
            <FormInput
                placeholder={placholder}
                underlineColorAndroid="transparent"
                secureTextEntry={secure}
            />
        </View>
    );
};

export default Form;
