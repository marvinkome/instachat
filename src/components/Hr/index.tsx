import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'black'
    },
    text: {
        flex: 1,
        textAlign: 'center',
        marginLeft: 15,
        marginRight: 15,
        color: '#86939e',
        fontSize: 13,
        fontWeight: 'normal',
        fontFamily: 'PT_Sans'
    }
});

interface Props {
    lineStyle?: object;
    text?: string;
    marginLeft?: number;
    marginRight?: number;
    textStyle?: object;
}

export default class Hr extends React.Component<Props> {
    renderLine = (key?: number) => {
        return <View key={key} style={[styles.line, this.props.lineStyle]} />;
    };

    renderText = (key?: number) => {
        return (
            <View key={key}>
                <Text style={[styles.text, this.props.textStyle]}>
                    {this.props.text}
                </Text>
            </View>
        );
    };

    renderInner = () => {
        if (!this.props.text) {
            return this.renderLine();
        }
        return [this.renderLine(1), this.renderText(2), this.renderLine(3)];
    };

    render() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: this.props.marginLeft,
                    marginRight: this.props.marginRight
                }}
            >
                {this.renderInner()}
            </View>
        );
    }
}
