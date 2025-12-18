import React from "react";
import { TextProps } from "react-native";
export type Language = "es" | "en";
export type LanguageSource = {
    [key in Language]?: string;
};
export type SLanguageType = {
    defaultLanguage: Language;
    children?: any;
};
export type TextTypeLanguaje = {} & LanguageSource & TextProps;
export declare class Text extends React.Component<TextTypeLanguaje> {
    state: {
        language: Language;
    };
    onChangeLanguage(language: Language): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
type Listener = (language: Language) => void;
export default class SLanguage extends React.Component<SLanguageType> {
    static Text: typeof Text;
    static Listeners: Listener[];
    static language: Language;
    static loadStorage(): void;
    static addListener(listener: Listener): void;
    static removeListener(listener: Listener): void;
    static notifyListener(language: Language): void;
    static change: (language: Language) => Promise<void>;
    static select(l: LanguageSource): string;
}
export {};
