import { privateAxios } from './../lib/axios';


export const createAssignment = async ( assignmentDate, shiftId, userId ) => {
    try {
        const response = await privateAxios.post('schedule/create', {
            assignmentDate,
            shiftId,
            userId
        })
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const getSchedule = async () => {
    try {
        const response = await privateAxios.get('schedule/')
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const getShift = async () => {
    try {
        const response = await privateAxios.get('shift/')
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const getUsers = async () => {
    try {
        const response = await privateAxios.get('user/all')
        return response?.data;
    } catch (err) {
        throw err;
    }
}

