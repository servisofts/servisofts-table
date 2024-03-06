import { TextStyle, ViewStyle } from "react-native";
type keys = keyof TextStyle
type StylesPropertiesType = {
    [index in keys]?: (params: any) => string
}
const stylesProperties: StylesPropertiesType = {
    borderWidth: a => `border: ${a}px solid;`,
    borderBottomWidth: a => `border-bottom-style:solid;border-bottom-width: ${a}px;`,
    borderTopWidth: a => `border-top-style:solid;border-top-width: ${a}px;`,
    borderLeftWidth: a => `border-left-style:solid;border-left-width: ${a}px;`,
    borderRightWidth: a => `border-right-style:solid;border-right-width: ${a}px;`,
    borderColor: a => `border-color: ${a};`,
    borderBottomColor: a => `border-bottom-color: ${a};`,
    borderEndColor: a => `border-end-color: ${a};`,
    borderLeftColor: a => `border-left-color: ${a};`,
    borderTopColor: a => `border-top-color: ${a};`,
    borderRightColor: a => `border-right-color: ${a};`,
    borderRadius: a => `border-radius: ${a}px;`,
    backgroundColor: a => `background-color: ${a};`,
    opacity: a => `opacity: ${a};`,
    padding: a => `padding: ${a}px;`,
    paddingLeft: a => `padding-left: ${a}px;`,
    paddingRight: a => `padding-right: ${a}px;`,
    paddingTop: a => `padding-top: ${a}px;`,
    paddingBottom: a => `padding-bottom: ${a}px;`,
    margin: a => `margin: ${a}px;`,
    marginLeft: a => `margin-left: ${a}px;`,
    marginRight: a => `margin-right: ${a}px;`,
    marginTop: a => `margin-top: ${a}px;`,
    marginBottom: a => `margin-bottom: ${a}px;`,
    shadowColor: a => `box-shadow: 0px 0px 5px ${a};`, // This is a basic shadow, you might need to adjust for your needs
    shadowOffset: ({ width, height }) => `box-shadow: ${width}px ${height}px 5px;`, // Assuming a default spread and blur
    shadowRadius: a => `box-shadow: 0px 0px ${a}px;`,  // Assuming default offset and color
    shadowOpacity: a => `box-shadow-opacity: ${a};`,  // Not a standard CSS property; might need to handle differently
    elevation: a => `box-shadow: 0px ${a / 2}px ${a}px gray;`,  // Simple conversion, might need tweaks
    flexDirection: a => `flex-direction: ${a};`,
    flexWrap: a => `flex-wrap: ${a};`,
    justifyContent: a => `justify-content: ${a};`,
    alignItems: a => `align-items: ${a};`,
    alignSelf: a => `align-self: ${a};`,
    position: a => `position: ${a};`,
    top: a => `top: ${a}px;`,
    bottom: a => `bottom: ${a}px;`,
    left: a => `left: ${a}px;`,
    right: a => `right: ${a}px;`,
    zIndex: a => `z-index: ${a};`,
    flex: a => `flex: ${a};`,
    flexGrow: a => `flex-grow: ${a};`,
    flexShrink: a => `flex-shrink: ${a};`,
    flexBasis: a => `flex-basis: ${a}px;`,
    aspectRatio: a => `aspect-ratio: ${a};`,  // Note: aspect-ratio is not universally supported; might need a fallback
    overflow: a => `overflow: ${a};`,
    color: a => `color: ${a};`,
    fontSize: a => `font-size: ${a}px;`,
};

export const StyleToCSS = (style: ViewStyle | TextStyle): string => {
    let css = '';
    Object.keys(stylesProperties).map(k => {
        const o = style[k];
        if (!o) return;
        const sp = stylesProperties[k];
        if (!sp) return;
        css += sp(o)
    })


    return css;
}