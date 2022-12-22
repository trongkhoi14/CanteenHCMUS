import { profile } from '../../constant';

export const getProfile = payload => ({
    type: profile.GET_PROFILE,
    payload
})

export const updateProfile = payload => ({
    type: profile.UPDATE_PROFILE,
    payload
})

