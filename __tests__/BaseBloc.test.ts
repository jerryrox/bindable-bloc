import BaseBloc from '../src/bloc/BaseBloc';
import BlocEvent from '../src/bloc/BlocEvent';

class TestBloc extends BaseBloc {

    lastEvent: BlocEvent | undefined;
    isInitialized: boolean;

    constructor() {
        super();
        super.hookEvent("testEventName", (e) => this.lastEvent = e);
        this.isInitialized = false;
    }

    async initialize() {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
                this.isInitialized = true;
            }, 100);
        });
    }
}

test("BaseBloc event handling", () => {
    const testbloc = new TestBloc();
    const testEvent = new BlocEvent("testEventName", 0);
    const testEvent2 = new BlocEvent("testEventName 2", 0);

    expect(testbloc.lastEvent).toBeUndefined();
    testbloc.processEvent(testEvent2);
    expect(testbloc.lastEvent).toBeUndefined();
    testbloc.processEvent(testEvent);
    expect(testbloc.lastEvent).toBe(testEvent);
});

test("BaseBloc initialize", async () => {
    const bloc = new TestBloc();
    expect(bloc.isInitialized).toBeFalsy();

    const promise = bloc.initialize();
    expect(bloc.isInitialized).toBeFalsy();
    await promise;
    expect(bloc.isInitialized).toBeTruthy();
});