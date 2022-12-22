import { delivery } from '../../constant';

const deliveryInitialState = [];

const deliveryReducer = (state, action) => {
    let newState = [];

    switch (action.type) {
        case delivery.GET_SAVED:
            return action.payload?.data
        case delivery.ADD_NOTE:
        default:
            return [...state]
    }
}

export { deliveryInitialState };
export default deliveryReducer;