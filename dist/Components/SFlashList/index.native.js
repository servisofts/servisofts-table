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
import React, { Component } from 'react';
import { FlashList } from '@shopify/flash-list';
var SFlashList = /** @class */ (function (_super) {
    __extends(SFlashList, _super);
    function SFlashList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SFlashList.prototype.scrollToOffset = function (e) {
        this.ref.scrollToOffset(e);
    };
    SFlashList.prototype.render = function () {
        var _this = this;
        return React.createElement(FlashList, { ref: function (ref) { return _this.ref = ref; }, scrollEnabled: this.props.scrollEnabled, scrollEventThrottle: 16, data: this.props.data, keyExtractor: this.props.keyExtractor, estimatedItemSize: this.props.estimatedItemSize, renderItem: this.props.renderItem });
    };
    return SFlashList;
}(Component));
export default SFlashList;
