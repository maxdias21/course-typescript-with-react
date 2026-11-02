import {ComponentPropsWithoutRef} from "react";

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
    href?: never
}

type ArchorProps = ComponentPropsWithoutRef<'a'> & {
    href: string
}

function IsArchorProps(props: ButtonProps | ArchorProps): props is ArchorProps {
    return 'href' in props && typeof props.href === 'string';
}


export default function Button(props: ButtonProps | ArchorProps) {
    if (IsArchorProps(props)) {
        return <a className="button" {...props}>{props.title}</a>
    }

    return (
        <button className="button" {...props}>{props.title}</button>
    )
}