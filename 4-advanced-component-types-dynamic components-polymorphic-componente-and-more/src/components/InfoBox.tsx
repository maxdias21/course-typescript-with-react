import {type ReactNode} from "react";

type HintBoxProps = {
    mode: 'hint',
    children: ReactNode,
}

type WarningBoxProps = {
    mode: 'hint' | 'warning',
    children: ReactNode,
    severity?: 'low' | 'medium' | 'high',
};

type InfoBoxProps = HintBoxProps | WarningBoxProps;

function InfoBox(props: InfoBoxProps) {
    const {children} = props;


    if (props.mode === 'hint') {
        return (
            <aside className="infobox infobox-hint">
                <p>{children}</p>
            </aside>
        )
    }

    const {severity} = props;


    return (
        <aside className={`infobox infobox-warning warning--${severity}`}>
            <h2>Warning</h2>
            {children}
        </aside>
    )
}

export default InfoBox;