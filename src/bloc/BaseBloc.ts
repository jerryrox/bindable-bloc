import BlocEvent from "./BlocEvent";

type EventHandler = (e: BlocEvent) => void;

class BlocEventHook {

    private _name: string;
    private _handler: EventHandler;


    get name(): string { return this._name; }
    get handler(): EventHandler { return this._handler; }


    constructor(name: string, handler: EventHandler) {
        this._name = name;
        this._handler = handler;
    }

    invoke(e: BlocEvent) {
        this._handler(e);
    }
}

/**
 * The base class of any BLoC class in the application.
 */
export default class BaseBloc {

    private _eventHooks: BlocEventHook[];


    constructor() {
        this._eventHooks = new Array<BlocEventHook>();
    }

    /**
     * Handles the specified event using handlers registered via hookEvent.
     * @param {BlocEvent} event The event data to pass to the event handlers.
     */
    processEvent(event: BlocEvent) {
        for(const hook of this._eventHooks) {
            if (hook.name === event.name) {
                hook.invoke(event);
            }
        }
    }

    /**
     * Hooks the specified handler to an event name.
     * @param {string} name The name of the event to listen to.
     * @param {EventHandler} handler The function which performs certain action in response to the listening event.
     */
    protected hookEvent(name: string, handler: EventHandler) {
        this._eventHooks.push(new BlocEventHook(name, handler));
    }
}