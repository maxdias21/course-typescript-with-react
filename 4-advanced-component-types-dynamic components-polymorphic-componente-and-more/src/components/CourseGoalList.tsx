import CourseGoal from './CourseGoal.tsx';
import InfoBox from './InfoBox';

import {type CourseGoal as CGoal} from '../App.tsx';
import {type ReactNode} from "react";


type CourseGoalListProps = {
    goals: CGoal[];
    onDeleteGoal: (id: number) => void;
};

export default function CourseGoalList({
                                           goals,
                                           onDeleteGoal,
                                       }: CourseGoalListProps) {
    if (goals.length === 0) {
        return <InfoBox  mode="hint">You have no course goals yet. Starting adding some!</InfoBox>
    }

    let warningBox: ReactNode;

    if (goals.length >= 4) {
        warningBox =
            <InfoBox severity="high" mode="warning">You're collecting a lot of goals. Don't put too much on your
                plate!</InfoBox>
    }

    return (
        <>
            {warningBox}
            <ul>
                {goals.map((goal) => (
                    <li key={goal.id}>
                        <CourseGoal id={goal.id} title={goal.title} onDelete={onDeleteGoal}>
                            <p>{goal.description}</p>
                        </CourseGoal>
                    </li>
                ))}
            </ul>
        </>
    );
}
