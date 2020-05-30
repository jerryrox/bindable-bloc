import BaseBloc from "./BaseBloc";
import BlocEvent from "./BlocEvent";
import { Constructor } from "../Types";
/**
 * A value which must be passed to React Context API so the components can access the BLoC instances.
 */
export default class BlocContextValue {
    private _entries;
    constructor(entries?: Object);
    /**
     * Returns the Bloc instance of specified type.
     * @param {Constructor<T>} constructor The type of the BLoC instance you want to retrieve.
     */
    getBloc<T extends BaseBloc>(constructor: Constructor<T>): T | null;
    /**
     * Dispatches the specified event to all BLoC instances.
     */
    dispatch(event: BlocEvent): void;
    /**
     * Adds the specified entry under this context's management.
     * @param {IBlocContextEntry} entry
     */
    private addEntry;
}
