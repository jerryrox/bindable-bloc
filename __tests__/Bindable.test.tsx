import React from "react";
import { act } from "react-dom/test-utils";
import { shallow, mount } from 'enzyme';

import Bindable from '../src/Bindable';
import { LabelDisplayer } from './mockup/index';

test("Initialize Bindable with values passed into constructor.", () => {
    const bindable = new Bindable<number>(0, false);
    expect(bindable.getValue()).toBe(0);

    const bindable2 = new Bindable<string>("a", false);
    expect(bindable2.getValue()).toBe("a");
});

test("Set Bindable value", () => {
    const bindable = new Bindable<number>(2, false);
    expect(bindable.getValue()).toBe(2);
    bindable.setValue(3);
    expect(bindable.getValue()).toBe(3);
});

test("Subscribe to/Unsubscribe from Bindable", () => {
    const bindable = new Bindable<number>(1, false);

    let receivedValue = bindable.getValue();
    const id = bindable.subscribe((v) => receivedValue = v);
    expect(receivedValue).toBe(bindable.getValue());

    bindable.setValue(0);
    expect(receivedValue).toBe(bindable.getValue());

    bindable.unsubscribe(id);
    bindable.setValue(5);
    expect(receivedValue).toBe(0);
    expect(bindable.getValue()).toBe(5);
});

test("Update component state with useBindable hook", () => {
    const bindable = new Bindable<string>("Lol", false);
    const component = mount(
        <LabelDisplayer bindable={bindable}/>
    );
    expect(component.find("p").at(0).text()).toEqual("Lol");

    act(() => {
        bindable.setValue("Lol2");
    });
    component.mount();
    expect(component.find("p").at(0).text()).toEqual("Lol2");
});

test("Test subscribe and trigger", () => {
    const bindable = new Bindable<string>("lolz", false);
    expect(bindable.getValue()).toBe("lolz");

    let callbackedVal = bindable.getValue();
    const bindableCallback = (val: string) => callbackedVal = val;

    bindable.setValue("zzz");
    expect(bindable.getValue()).toBe("zzz");
    expect(callbackedVal).toBe("lolz");

    bindable.subscribeAndTrigger(bindableCallback);
    expect(bindable.getValue()).toBe("zzz");
    expect(callbackedVal).toBe("zzz");

    bindable.setValue("a");
    expect(bindable.getValue()).toBe("a");
    expect(callbackedVal).toBe("a");
});

test("Test without trigger", () => {
    const bindable = new Bindable<number>(1, false);

    let receivedValue = bindable.getValue();
    bindable.subscribe((value) => receivedValue = value);

    bindable.setValue(2);
    expect(receivedValue).toBe(2);
    bindable.setValue(3, false);
    expect(receivedValue).toBe(2);
});

test("Test property", () => {
    const bindable = new Bindable<number>(1, false);
    expect(bindable.value).toBe(1);

    let receivedValue = bindable.getValue();
    bindable.subscribe((value) => receivedValue = value);

    bindable.value = 2;
    expect(bindable.value).toBe(2);
    expect(receivedValue).toBe(2);
});

test("TriggerWhenDifferent", () => {
    // Bindable will trigger only when new value is different.
    const bindable = new Bindable<number>(0, true);
    let received = -1;
    bindable.subscribe((value) => received = value);

    // Existing value matches the new value, so event shouldn't trigger.
    bindable.setValue(0);
    expect(received).toBe(-1);
    bindable.setValue(1);
    expect(received).toBe(1);

    received = -1;
    bindable.triggerWhenDifferent = false;
    bindable.setValue(1);
    expect(received).toBe(1);

    received = -1;
    bindable.triggerWhenDifferent = true;
    bindable.setValue(1);
    expect(received).toBe(-1);
});

test("Proxying bindable", () => {
    const sourceBindable = new Bindable<number>(0);
    const bindable = new Bindable<number>(1);

    bindable.startProxy(sourceBindable);
    expect(bindable.value).toBe(sourceBindable.value);

    sourceBindable.value = 10;
    expect(bindable.value).toBe(10);

    bindable.stopProxy();
    sourceBindable.value = 11;
    expect(bindable.value).toBe(10);

    bindable.startProxy(sourceBindable);
    expect(bindable.value).toBe(sourceBindable.value);
});