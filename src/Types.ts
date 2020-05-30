export type Action = () => void;
export type ActionT<T> = (t: T) => void;
export type ActionTT<T1, T2> = (t1: T1, t2: T2) => void;

export type Constructor<T> = new (...args: any[]) => T;
