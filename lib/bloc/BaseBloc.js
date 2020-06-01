"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BlocEventHook = /** @class */ (function () {
    function BlocEventHook(name, handler) {
        this._name = name;
        this._handler = handler;
    }
    Object.defineProperty(BlocEventHook.prototype, "name", {
        get: function () { return this._name; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BlocEventHook.prototype, "handler", {
        get: function () { return this._handler; },
        enumerable: false,
        configurable: true
    });
    BlocEventHook.prototype.invoke = function (e) {
        this._handler(e);
    };
    return BlocEventHook;
}());
/**
 * The base class of any BLoC class in the application.
 */
var BaseBloc = /** @class */ (function () {
    function BaseBloc() {
        this._eventHooks = new Array();
    }
    /**
     * Handles the specified event using handlers registered via hookEvent.
     * @param {BlocEvent} event The event data to pass to the event handlers.
     */
    BaseBloc.prototype.processEvent = function (event) {
        for (var _i = 0, _a = this._eventHooks; _i < _a.length; _i++) {
            var hook = _a[_i];
            if (hook.name === event.name) {
                hook.invoke(event);
            }
        }
    };
    /**
     * Hooks the specified handler to an event name.
     * @param {string} name The name of the event to listen to.
     * @param {EventHandler} handler The function which performs certain action in response to the listening event.
     */
    BaseBloc.prototype.hookEvent = function (name, handler) {
        this._eventHooks.push(new BlocEventHook(name, handler));
    };
    return BaseBloc;
}());
exports.default = BaseBloc;
