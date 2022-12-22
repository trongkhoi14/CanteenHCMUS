import { user } from './../../constant'

const userInitialState = {
    username: '',
    password: ''
}


const userReducer = (state, action) => {
    let fullName = '';
    let image = '';
    let id = '';
    switch (action.type) {
        case user.GET_PROFILE:
            return action.payload?.data
        case user.GET_ALL_USER:
            return action.payload?.data
        case user.ADD_PROFILE:
            
            state.users.push(action.payload.data);
            return { ...state }
        case user.UPDATE_PROFILE:
            fullName = action.payload.fullName;
            image = action.payload.image;
            id = action.payload._id;
 
            const index = state.users.findIndex((user) => user._id === id);

            state.users[index].userType.fullName = fullName;
            // state.users[index].userType.image = image;
            return { ...state }
        default:
            return { ...state }
    }
}

export { userInitialState };
export default userReducer;