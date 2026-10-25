import Container from './UI/Container.tsx';
import {type Timer as TimerProps, useTimersContext} from '../store/timers-context.tsx';
import {useEffect, useRef, useState} from "react";

export default function Timer({name, duration}: TimerProps) {
    const {isRunning} = useTimersContext();

    const [remaining, setRemaining] = useState(duration * 1000);

    const interval = useRef<number | null>(null);
    if(remaining <= 0 && interval.current) {
        clearInterval(interval.current);
    }

    useEffect(() => {
        let timer: number;
        if(isRunning) {
            timer = setInterval(() => {
                setRemaining(prevTime => prevTime - 50);
            }, 50);
            interval.current = timer;
        } else if(interval.current) {
            clearInterval(interval.current)
        }

        return () => clearInterval(timer);
    }, [isRunning]);

    const formattedRemainingTime = (remaining / 1000).toFixed(2);

    return (
        <Container as="article">
            <h2>{name}</h2>
            <p>
                <progress max={duration * 1000} value={formattedRemainingTime}/>
            </p>
            <p>{formattedRemainingTime}</p>
        </Container>
    );
}
