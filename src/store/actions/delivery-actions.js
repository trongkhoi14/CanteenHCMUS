import { delivery } from '../../constant';

export const getSaved = payload => ({
    type: delivery.GET_SAVED,
    payload
})

export const addNote = payload => ({
    type: delivery.ADD_NOTE,
    payload
})

