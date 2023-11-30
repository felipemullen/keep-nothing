export interface CreateFieldHeaderProps {
    label: string;
    required?: boolean;
}

export function CreateFieldHeader(props: CreateFieldHeaderProps) {
    return (
        <p className="font-light">
            {props.label}{props.required ? <span className="text-rose-400">*</span> : null}
        </p>
    );
}