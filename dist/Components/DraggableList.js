var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React from 'react';
import { Animated, PanResponder, View, } from 'react-native';
import { SUuid } from './SUuid';
var DraggableList = /** @class */ (function (_super) {
    __extends(DraggableList, _super);
    function DraggableList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            key: SUuid(),
            items: _this.props.data,
            draggingIndex: -1,
            dragY: new Animated.Value(0),
            itemHeight: _this.props.itemHeight || 50
        };
        _this.handleReorder = function (fromIndex, finalY) {
            // this.setState({ loading: true });
            var toIndex = Math.min(_this.state.items.length - 1, Math.max(0, Math.floor(finalY / _this.state.itemHeight)));
            // if (fromIndex === toIndex) return;
            var items = __spreadArray([], _this.state.items, true);
            var moved = items.splice(fromIndex, 1)[0];
            items.splice(toIndex, 0, moved);
            _this.setState({ items: items, key: SUuid() });
            if (_this.props.onChange) {
                _this.props.onChange(items);
            }
            console.log("Reordered items:", items);
            // new SThread(10, "algo", false,).start(() => {
            //   this.setState({ items: items, loading: false });
            // });
            // console.log("Reordered items:", items);
        };
        return _this;
    }
    DraggableList.prototype.render = function () {
        var _this = this;
        var _a = this.state, items = _a.items, draggingIndex = _a.draggingIndex, dragY = _a.dragY;
        return (React.createElement(Animated.ScrollView, { style: { flex: 1, width: "100%" } },
            React.createElement(View, { key: this.state.key, style: { flex: 1, width: "100%", position: 'relative' } }, items.map(function (item, index) {
                var offset = new Animated.Value(0);
                if (index !== draggingIndex && draggingIndex !== -1) {
                    dragY.addListener(function (_a) {
                        var value = _a.value;
                        var draggedIndex = draggingIndex;
                        var draggedMidY = value + (_this.state.itemHeight * draggedIndex) + (_this.state.itemHeight / 2);
                        var itemTop = index * _this.state.itemHeight;
                        var itemBottom = itemTop + _this.state.itemHeight;
                        var shouldMove = 0;
                        if (draggedIndex < index && draggedMidY > itemTop) {
                            shouldMove = -_this.state.itemHeight;
                        }
                        else if (draggedIndex > index && draggedMidY < itemBottom) {
                            shouldMove = _this.state.itemHeight;
                        }
                        Animated.timing(offset, {
                            toValue: shouldMove,
                            duration: 50,
                            useNativeDriver: true
                        }).start();
                    });
                }
                return (React.createElement(Item, { key: _this.state.key + item.id, index: index, data: item, isDragging: index === draggingIndex, onReorder: function (finalY) {
                        _this.handleReorder(draggingIndex, finalY + (_this.state.itemHeight * index) + (_this.state.itemHeight / 2));
                        _this.setState({ draggingIndex: -1 });
                    }, onDrag: function (y) { return _this.setState({ dragY: y }); }, onDragStart: function () { return _this.setState({ draggingIndex: index }); }, offset: offset, renderItem: _this.props.renderItem.bind(_this), itemHeight: _this.state.itemHeight }));
            }))));
    };
    return DraggableList;
}(React.Component));
export default DraggableList;
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item(props) {
        var _this = _super.call(this, props) || this;
        _this.pan = new Animated.ValueXY();
        _this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: function () { return true; },
            onPanResponderGrant: function () {
                _this.props.onDragStart();
                _this.pan.setOffset({ x: 0, y: _this.pan.y._value });
                _this.pan.setValue({ x: 0, y: 0 });
                _this.props.onDrag(_this.pan.y);
            },
            onPanResponderMove: Animated.event([null, { dy: _this.pan.y }], { useNativeDriver: false }),
            onPanResponderRelease: function () {
                _this.pan.flattenOffset();
                var finalY = _this.pan.y._value;
                _this.pan.setValue({ x: 0, y: 0 });
                _this.props.onReorder(finalY);
            }
        });
        return _this;
    }
    Item.prototype.render = function () {
        var _a = this.props, index = _a.index, data = _a.data, isDragging = _a.isDragging, offset = _a.offset;
        var positionStyle = isDragging
            ? this.pan.getTranslateTransform()
            : [{ translateY: offset }];
        return (React.createElement(Animated.View, __assign({}, this.panResponder.panHandlers, { style: [
                {
                    width: '100%',
                    position: 'absolute',
                    // borderWidth: 1,
                    height: this.props.itemHeight
                },
                {
                    top: index * this.props.itemHeight,
                    transform: positionStyle,
                    zIndex: isDragging ? 10 : 1
                },
            ] }), this.props.renderItem({ item: data, index: index })));
    };
    return Item;
}(React.Component));
