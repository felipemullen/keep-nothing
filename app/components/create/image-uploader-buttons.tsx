import React from 'react';
import { CreateFieldHeader } from './create-field-header';

export interface ButtonsProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ImageUploaderButtons(props: ButtonsProps) {
    return (
        <div className="">
            <label htmlFor="image-upload">
                <CreateFieldHeader label="Pictures" />
                <p className="text-xs mb-4 text-neutral-600">Remember, attaching pictures increases your chances to sell the item!</p>
            </label>
            <input className="text-sm text-neutral-600" type="file" id="image-upload" onChange={props.onChange} multiple />
        </div>
    );
}
