import {type PropsWithChildren, /* type ReactNode*/} from "react";

/*
Pode ser tanto interface ou type

interface CourseGoalProps {
    title: string,
    children: ReactNode

}
*/

type CourseGoalProps = PropsWithChildren<{
    title: string;
    onDelete: (id: number) => void;
    id: number;
}>;

function CourseGoal({title, id, children, onDelete}: CourseGoalProps) {
    return (
        <article>
            <div>
                <h2>{title}</h2>
                {children}
            </div>
            <button onClick={() => onDelete(id)}>Delete</button>
        </article>
    )
}

export default CourseGoal;