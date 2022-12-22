import { useReducer } from 'react';
import { DeliveryContext } from '../context';
import { deliveryReducer, deliveryInitialState } from '../reducer';

function DeliveryProvider({ children }) {
    const [state, dispatch] = useReducer(deliveryReducer, deliveryInitialState);
    return (
        <DeliveryContext.Provider value={[state, dispatch]}>
            {children}
        </DeliveryContext.Provider>
    )
}

export default DeliveryProvider;