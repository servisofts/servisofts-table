import React, { Component } from 'react';
import { View, PanResponder, Platform } from 'react-native';


type PropsType = {
    direcction?: "top" | "bottom" | "left" | "right",
    size?: any,
    width: any,
    onContentSizeChange?: any
}
const preventDefault = e => e.preventDefault();
export default class SResizableView extends Component<PropsType> {
    state;
    panResponder;
    startWidth
    constructor(props) {
        super(props);

        this.state = {
            width: this.props.width ?? 100,
        };
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            // onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt, gestureState) => {
                this.startWidth = this.state.width
            },
            onPanResponderMove: (evt, gestureState) => {
                this.state.width = this.startWidth + gestureState.dx;
                this.setState({ width: this.startWidth + gestureState.dx, });
                evt.stopPropagation();
                evt.preventDefault();
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (this.props.onContentSizeChange) {
                    this.props.onContentSizeChange(this.state.width)
                }
            },
        });

    }


    render() {
        return (<View
            style={{
                height: "100%",
                width: this.state.width,
                flexDirection: "row"
            }}>
            <View style={{
                flex: 1,
            }}>
                {this.props.children}
            </View>
            <View style={{
                height: "100%",
                width: 25,
                position: "absolute",
                right: 0,
                top: 0,
                backgroundColor:"#ffffff06",
                ...{ cursor: "col-resize" }
            }}
                {...this.panResponder.panHandlers}
            >
            </View>
        </View >
        );
    }
}

