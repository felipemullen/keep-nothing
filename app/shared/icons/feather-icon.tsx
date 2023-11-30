import icons from 'feather-icons/dist/icons.json';
import { FeatherIconName } from './icon-names';

export interface FeatherIconProps {
    name: FeatherIconName;
    size?: number;
    className?: string;
    color?: string;
    strokeWith?: number;
    fillColor?: string;
}

export function FeatherIcon(props: FeatherIconProps) {
    const size = props.size ?? 24;
    const color = props.color ?? 'currentColor';
    const strokeWidth = props.strokeWith ?? 2;
    const fill = props.fillColor ?? 'none';

    return (
        <svg
            className={props.className ?? ""}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            strokeWidth={strokeWidth}
            stroke={color}
            fill={fill}
            strokeLinecap="round"
            strokeLinejoin="round"
            dangerouslySetInnerHTML={{ __html: icons[props.name] }}
        >
        </svg>
    );
}