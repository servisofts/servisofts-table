var stylesProperties = {
    borderWidth: function (a) { return "border: ".concat(a, "px solid;"); },
    borderBottomWidth: function (a) { return "border-bottom-style:solid;border-bottom-width: ".concat(a, "px;"); },
    borderTopWidth: function (a) { return "border-top-style:solid;border-top-width: ".concat(a, "px;"); },
    borderLeftWidth: function (a) { return "border-left-style:solid;border-left-width: ".concat(a, "px;"); },
    borderRightWidth: function (a) { return "border-right-style:solid;border-right-width: ".concat(a, "px;"); },
    borderColor: function (a) { return "border-color: ".concat(a, ";"); },
    borderBottomColor: function (a) { return "border-bottom-color: ".concat(a, ";"); },
    borderEndColor: function (a) { return "border-end-color: ".concat(a, ";"); },
    borderLeftColor: function (a) { return "border-left-color: ".concat(a, ";"); },
    borderTopColor: function (a) { return "border-top-color: ".concat(a, ";"); },
    borderRightColor: function (a) { return "border-right-color: ".concat(a, ";"); },
    borderRadius: function (a) { return "border-radius: ".concat(a, "px;"); },
    backgroundColor: function (a) { return "background-color: ".concat(a, ";"); },
    opacity: function (a) { return "opacity: ".concat(a, ";"); },
    padding: function (a) { return "padding: ".concat(a, "px;"); },
    paddingLeft: function (a) { return "padding-left: ".concat(a, "px;"); },
    paddingRight: function (a) { return "padding-right: ".concat(a, "px;"); },
    paddingTop: function (a) { return "padding-top: ".concat(a, "px;"); },
    paddingBottom: function (a) { return "padding-bottom: ".concat(a, "px;"); },
    margin: function (a) { return "margin: ".concat(a, "px;"); },
    marginLeft: function (a) { return "margin-left: ".concat(a, "px;"); },
    marginRight: function (a) { return "margin-right: ".concat(a, "px;"); },
    marginTop: function (a) { return "margin-top: ".concat(a, "px;"); },
    marginBottom: function (a) { return "margin-bottom: ".concat(a, "px;"); },
    shadowColor: function (a) { return "box-shadow: 0px 0px 5px ".concat(a, ";"); },
    shadowOffset: function (_a) {
        var width = _a.width, height = _a.height;
        return "box-shadow: ".concat(width, "px ").concat(height, "px 5px;");
    },
    shadowRadius: function (a) { return "box-shadow: 0px 0px ".concat(a, "px;"); },
    shadowOpacity: function (a) { return "box-shadow-opacity: ".concat(a, ";"); },
    elevation: function (a) { return "box-shadow: 0px ".concat(a / 2, "px ").concat(a, "px gray;"); },
    flexDirection: function (a) { return "flex-direction: ".concat(a, ";"); },
    flexWrap: function (a) { return "flex-wrap: ".concat(a, ";"); },
    justifyContent: function (a) { return "justify-content: ".concat(a, ";"); },
    alignItems: function (a) { return "align-items: ".concat(a, ";"); },
    alignSelf: function (a) { return "align-self: ".concat(a, ";"); },
    position: function (a) { return "position: ".concat(a, ";"); },
    top: function (a) { return "top: ".concat(a, "px;"); },
    bottom: function (a) { return "bottom: ".concat(a, "px;"); },
    left: function (a) { return "left: ".concat(a, "px;"); },
    right: function (a) { return "right: ".concat(a, "px;"); },
    zIndex: function (a) { return "z-index: ".concat(a, ";"); },
    flex: function (a) { return "flex: ".concat(a, ";"); },
    flexGrow: function (a) { return "flex-grow: ".concat(a, ";"); },
    flexShrink: function (a) { return "flex-shrink: ".concat(a, ";"); },
    flexBasis: function (a) { return "flex-basis: ".concat(a, "px;"); },
    aspectRatio: function (a) { return "aspect-ratio: ".concat(a, ";"); },
    overflow: function (a) { return "overflow: ".concat(a, ";"); },
    color: function (a) { return "color: ".concat(a, ";"); },
    fontSize: function (a) { return "font-size: ".concat(a, "px;"); }
};
export var StyleToCSS = function (style) {
    var css = '';
    Object.keys(stylesProperties).map(function (k) {
        var o = style[k];
        if (!o)
            return;
        var sp = stylesProperties[k];
        if (!sp)
            return;
        css += sp(o);
    });
    return css;
};
