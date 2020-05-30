"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBindable = void 0;
const react_1 = require("react");
class ListenerInfo {
    constructor() {
        this.id = 0;
        this.callback = () => { };
    }
}
/**
 * A data container which a consumer object can listen to state changes.
 */
class Bindable {
    constructor(value) {
        this._idIncrement = 0;
        this._value = value;
        this._listeners = [];
    }
    /**
     * Returns the value of the bindable.
     */
    getValue() { return this._value; }
    /**
     * Sets the value of the bindable and
     */
    setValue(value) {
        this._value = value;
        this.trigger();
    }
    /**
     * Registers the specified callback function to listen to value change events.
     */
    subscribe(callback) {
        let info = new ListenerInfo();
        info.id = this._idIncrement++;
        info.callback = callback;
        this._listeners.push(info);
        return info.id;
    }
    /**
     * Removes the listener of specified id.
     */
    unsubscribe(callbackId) {
        for (let i = 0; i < this._listeners.length; i++) {
            if (this._listeners[i].id === callbackId) {
                this._listeners.splice(i, 1);
                return;
            }
        }
    }
    /**
     * Manually triggers all listeners' callback functions.
     */
    trigger() {
        for (let i = this._listeners.length - 1; i >= 0; i--) {
            this._listeners[i].callback(this._value);
        }
    }
}
exports.default = Bindable;
/**
 * A custom React hook which allows a functional component to refresh when the value of the bindable has changed.
 */
function useBindable(bindable, onChange) {
    const [value, setValue] = react_1.useState(bindable.getValue());
    if (typeof (onChange) !== "function")
        onChange = () => { };
    react_1.useEffect(() => {
        const id = bindable.subscribe((newVal) => {
            setValue(newVal);
            if (typeof (onChange) === "function")
                onChange(newVal);
        });
        return () => {
            bindable.unsubscribe(id);
        };
    }, [bindable, value, onChange]);
    return value;
}
exports.useBindable = useBindable;
