import icons from './../../assets/icons';
import './../../assets/css/style.css';
import './assignment.css';
import { useState,useEffect } from 'react';
import { useSchedule } from './../../hooks';
import { schedule } from './../../store/actions';
import { timeKeepingService } from './../../services';
import { Assignment1 } from './../../components';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

function compareDate(date1,date2){
    if (Math.abs(date1.getTime()-date2.getTime())<=25200000)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function ListAsignment(props) {
    const [data, setData] = useState(props.data);
    const week = props.week;
    const today = new Date();
    const [shift, setShift] = useState([
        {
            "_id": "638208b60f30e2f9f2107a33",
            "start": "2",
            "end": "5",
            "name": "ca chiều",
            "__v": 0
        },
        {
            "_id": "638208c10f30e2f9f2107a38",
            "start": "7",
            "end": "11",
            "name": "ca sáng",
            "__v": 0
        },
        {
            "_id": "638208cd0f30e2f9f2107a3d",
            "start": "6",
            "end": "10",
            "name": "ca tối",
            "__v": 0
        }
    ]);

    useEffect(() => {
        timeKeepingService.getTimeKeeping()
            .then((response) => setData(response.data.timeKeeping[0].workDays))
            .catch((err) => {
                // thông báo lỗi ở đây
                console.log(err)
            })
    }, [])


    const navigate = useNavigate();

    var tds = [];
    var rows = [];
    for (let i = 0; i < 3; i++) {
        var curDate = new Date(week);
        tds = [];
        tds.push(<th key={shift[i].name}>{shift[i].name}</th>);
        for (let weekDays = 0; weekDays < 6; weekDays++)
        {
            let flag = false;
            for (let j = 0; j < data.length; j++)
            {
                let assignmentDate = new Date(data[j]._id.assignmentDate)
                if (data[j]._id.shiftId.name === shift[i].name && compareDate(assignmentDate,curDate))
                {
                    tds.push(<Assignment1 id={j} key={i*6+weekDays+j*10} data = {data[j]} isDisabled = {assignmentDate.getTime() < today.getTime()}/>);
                    flag = true;
                }
            }
            if (flag === false)
            {
                tds.push(<td key={weekDays}>
                            <h1>Lịch trống</h1>
                            <br></br><input type='checkbox' disabled/>
                        </td>);
            }
            curDate.setDate(curDate.getDate()+1);
        }
        rows.push(<tr key={i*10}>{tds}</tr>);
    }
    return <tbody>{rows}</tbody>;
}

export default ListAsignment;