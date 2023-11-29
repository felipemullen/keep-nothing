export interface KeyValuePillProps {
    label: string;
    value: string;
    className?: string;
}

export function KeyValuePill({ className, label, value }: KeyValuePillProps) {
    return (
        <p className={`${className} font-light text-sm border bg-neutral-100 rounded-md py-1 px-2`}>
            <span className="mr-1 capitalize">{label}:</span>
            <strong className="whitespace-nowrap capitalize">{value}</strong>
        </p>
    );
}