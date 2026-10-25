import CourseGoal from "./components/CourseGoal";
import Header from "./components/Header";

import goalsImage from './assets/goals.jpg';
import {useState} from "react";
import CourseGoalList from "./components/CourseGoalList.tsx";
import NewGoal from "./components/NewGoal.tsx";

export type CourseGoal = {
    title: string,
    description: string,
    id: number
}

export default function App() {
    const [goals, setGoals] = useState<CourseGoal[]>([]);

    function handleAddGoal(goal: string, summary: string) {
        setGoals((prevState) => {
            const newGoal: CourseGoal = {
                id: Math.random(),
                title: goal,
                description: summary,
            }

            return [...prevState, newGoal];
        });
    }

    function handleDeleteGoal(id: number) {
        setGoals(prevState => prevState.filter((goal) => goal.id !== id))
    }

    return (
        <main>
            <Header image={{src: goalsImage, alt: "A list of goals"}}>
                <h1>Your course Goals</h1>
            </Header>
            <NewGoal onAddGoal={handleAddGoal} />
            <CourseGoalList goals={goals} onDeleteGoal={handleDeleteGoal}/>
        </main>
    );
}
