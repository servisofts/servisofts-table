import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

export default class FloatView extends Component {
    static INSTANCE: FloatView;


    componentDidMount(): void {
        FloatView.INSTANCE = this;
    }
    render() {
        return null;
        return <View style={{
            position: "absolute",
            width: "100%",
            height: "100%",
        }}>

        </View>
    }
}
