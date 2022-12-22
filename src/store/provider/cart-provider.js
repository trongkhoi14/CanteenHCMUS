import { useReducer } from 'react';
import { CartContext } from './../context';
import { cartReducer, cartInitialState } from './../reducer';

function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState);
    return (
        <CartContext.Provider value={[state, dispatch]}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;