import { privateAxios } from './../lib/axios';


export const checkAssignment = async ( assignmentId, userId ) => {
    try {
        console.log(2);
        const response = await privateAxios.post('timeKeeping/check', {    
            userId,
            assignmentId
        })
        return response?.data;
    } catch (err) {
        throw err;
    }
}

export const getTimeKeeping = async () => {
    try {
        const response = await privateAxios.get('timeKeeping/')
        return response?.data;
    } catch (err) {
        throw err;
    }
}