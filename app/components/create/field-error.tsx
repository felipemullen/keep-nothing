export interface FieldErrorProps {
    error: string;
}

export function FieldError({ error }: FieldErrorProps) {
    if (error) {
        return (
            <div className="text-red-500 text-xs pl-1">{error}</div>
        );
    } else {
        return (
            <div className="text-xs">&nbsp;</div>
        );
    }
}