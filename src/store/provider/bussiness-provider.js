import { useReducer } from 'react';
import { BussinessContext } from '../context';
import { bussinessReducer, bussinessInitialState } from '../reducer';

function BussinessProvider({ children }) {
    const [state, dispatch] = useReducer(bussinessReducer, bussinessInitialState);
    return (
        <BussinessContext.Provider value={[state, dispatch]}>
            {children}
        </BussinessContext.Provider>
    )
}

export default BussinessProvider;