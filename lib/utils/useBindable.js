"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
/**
 * A custom React hook which allows a functional component to refresh when the value of the bindable has changed.
 */
function useBindable(bindable, onChange) {
    var _a = react_1.useState(bindable.getValue()), value = _a[0], setValue = _a[1];
    react_1.useEffect(function () {
        var id = bindable.subscribe(function (newVal) {
            setValue(newVal);
            if (onChange !== undefined)
                onChange(newVal);
        });
        // Set value once again in case the bindable itself has changed.
        setValue(bindable.value);
        return function () {
            bindable.unsubscribe(id);
        };
    }, [bindable, onChange]);
    return value;
}
exports.default = useBindable;
