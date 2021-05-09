import { ActionT } from './Types';

class ListenerInfo<T> {

    id: number;
    callback: ActionT<T>;

    constructor() {
        this.id = 0;
        this.callback = () => { };
    }
}

/**
 * A data container which a consumer object can listen to state changes.
 */
export default class Bindable<T> {

    private _idIncrement: number;
    private _value: T;
    private _listeners: (ListenerInfo<T> | null)[];
    private _triggerWhenDifferent: boolean = true;

    /**
     * Returns whether the bindable will trigger on assigning value only when the equality operator returns false.
     */
    get triggerWhenDifferent(): boolean { return this._triggerWhenDifferent; }

    /**
     * Sets whether bindable will trigger on setting the value only when the equality operator returns false.
     */
    set triggerWhenDifferent(value: boolean) { this._triggerWhenDifferent = value; }

    /**
     * Returns the value in the Bindable.
     * Equivalent to getValue().
     */
    get value(): T { return this._value; }

    /**
     * Sets the value in the Bindable.
     * Equivalent to setValue() with trigger = true.
     */
    set value(val: T) { this.setValue(val); }

    constructor(value: T, triggerWhenDifferent: boolean = true) {
        this._idIncrement = 0;
        this._value = value;
        this._listeners = [];
        this._triggerWhenDifferent = triggerWhenDifferent;
    }

    /**
     * Returns the value of the bindable.
     */
    getValue() { return this._value; }

    /**
     * Sets the value of the bindable and triggers a change event to listeners.
     * @param {T} value The value to set to the Bindable.
     * @param {boolean} trigger Whether this call should trigger change event.
     */
    setValue(value: T, trigger: boolean = true) {
        const prevValue = this._value;
        this._value = value;

        if (trigger === true) {
            if(this._triggerWhenDifferent && prevValue === value) {
                return;
            }
            this.trigger();
        }
    }

    /**
     * Registers the specified callback function to listen to value change events.
     * @param {ActionT<T>} callback The function to be invoked on value change.
     */
    subscribe(callback: ActionT<T>): number {
        const info = new ListenerInfo<T>();
        info.id = this._idIncrement++;
        info.callback = callback;
        this._listeners.push(info);
        return info.id;
    }

    /**
     * Subscribes the specified callback function and immediately calls it with the Bindable's value.
     * @param {ActionT<T>} callback The function to be invoked on value change and immediately after this method call.
     */
    subscribeAndTrigger(callback: ActionT<T>): number {
        const id = this.subscribe(callback);
        callback(this._value);
        return id;
    }

    /**
     * Removes the listener of specified id.
     * @param {number} callbackId The subscriber ID returned from calling subscribe method.
     */
    unsubscribe(callbackId: number) {
        for (let i = 0; i < this._listeners.length; i++) {
            const listener = this._listeners[i];
            if (listener !== null && listener.id === callbackId) {
                this._listeners[i] = null;
                return;
            }
        }
    }

    /**
     * Manually triggers all listeners' callback functions.
     */
    trigger() {
        for (let i = this._listeners.length - 1; i >= 0; i--) {
            const listener = this._listeners[i];
            if (listener !== null && listener !== undefined &&
                listener.callback !== null && listener.callback !== undefined) {
                listener.callback(this._value);
            }
            else {
                this._listeners.splice(i, 1);
            }
        }
    }
}