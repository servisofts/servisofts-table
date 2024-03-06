import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { VariableSizeGrid as Grid } from 'react-window';
import { TableProps } from '../../types';
import styles from '../../style';
import { SVariableSizeGridType } from './type';
import { StyleToCSS } from '../StyleUtils';



export default class SVariableSizeGrid extends Component<SVariableSizeGridType> {
    style;
    state = {
        layout: {
            height: 0,
            width: 0
        },
        scroll: {
            x: 0,
            y: 0
        }
    }
    /**
          border-bottom: 1px solid #666;
            border-right: 1px solid #666;
            overflow: hidden;
            font-size:12px;
            color: #fff;
            box-sizing: border-box;
     */

    componentDidMount(): void {
        console.log(this.props.cellStyle)
        this.style = document.createElement('style');
        this.style.innerHTML = `
        .listItemGrid {
                flex-direction: column;
                box-sizing: border-box;
                display:flex;
                text-wrap:nowrap;
                ${StyleToCSS(this.props.cellStyle)}
        }
        ::-webkit-scrollbar {
            width: ${this.props.scrollWidth ?? 10}px;
            height: ${this.props.scrollWidth ?? 10}px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background-color: #AAAAAA66;
        }
          
        `;
        document.head.appendChild(this.style);

    }
    componentWillUnmount(): void {
        document.head.removeChild(this.style)
    }
    onScrollHandle = (e) => {
        this.state.scroll = { x: e.scrollLeft, y: e.scrollTop }
        if (this.props.handleScroll) this.props.handleScroll(this.state.scroll)
    }

    handleClick(e, p) {
        console.log(e, p);
    }
    render() {
        const Cell = ({ columnIndex, rowIndex, style }) => (
            <div className='listItemGrid' style={style}
            // onMouseMoveCapture={this.handleClick.bind(this, { columnIndex, rowIndex })}
            >
                {(this.props.data[rowIndex] ?? [])[columnIndex]}
            </div>
        );
        const { cols, rows } = this.props;
        return <View style={{ width: "100%", flex: 1 }}
            onLayout={evt => this.setState({ layout: evt.nativeEvent.layout })}
        >
            <Grid
                key={this.props.keyInstance}
                columnCount={cols.length}
                columnWidth={index => cols[index].wpx}
                rowHeight={index => rows[index].hpx}
                height={this.state.layout.height}
                width={this.state.layout.width}
                estimatedColumnWidth={cols[0].wpx}
                estimatedRowHeight={rows[0].hpx}
                initialScrollLeft={this.state.scroll.x}
                initialScrollTop={this.state.scroll.y}
                rowCount={rows.length}
                onScroll={this.onScrollHandle}
            >
                {Cell}
            </Grid>
        </View>
    }
}