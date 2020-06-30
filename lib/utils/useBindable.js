"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
/**
 * A custom React hook which allows a functional component to refresh when the value of the bindable has changed.
 */
function useBindable(bindable, onChange) {
    var _a = react_1.useState(bindable.getValue()), value = _a[0], setValue = _a[1];
    if (typeof (onChange) !== "function")
        onChange = function () { };
    react_1.useEffect(function () {
        var id = bindable.subscribe(function (newVal) {
            setValue(newVal);
            if (typeof (onChange) === "function")
                onChange(newVal);
        });
        return function () {
            bindable.unsubscribe(id);
        };
    }, [bindable, value, onChange]);
    return value;
}
exports.default = useBindable;
