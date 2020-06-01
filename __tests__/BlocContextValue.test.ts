import BlocContextValue from '../src/bloc/BlocContextValue';
import BaseBloc from '../src/bloc/BaseBloc';
import BlocEvent from '../src/bloc/BlocEvent';

class TestBaseBloc extends BaseBloc {

    lastEvent: BlocEvent | undefined;
    eventDelegate: (e: BlocEvent) => void;

    constructor(name: string) {
        super();
        this.lastEvent = undefined;
        this.eventDelegate = (e: BlocEvent) => { };
            
        super.hookEvent(name, (e: BlocEvent) => {
            this.lastEvent = e;
            this.eventDelegate(e);
        });
    }
}

class TestBloc extends TestBaseBloc {

    constructor() {
        super("test");
    }
}

class TestLolBloc extends TestBaseBloc {

    constructor() {
        super("testLol");
    }
}

test("BlocContextValue.getBloc", () => {
    const test = new TestBloc();
    const value = new BlocContextValue({
        test
    });
    expect(value.getBloc(TestBloc)).toBe(test);
    expect(() => value.getBloc(TestLolBloc)).toThrow();
});

test("BlocContextValue.dispatch", () => {
    const test = new TestBloc();
    const testLol = new TestLolBloc();
    const value = new BlocContextValue({
        test, testLol
    });
    expect(test.lastEvent).toBe(undefined);
    expect(testLol.lastEvent).toBe(undefined);

    const event = new BlocEvent("testLol", 22);
    value.dispatch(event);
    expect(test.lastEvent).toBe(undefined);
    expect(testLol.lastEvent).toBe(event);
});
