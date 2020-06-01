import BaseBloc from "./BaseBloc";
import BlocEvent from "./BlocEvent";
import { Constructor } from "../Types";

interface IBlocContextEntry {
    name: string;
    bloc: BaseBloc;
}

/**
 * A value which must be passed to React Context API so the components can access the BLoC instances.
 */
export default class BlocContextValue {

    private _entries: IBlocContextEntry[];


    constructor(entries?: object) {
        this._entries = new Array<IBlocContextEntry>();

        // If default entries are provided, use that.
        if (typeof (entries) === "object") {
            Object.keys(entries)
                .forEach(k => {
                    const bloc = Reflect.get(entries, k) as BaseBloc;
                    if (bloc !== null && bloc !== undefined)
                        this.addEntry({name: k, bloc});
                });
        }
    }

    /**
     * Returns the Bloc instance of specified type.
     * @param {Constructor<T>} constructor The type of the BLoC instance you want to retrieve.
     */
    getBloc<T extends BaseBloc>(constructor: Constructor<T>): T {
        for(const entry of this._entries) {
            if(entry.bloc instanceof constructor)
                return entry.bloc as T;
        }
        throw new Error(`No BLoC instance found for specified type: ${constructor.name}`);
    }

    /**
     * Dispatches the specified event to all BLoC instances.
     */
    dispatch(event: BlocEvent) {
        this._entries.forEach(e => e.bloc.processEvent(event));
    }

    /**
     * Adds the specified entry under this context's management.
     */
    private addEntry(entry: IBlocContextEntry) {
        this._entries.push(entry);
    }
}