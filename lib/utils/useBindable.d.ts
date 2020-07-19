import Bindable from "../Bindable";
/**
 * A custom React hook which allows a functional component to refresh when the value of the bindable has changed.
 */
export default function useBindable<T>(bindable: Bindable<T>, onChange?: (v: T) => any): T;
