import { useReducer } from 'react';
import { ReceiveContext } from '../context';
import { receiveReducer, receiveInitialState } from '../reducer';

function ReceiveProvider({ children }) {
    const [state, dispatch] = useReducer(receiveReducer, receiveInitialState);
    return (
        <ReceiveContext.Provider value={[state, dispatch]}>
            {children}
        </ReceiveContext.Provider>
    )
}

export default ReceiveProvider;