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
