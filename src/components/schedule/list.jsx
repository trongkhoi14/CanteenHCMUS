import icons from './../../assets/icons';
import './../../assets/css/style.css';
import './assignment.css';
import { useState } from 'react';
import { useSchedule } from './../../hooks';
import { schedule } from './../../store/actions';
import { scheduleService } from './../../services';
import { Assignment } from './../../components';
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
    
    const navigate = useNavigate();

    const openForm = async (event) => {
        navigate("./createAssignment");
    }


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
                let assignmentDate = new Date(data[j].assignmentDate)
                if (data[j].shift.name === shift[i].name && compareDate(assignmentDate,curDate))
                {
                    tds.push(<Assignment id={j} key={i*6+weekDays+j*10} data = {data[j]}/>);
                    flag = true;
                }
            }
            if (flag === false)
            {
                tds.push(<td key={weekDays} onClick={openForm}><h1>Lịch trống</h1></td>);
            }
            curDate.setDate(curDate.getDate()+1);
        }
        rows.push(<tr key={i*10}>{tds}</tr>);
    }
    return <tbody>{rows}</tbody>;
}

export default ListAsignment;