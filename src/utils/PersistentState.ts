import localForage from "localforage";
import Bindable from '../Bindable';

localForage.config({
    name: "Default store",
    storeName: "defaultStore",
    description: "Default store used by bindable-bloc if store is not specified."
});

/**
 * Makes the specified bindable object's state persistent.
 */
export async function makePersistent<TValue>(bindable: Bindable<TValue>, uniqueKey: string, customStore?: LocalForage): Promise<Bindable<TValue>> {
    const store = customStore || localForage;

    function subscribeToBindable() {
        // Save newly received data to localForage.
        bindable.subscribe((value: TValue) => {
            store.setItem(uniqueKey, value);
        });
    }

    // Set persisted state to the bindable if exists.
    // Otherwise, use the current state of the bindable as default.
    try {
        const savedValue = await store.getItem<TValue>(uniqueKey);
        if(savedValue !== undefined && savedValue !== null)
            bindable.setValue(savedValue);
        subscribeToBindable();
    }
    catch (e) {
        subscribeToBindable();
    }
    return bindable;
}