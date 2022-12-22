import { receive } from '../../constant';

const receiveInitialState = [];

const receiveReducer = (state, action) => {
    let newState = [];

    switch (action.type) {
        case receive.GET_SAVED:
            return action.payload?.data
        case receive.ADD_NOTE:
        default:
            return [...state]
    }
}

export { receiveInitialState };
export default receiveReducer;