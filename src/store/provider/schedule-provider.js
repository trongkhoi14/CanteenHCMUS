import { useReducer } from 'react';
import { ScheduleContext } from './../context';
import { scheduleReducer, scheduleInitialState } from './../reducer';

function ScheduleProvider({ children }) {
    const [state, dispatch] = useReducer(scheduleReducer, scheduleInitialState);
    return (
        <ScheduleContext.Provider value={[state, dispatch]}>
            {children}
        </ScheduleContext.Provider>
    )
}

export default ScheduleProvider;