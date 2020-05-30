"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BlocEventHook {
    constructor(name, handler) {
        this._name = name;
        this._handler = handler;
    }
    get name() { return this._name; }
    get handler() { return this._handler; }
    invoke(e) {
        this._handler(e);
    }
}
/**
 * The base class of any BLoC class in the application.
 */
class BaseBloc {
    constructor() {
        this._eventHooks = new Array();
    }
    /**
     * Handles the specified event using handlers registered via hookEvent.
     * @param {BlocEvent} event The event data to pass to the event handlers.
     */
    processEvent(event) {
        for (let i = 0; i < this._eventHooks.length; i++) {
            let hook = this._eventHooks[i];
            if (hook.name === event.name) {
                hook.invoke(event);
            }
        }
    }
    /**
     * Hooks the specified handler to an event name.
     * @param {String} name The name of the event to listen to.
     * @param {EventHandler} handler The function which performs certain action in response to the listening event.
     */
    hookEvent(name, handler) {
        this._eventHooks.push(new BlocEventHook(name, handler));
    }
}
exports.default = BaseBloc;
