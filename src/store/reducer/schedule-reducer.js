import { schedule } from './../../constant';

const scheduleInitialState = [];

const scheduleReducer = (state, action) => {
    let newState = [];
    let assigmentId = null;
    let assignmentinfo = null;
    switch (action.type) {
        case schedule.GET_SCHEDULE:
            const assignments = action.payload?.data;
            newState = assignments.map((assignment) => {
                const {
                    _id: _id,
                    shiftId,
                    userId,
                    assignmentDate,
                } = assignment;
                return {
                    _id,
                    assignmentDate,
                    shift: shiftId,
                    user: userId
                }
            })
            return [...newState]
        case schedule.ADD_ASSIGNMENT:
        default:
            return [...state]
    }
}

export { scheduleInitialState };
export default scheduleReducer;