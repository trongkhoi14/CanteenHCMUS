import icons from './../../assets/icons';
import './../../assets/css/style.css';
import './assignment.css';
import { useState, useEffect } from 'react';
import { useSchedule } from './../../hooks';
import { schedule } from './../../store/actions';
import { scheduleService } from './../../services';
import { useNavigate } from 'react-router-dom';


function Assignment(props) {
    const {
        _id,
        assignmentDate,
        shift,
        user,
    } = props.data;
    const id = props.id;

    const navigate = useNavigate();

    const openForm = async (event) => {
        navigate("./createAssignment");
    }

    return (
            <td id={id} onClick={openForm}>
                <h1>{user.userType.fullName}</h1>
            </td>
    )
}

export default Assignment;