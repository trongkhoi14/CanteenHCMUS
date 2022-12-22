import { profile } from '../../constant'

const profileInitialState = []


const profileReducer = (state, action) => {
    let fullName = '';
    let image = '';
    let id = '';
    switch (action.type) {
        case profile.GET_PROFILE:
            return action.payload?.data
        case profile.UPDATE_PROFILE:
            fullName = action.payload.fullName;
            image = action.payload.image;
            id = action.payload._id;
            if (id === state._id) {
                state.userType.fullName = fullName;
            }
            if (id !== '') {
                state.userType.image = image;
            }

            return { ...state }
        default:
            return { ...state }
    }
}

export { profileInitialState };
export default profileReducer;