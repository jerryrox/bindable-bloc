import React from "react";
import Bindable from '../../src/Bindable';
import useBindable from '../../src/utils/useBindable';

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
