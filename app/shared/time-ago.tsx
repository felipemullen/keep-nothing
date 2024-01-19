'use client';

import { useState } from 'react';
import { Util } from '../util/util';

export interface TimeAgoProps {
    date: string | Date;
    className?: string;
}

export function TimeAgo({ className, date }: TimeAgoProps) {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const dateString = new Date(date).toLocaleDateString(undefined, options) || '';
    const timePassed = Util.timeAgo(dateString);

    const [showDate, setShowDate] = useState<boolean>(false);

    return (
        <button className={`${className} border-b border-dashed border-neutral-400`} onClick={() => setShowDate(!showDate)}>
            {showDate ? dateString : timePassed}
        </button>
    );
}