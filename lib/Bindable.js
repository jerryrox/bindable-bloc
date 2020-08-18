"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListenerInfo = /** @class */ (function () {
    function ListenerInfo() {
        this.id = 0;
        this.callback = function () { };
    }
    return ListenerInfo;
}());
/**
 * A data container which a consumer object can listen to state changes.
 */
var Bindable = /** @class */ (function () {
    function Bindable(value) {
        this._idIncrement = 0;
        this._value = value;
        this._listeners = [];
    }
    Object.defineProperty(Bindable.prototype, "value", {
        /**
         * Returns the value in the Bindable.
         * Equivalent to getValue().
         */
        get: function () { return this._value; },
        /**
         * Sets the value in the Bindable.
         * Equivalent to setValue() with trigger = true.
         */
        set: function (val) { this.setValue(val); },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the value of the bindable.
     */
    Bindable.prototype.getValue = function () { return this._value; };
    /**
     * Sets the value of the bindable and triggers a change event to listeners.
     * @param {T} value The value to set to the Bindable.
     * @param {boolean} trigger Whether this call should trigger change event.
     */
    Bindable.prototype.setValue = function (value, trigger) {
        if (trigger === void 0) { trigger = true; }
        this._value = value;
        if (trigger === true) {
            this.trigger();
        }
    };
    /**
     * Registers the specified callback function to listen to value change events.
     * @param {ActionT<T>} callback The function to be invoked on value change.
     */
    Bindable.prototype.subscribe = function (callback) {
        var info = new ListenerInfo();
        info.id = this._idIncrement++;
        info.callback = callback;
        this._listeners.push(info);
        return info.id;
    };
    /**
     * Subscribes the specified callback function and immediately calls it with the Bindable's value.
     * @param {ActionT<T>} callback The function to be invoked on value change and immediately after this method call.
     */
    Bindable.prototype.subscribeAndTrigger = function (callback) {
        var id = this.subscribe(callback);
        callback(this._value);
        return id;
    };
    /**
     * Removes the listener of specified id.
     * @param {number} callbackId The subscriber ID returned from calling subscribe method.
     */
    Bindable.prototype.unsubscribe = function (callbackId) {
        for (var i = 0; i < this._listeners.length; i++) {
            var listener = this._listeners[i];
            if (listener !== null && listener.id === callbackId) {
                this._listeners[i] = null;
                return;
            }
        }
    };
    /**
     * Manually triggers all listeners' callback functions.
     */
    Bindable.prototype.trigger = function () {
        for (var i = this._listeners.length - 1; i >= 0; i--) {
            var listener = this._listeners[i];
            if (listener !== null && listener !== undefined &&
                listener.callback !== null && listener.callback !== undefined) {
                listener.callback(this._value);
            }
            else {
                this._listeners.splice(i, 1);
            }
        }
    };
    return Bindable;
}());
exports.default = Bindable;
