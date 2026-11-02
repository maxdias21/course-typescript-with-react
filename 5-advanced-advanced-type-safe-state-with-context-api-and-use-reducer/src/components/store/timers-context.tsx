import {createContext, type ReactNode, useContext, useReducer} from 'react'

type Timer = {
    name: string;
    duration: number
}

type TimersState = {
    isRunning: boolean;
    timers: Timer[]
};

const initialState: TimersState = {
    isRunning: true,
    timers: []
}

type TimersContentValue = TimersState & {
    addTimer: (timerData: Timer) => void,
    startTimers: () => void,
    stopTimers: () => void,
}

const TimersContext = createContext<TimersContentValue | null>(null);

export function useTimersContext() {
    const timerCtx = useContext(TimersContext);

    if (timerCtx === null) {
        throw new Error('useTimersContext must be used to useTimersContext');
    }

    return timerCtx;
}

type TimersContextProviderProps = {
    children: ReactNode;
}

type StartTimersAction = {
    type: 'START_TIMERS'
}

type StopTimersAction = {
    type: 'STOP_TIMERS'
}

type AddTimersAction = {
    type: 'ADD_TIMER',
    payload: Timer
}


type Action = StartTimersAction | StopTimersAction | AddTimersAction;


function timersReducer(state: TimersState, action: Action): TimersState {
    if(action.type === 'START_TIMERS') {
        return {
            ...state,
            isRunning: true
        }
    }

    if(action.type === 'STOP_TIMERS') {
        return {
            ...state,
            isRunning: false
        }
    }

    if(action.type === 'ADD_TIMER') {
        return {
            ...state,
            timers: [
                ...state.timers,
                {
                    name: action.payload.name,
                    duration: action.payload.duration,
                }
            ]
        }
    }

    return state;
}

export default function TimersContextProvider({children}: TimersContextProviderProps) {
    const [timersState, dispatch] = useReducer(timersReducer, initialState)

    const ctx: TimersContentValue = {
        timers: timersState.timers,
        isRunning: timersState.isRunning,
        addTimer(timerData) {
            dispatch({type: 'ADD_TIMER', payload: timerData});
        },
        startTimers() {
            dispatch({type: 'START_TIMERS'});
        },
        stopTimers() {
            dispatch({type: 'STOP_TIMERS'});
        }
    }
    return (
        <TimersContext.Provider value={ctx}>
            {children}
        </TimersContext.Provider>
    )
}