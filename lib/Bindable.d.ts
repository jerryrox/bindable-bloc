/**
 * A data container which a consumer object can listen to state changes.
 */
export default class Bindable<T> {
    private _idIncrement;
    private _value;
    private _listeners;
    constructor(value: T);
    /**
     * Returns the value of the bindable.
     */
    getValue(): T;
    /**
     * Sets the value of the bindable and
     */
    setValue(value: T): void;
    /**
     * Registers the specified callback function to listen to value change events.
     */
    subscribe(callback: Function): number;
    /**
     * Removes the listener of specified id.
     */
    unsubscribe(callbackId: number): void;
    /**
     * Manually triggers all listeners' callback functions.
     */
    trigger(): void;
}
/**
 * A custom React hook which allows a functional component to refresh when the value of the bindable has changed.
 */
export declare function useBindable<T>(bindable: Bindable<T>, onChange?: (v: T) => any): T;
