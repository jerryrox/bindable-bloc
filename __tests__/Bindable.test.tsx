import React from "react";
import { act } from "react-dom/test-utils";
import { shallow, mount } from 'enzyme';

import Bindable from '../src/Bindable';
import { LabelDisplayer } from './mockup/index';

test("Initialize Bindable with values passed into constructor.", () => {
    const bindable = new Bindable<number>(0);
    expect(bindable.getValue()).toBe(0);

    const bindable2 = new Bindable<string>("a");
    expect(bindable2.getValue()).toBe("a");
});

test("Set Bindable value", () => {
    const bindable = new Bindable<number>(2);
    expect(bindable.getValue()).toBe(2);
    bindable.setValue(3);
    expect(bindable.getValue()).toBe(3);
});

test("Subscribe to/Unsubscribe from Bindable", () => {
    const bindable = new Bindable<number>(1);

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
    const bindable = new Bindable<string>("Lol");
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
    const bindable = new Bindable<string>("lolz");
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
    const bindable = new Bindable<number>(1);

    let receivedValue = bindable.getValue();
    bindable.subscribe((value) => receivedValue = value);

    bindable.setValue(2);
    expect(receivedValue).toBe(2);
    bindable.setValue(3, false);
    expect(receivedValue).toBe(2);
});

test("Test property", () => {
    const bindable = new Bindable<number>(1);
    expect(bindable.value).toBe(1);

    let receivedValue = bindable.getValue();
    bindable.subscribe((value) => receivedValue = value);

    bindable.value = 2;
    expect(bindable.value).toBe(2);
    expect(receivedValue).toBe(2);
});