import React from 'react';
import {
  Animated,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SUuid } from './SUuid';




type DraggableListProps = {
  data: any[];
  renderItem: (p: { item: any, index: number }) => React.ReactNode,
  itemHeight?: number,
  onChange?: (items: any[]) => void,
}

export default class DraggableList extends React.Component<DraggableListProps> {
  state = {
    key: SUuid(),
    items: this.props.data,
    draggingIndex: -1,
    dragY: new Animated.Value(0),
    itemHeight: this.props.itemHeight || 50,
  };

  handleReorder = (fromIndex, finalY) => {
    // this.setState({ loading: true });
    const toIndex = Math.min(
      this.state.items.length - 1,
      Math.max(0, Math.floor(finalY / this.state.itemHeight))
    );
    // if (fromIndex === toIndex) return;

    const items = [...this.state.items];
    const [moved] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, moved);
    this.setState({ items: items, key: SUuid() });
    if (this.props.onChange) {
      this.props.onChange(items);
    }
    console.log("Reordered items:", items);
    // new SThread(10, "algo", false,).start(() => {
    //   this.setState({ items: items, loading: false });
    // });
    // console.log("Reordered items:", items);
  };

  render() {
    const { items, draggingIndex, dragY } = this.state;

    return (
      <Animated.ScrollView style={{ flex: 1, width: "100%" }}>
        <View  key={this.state.key}  style={{ flex: 1, width: "100%", position: 'relative' }}>
          {items.map((item, index) => {
            const offset = new Animated.Value(0);

            if (index !== draggingIndex && draggingIndex !== -1) {
              dragY.addListener(({ value }) => {


                const draggedIndex = draggingIndex;
                const draggedMidY = value + (this.state.itemHeight * draggedIndex) + (this.state.itemHeight / 2);
                const itemTop = index * this.state.itemHeight;
                const itemBottom = itemTop + this.state.itemHeight;

                let shouldMove = 0;
                if (draggedIndex < index && draggedMidY > itemTop) {
                  shouldMove = -this.state.itemHeight;
                } else if (draggedIndex > index && draggedMidY < itemBottom) {
                  shouldMove = this.state.itemHeight;
                }

                Animated.timing(offset, {
                  toValue: shouldMove,
                  duration: 50,
                  useNativeDriver: true,
                }).start();
              });
            }

            return (
              <Item
                key={this.state.key + item.id}
                index={index}
                data={item}
                isDragging={index === draggingIndex}
                onReorder={(finalY) => {
                  this.handleReorder(draggingIndex, finalY + (this.state.itemHeight * index) + (this.state.itemHeight / 2));
                  this.setState({ draggingIndex: -1 });
                }}
                onDrag={(y) => this.setState({ dragY: y })}
                onDragStart={() => this.setState({ draggingIndex: index })}
                offset={offset}
                renderItem={this.props.renderItem.bind(this)}
                itemHeight={this.state.itemHeight}
              />
            );
          })}
        </View>
      </Animated.ScrollView>

    );
  }
}

class Item extends React.Component<{
  data: any,
  index: number,
  isDragging: boolean,
  onReorder: (y: number) => void,
  onDrag: (y: Animated.Value) => void,
  onDragStart: () => void,
  offset: Animated.Value,
  renderItem: (p: { item: any, index: number }) => React.ReactNode,
  itemHeight: number,
}> {
  pan: any = new Animated.ValueXY();
  panResponder: any;

  constructor(props: any) {
    super(props);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.props.onDragStart();
        this.pan.setOffset({ x: 0, y: this.pan.y._value });
        this.pan.setValue({ x: 0, y: 0 });
        this.props.onDrag(this.pan.y);
      },
      onPanResponderMove: Animated.event(
        [null, { dy: this.pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        this.pan.flattenOffset();
        const finalY = this.pan.y._value;
        this.pan.setValue({ x: 0, y: 0 });
        this.props.onReorder(finalY);
      },
    });
  }

  render() {
    const { index, data, isDragging, offset } = this.props;
    const positionStyle = isDragging
      ? this.pan.getTranslateTransform()
      : [{ translateY: offset }];

    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[
          {
            width: '100%',
            position: 'absolute',
            // borderWidth: 1,
            height: this.props.itemHeight,
            // margin: 8,
            // backgroundColor: "#666666",
            // borderRadius: 10,
            // justifyContent: 'center',
            // alignItems: 'center',
          },
          {
            top: index * this.props.itemHeight,
            transform: positionStyle,
            zIndex: isDragging ? 10 : 1,
          },
        ]}
      >
        {this.props.renderItem({ item: data, index })}
      </Animated.View>
    );
  }
}
