import { receive } from '../../constant';

export const getSaved = payload => ({
    type: receive.GET_SAVED,
    payload
})

export const addNote = payload => ({
    type: receive.ADD_NOTE,
    payload
})

