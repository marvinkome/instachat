import * as React from 'react';
import { Textarea, Footer, FooterTab, Button, Icon } from 'native-base';
import { chatFormStyles as styles } from './styles';

export const ChatForm = () => {
    return (
        <Footer style={styles.footer}>
            <FooterTab style={styles.footerTab}>
                <Textarea
                    rowSpan={2}
                    placeholder="Type a message"
                    style={styles.textArea}
                />
                <Button style={styles.button} transparent>
                    <Icon name="send" />
                </Button>
            </FooterTab>
        </Footer>
    );
};
