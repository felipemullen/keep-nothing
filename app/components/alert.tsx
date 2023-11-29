import React from 'react';

export interface AlertProps {
    strong?: string;
    text?: string;
    className?: string;
}

export function Alert({ strong, text, className }: AlertProps) {
    return (
        <div className={`${className} border-2 border-red-400 text-neutral-500 rounded px-4 py-2 text-center text-sm`} role="alert">
            <span><strong className="mr-2">{strong}</strong>{text}</span>
        </div>
    );
};
