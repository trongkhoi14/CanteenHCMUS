import { bussiness } from '../../constant';

const bussinessInitialState = [];

const bussinessReducer = (state, action) => {
    
    switch (action.type) {
        case bussiness.GET_STATISTIC:
            return action.payload?.data
        case bussiness.SEARCH_REVENUE:
            return action.payload.data
        default:
            return [...state]
    }
}

export { bussinessInitialState };
export default bussinessReducer;