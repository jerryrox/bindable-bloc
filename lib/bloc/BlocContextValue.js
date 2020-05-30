"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A value which must be passed to React Context API so the components can access the BLoC instances.
 */
class BlocContextValue {
    constructor(entries) {
        this._entries = new Array();
        // If default entries are provided, use that.
        if (typeof (entries) === "object") {
            Object.keys(entries)
                .forEach(k => {
                const bloc = Reflect.get(entries, k);
                if (bloc !== null && bloc !== undefined)
                    this.addEntry({ name: k, bloc });
            });
        }
    }
    /**
     * Returns the Bloc instance of specified type.
     * @param {Constructor<T>} constructor The type of the BLoC instance you want to retrieve.
     */
    getBloc(constructor) {
        for (let i = 0; i < this._entries.length; i++) {
            const entry = this._entries[i];
            if (entry.bloc instanceof constructor)
                return entry.bloc;
        }
        console.log("BlocContextValue.getBloc - Could not find bloc of specified constructor.");
        return null;
    }
    /**
     * Dispatches the specified event to all BLoC instances.
     */
    dispatch(event) {
        this._entries.forEach(e => e.bloc.processEvent(event));
    }
    /**
     * Adds the specified entry under this context's management.
     * @param {IBlocContextEntry} entry
     */
    addEntry(entry) {
        if (entry === null || entry === undefined)
            return;
        this._entries.push(entry);
    }
}
exports.default = BlocContextValue;
