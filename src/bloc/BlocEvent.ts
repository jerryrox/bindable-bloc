/**
 * Represents an event which a BLoC instance can receive and react upon.
 */
export default class BlocEvent {

    private _name: string;
    private _data: any;


    get name(): string { return this._name; }

    get data(): any { return this._data; }


    constructor(name: string, data: any) {
        this._name = name;
        this._data = data;
    }
}
