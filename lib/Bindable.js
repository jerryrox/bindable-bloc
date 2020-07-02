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
    /**
     * Returns the value of the bindable.
     */
    Bindable.prototype.getValue = function () { return this._value; };
    /**
     * Sets the value of the bindable and triggers a change event to listeners.
     * @param {T} value The value to set to the Bindable.
     */
    Bindable.prototype.setValue = function (value) {
        this._value = value;
        this.trigger();
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
            if (listener !== null) {
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
