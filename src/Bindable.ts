import { useState, useEffect } from "react";
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
    private _listeners: ListenerInfo<T>[];

    constructor(value: T) {
        this._idIncrement = 0;
        this._value = value;
        this._listeners = [];
    }

    /**
     * Returns the value of the bindable.
     */
    getValue() { return this._value; }

    /**
     * Sets the value of the bindable and triggers a change event to listeners.
     * @param {T} value The value to set to the Bindable.
     */
    setValue(value: T) {
        this._value = value;
        this.trigger();
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
     * Removes the listener of specified id.
     * @param {number} callbackId The subscriber ID returned from calling subscribe method.
     */
    unsubscribe(callbackId: number) {
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
        for (let i = this._listeners.length-1; i >= 0; i--) {
            this._listeners[i].callback(this._value);
        }
    }
}

/**
 * A custom React hook which allows a functional component to refresh when the value of the bindable has changed.
 */
export function useBindable<T>(bindable: Bindable<T>, onChange?: (v: T) => any) {
    const [value, setValue] = useState(bindable.getValue());

    if (typeof (onChange) !== "function")
        onChange = () => { };

    useEffect(() => {
        const id = bindable.subscribe((newVal: T) => {
            setValue(newVal);
            if(typeof(onChange) === "function")
                onChange(newVal);
        });
        return () => {
            bindable.unsubscribe(id);
        };
    }, [bindable, value, onChange]);
    return value;
}