import { Language } from '../SLanguage';
type dateParams = "minutes" | "hour" | "day" | "dayOfWeek" | "month" | "year";
type formatsTypes = "yyyy-MM-dd" | "yyyy-MM-dd hh:mm" | "yyyy-MM-dd hh:mm:ss" | "yyyy-MONTH-dd hh:mm:ss" | "yyyy-MON-dd hh:mm:ss" | "yyyy-MON-dd hh:mm:ssTZD" | "yyyy-MM-ddThh:mm:ss" | "yyyy-MM-ddThh:mm:ssTZD" | "dd/MM/yyyy" | "dd/MM" | "yyyy/MM" | "yyyy-MM-dd" | "yyyy-MM" | "MM-dd" | "dd-MM" | "dd/MM/yyyy hh:mm" | "dd/MM/yyyy hh:mm:ss" | "dd/MM/yyyy hh:mm:ssTZD" | "hh:mm:ss" | "hh:mm" | "hh" | "mm" | "ss";
export default class SDate {
    static getMonthsOfYear: (language?: Language) => {
        "1": {
            text: string;
            textSmall: string;
        };
        "2": {
            text: string;
            textSmall: string;
        };
        "3": {
            text: string;
            textSmall: string;
        };
        "4": {
            text: string;
            textSmall: string;
        };
        "5": {
            text: string;
            textSmall: string;
        };
        "6": {
            text: string;
            textSmall: string;
        };
        "7": {
            text: string;
            textSmall: string;
        };
        "8": {
            text: string;
            textSmall: string;
        };
        "9": {
            text: string;
            textSmall: string;
        };
        "10": {
            text: string;
            textSmall: string;
        };
        "11": {
            text: string;
            textSmall: string;
        };
        "12": {
            text: string;
            textSmall: string;
        };
    };
    static getMonth: (month: any, language?: Language) => any;
    static getDaysOfWeek: (language?: Language) => {
        "0": {
            text: string;
            textSmall: string;
        };
        "1": {
            text: string;
            textSmall: string;
        };
        "2": {
            text: string;
            textSmall: string;
        };
        "3": {
            text: string;
            textSmall: string;
        };
        "4": {
            text: string;
            textSmall: string;
        };
        "5": {
            text: string;
            textSmall: string;
        };
        "6": {
            text: string;
            textSmall: string;
        };
    };
    static getDayOfWeek: (dia: any, language?: Language) => any;
    static getDaysInMonth: (year: any, month: any) => number;
    static isValid: (fecha: any) => boolean;
    static formatCero(val: any): any;
    static toString(dateStr: any, props: {
        fromFormat?: formatsTypes;
        toFormat?: formatsTypes;
    }): String | "";
    static parse(fecha: String, format: formatsTypes | string): Date;
    language: Language;
    date: Date;
    constructor(date?: any, format?: formatsTypes);
    setLanguage(e: Language): void;
    getLanguage(): Language;
    isValid(): boolean;
    clone(): SDate;
    getTimezone(): string;
    getTimezoneOffset(): number;
    setHours(hours: number, min?: number, sec?: number, ms?: number): this;
    getTime(): number;
    getDay(): number;
    setDay(val: any): this;
    addDay(val: any): this;
    addMonth(val: any): this;
    addYear(val: any): this;
    addHour(val: any): this;
    addMinute(val: any): this;
    addSecond(val: any): this;
    addMillisecond(val: any): this;
    getMonth(): number;
    getYear(): number;
    setYear(val: any): this;
    getMonthJson(): any;
    getDayOfWeek(): number;
    getDayOfWeekJson(): any;
    getFirstDayOfWeek(): SDate;
    getWeek(): number;
    equalDay(sdate: any): boolean;
    isAfter(sdate: any): boolean;
    isBefore(sdate: any): boolean;
    diffTime(sdate: any): number;
    diff(sdate: any): number;
    __selectLanguage({ en, es }: {
        en: any;
        es: any;
    }): any;
    timeSince(sdate: any): string;
    isCurDate(): boolean;
    formatCero(val: any): any;
    formatTime12(hours: any, minutes: any): string;
    toString(format?: formatsTypes | String): String;
    get(param: dateParams): number;
    toJson(): {
        minutes: number;
        hour: number;
        day: number;
        seconds: number;
        dayOfWeek: number;
        month: number;
        year: number;
    };
}
export {};
