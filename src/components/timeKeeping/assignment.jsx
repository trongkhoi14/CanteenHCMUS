import icons from './../../assets/icons';
import './../../assets/css/style.css';
import './assignment.css';
import { useState, useEffect } from 'react';
import { useSchedule } from './../../hooks';
import { schedule } from './../../store/actions';
import { timeKeepingService } from './../../services';
import { useNavigate } from 'react-router-dom';

function Assignment(props) {
    const {
        _id,
        assignmentDate,
        shiftId,
        userId,
    } = props.data._id;
    const id = props.id;
    const [check, setCheck] = useState(props.data.check);
    const isDisabled = props.isDisabled;

    let date = new Date().getTime();
    const navigate = useNavigate();

    useEffect(() => {setCheck(props.data.check)}, [])

    const checkF = async (event) => {
        timeKeepingService.checkAssignment(_id,userId._id)
            .then((response) => setCheck(true))
            .catch((err) => {
                // thông báo lỗi ở đây
                console.log(err)
            });
        console.log(1);
    }

    return (
            <td className='check' id={id}>
                <h1>Làm việc</h1>
                <br></br>
                <input type='checkbox' checked={check} disabled={isDisabled} onChange={checkF}/>
            </td>
    )
}

export default Assignment;