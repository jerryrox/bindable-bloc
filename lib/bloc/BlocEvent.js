"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents an event which a BLoC instance can receive and react upon.
 */
class BlocEvent {
    constructor(name, data) {
        this._name = name;
        this._data = data;
    }
    get name() { return this._name; }
    get data() { return this._data; }
}
exports.default = BlocEvent;
