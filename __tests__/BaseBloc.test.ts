import BaseBloc from '../src/bloc/BaseBloc';
import BlocEvent from '../src/bloc/BlocEvent';

class TestBloc extends BaseBloc {

    lastEvent: BlocEvent | undefined;

    constructor() {
        super();
        super.hookEvent("testEventName", (e) => this.lastEvent = e);
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