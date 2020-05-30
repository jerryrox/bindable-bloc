/**
 * Represents an event which a BLoC instance can receive and react upon.
 */
export default class BlocEvent {
    private _name;
    private _data;
    get name(): String;
    get data(): any;
    constructor(name: String, data: any);
}
