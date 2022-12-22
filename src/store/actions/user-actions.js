import { user } from '../../constant';

export const getProfile = payload => ({
    type: user.GET_PROFILE,
    payload
})

export const addProfile = payload => ({
    type: user.ADD_PROFILE,
    payload
})

export const getAllUser = payload => ({
    type: user.GET_ALL_USER,
    payload
})

export const updateProfile = payload => ({
    type: user.UPDATE_PROFILE,
    payload
})

