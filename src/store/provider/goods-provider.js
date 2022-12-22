import { useReducer } from 'react';
import { GoodsContext } from '../context';
import { goodsReducer, goodsInitialState } from '../reducer';

function GoodsProvider({ children }) {
    const [state, dispatch] = useReducer(goodsReducer, goodsInitialState);
    return (
        <GoodsContext.Provider value={[state, dispatch]}>
            {children}
        </GoodsContext.Provider>
    )
}

export default GoodsProvider;