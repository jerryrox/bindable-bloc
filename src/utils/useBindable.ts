import { useState, useEffect } from 'react';
import Bindable from "../Bindable";

/**
 * A custom React hook which allows a functional component to refresh when the value of the bindable has changed.
 */
export default function useBindable<T>(bindable: Bindable<T>, onChange?: (v: T) => any) {
    const [value, setValue] = useState(bindable.getValue());

    useEffect(() => {
        const id = bindable.subscribe((newVal: T) => {
            setValue(newVal);
            if(onChange !== undefined)
                onChange(newVal);
        });
        return () => {
            bindable.unsubscribe(id);
        };
    }, [bindable, onChange]);
    return value;
}