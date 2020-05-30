import React from "react";
import { useBindable } from '../../src/Bindable';
import Bindable from '../../src/Bindable';

interface ILabelDisplayerProp {
    bindable: Bindable<string>
}

export const LabelDisplayer = ({
    bindable
}: ILabelDisplayerProp) => {

    const boundData = useBindable(bindable);

    return (
        <div>
            <p>{boundData}</p>
        </div>
    );
};
