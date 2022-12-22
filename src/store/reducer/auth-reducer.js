import { auth } from './../../constant';

const accessToken = JSON.parse(localStorage.getItem('accessToken'));
const roles = JSON.parse(localStorage.getItem('roles'));
const authInitialState = {
    accessToken: accessToken || '',
    roles: roles || [],
    user: null,
}

const authReducer = (state, action) => {
    switch (action.type) {
        case auth.LOGIN:
            //call api to server
            const {
                user,
                accessToken = ''
            } = action.payload;
            // lưu vào local storage
            localStorage.setItem('accessToken', JSON.stringify(accessToken));
            localStorage.setItem('roles', JSON.stringify([user.role]));

            return { accessToken, roles: [user.role], user };
        case auth.LOGOUT:
            localStorage.removeItem('accessToken');
            localStorage.removeItem('roles');
            return { accessToken: '', roles: [] };
        // refresh token case
        default:
            return { ...state }
    }
}

export { authInitialState };
export default authReducer;