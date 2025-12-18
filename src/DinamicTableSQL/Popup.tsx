import React from "react";
import { Dimensions, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import DinamicTable from "./DinamicTableSQL";
import { ColPropsType } from "./Col";



type PopupPropsType = {
    x: number,
    y: number,

}
export default class Popup extends React.Component<{ dinamicTableInstance: DinamicTable<any> }> {
    static defaultProps = {
    }

    state: {
        popups: { [key: string]: any }
    } = {
            popups: {}
        }

    close(key: string) {
        delete this.state.popups[key];
        this.setState({
            ...this.state
        })
    }

    show(props: {
        onPressEvent: any,
        parent: any,
        render: () => any,
        width?: number,
        height?: number,
        key?: string,
        left?: number,
    }) {
        const key = props.key ?? Math.random().toString();
        const parent = props.parent;
        const target = props.onPressEvent.currentTarget;

        parent.measure((px: number, py: number, pwidth: number, pheight: number, ppageX: number, ppageY: number) => {
            target.measureLayout(props.parent, (x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
                const itemHeight = props.height || height;
                const itemWidth = props.width || width;
                let top = y + height;
                if ((top + itemHeight) > pheight) {
                    top = y - itemHeight;
                }
                let left = x + (props.left || 0);
                if ((left + itemWidth) > pwidth) {
                    left = pwidth - itemWidth;
                }
                if (left < 0) {
                    left = 0;
                }

                const elm = <TouchableOpacity style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%" }} onPress={() => {
                    this.close(key)
                }}>
                    <TouchableWithoutFeedback >
                        <View style={{ position: "absolute", top: top, left: left, width: itemWidth, height: itemHeight, }}>
                            {props.render()}
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
                this.setState({
                    popups: {
                        ...this.state.popups,
                        [key]: elm
                    }
                })
            })
        })

        return key;
        // console.log("show", x, y, col)


    }

    render() {
        // const dinamicTableInstance = this.props.dinamicTableInstance;
        return Object.values(this.state.popups)
        return <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
            {Object.values(this.state.popups)}
        </View>
    }
}