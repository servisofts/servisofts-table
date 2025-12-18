import * as React from 'react';
import SDate from '../SDate';
export default class DatePickerCalendar extends React.Component<{
    color?: string;
    accentColor?: string;
    language?: string;
    defaultValue?: SDate;
    onChange?: (date: SDate) => void;
}> {
    static defaultProps: {
        color: string;
        accentColor: string;
        language: string;
    };
    textStyle: any;
    state: {
        selectedDate: SDate;
    };
    componentDidMount(): void;
    render(): JSX.Element;
}
