import { schedule } from './../../constant';

export const getSchedule = payload => ({
    type: schedule.GET_SCHEDULE,
    payload
})

export const createAssignment = payload => ({
    type: schedule.ADD_ASSIGNMENT,
    payload
})
