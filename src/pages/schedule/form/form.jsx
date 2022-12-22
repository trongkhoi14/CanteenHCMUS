import './form.css';
import './../../../assets/css/style.css';
import icons from './../../../assets/icons';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { scheduleService } from './../../../services';
import { useSchedule } from './../../../hooks';
import { schedule } from './../../../store/actions';
import { useNavigate } from 'react-router-dom';
import { ListAssignment } from './../../../components';
import $ from 'jquery';
import toastr from 'toastr'
import Card from 'react-bootstrap/Card';
import { createAssignment } from '../../../services/schedule-service';

function getCurDate()
{
    const date = new Date();
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    return `${y}-${m}-${d}`;
}

function Form() {

    const [curDate, setcurDate] = useState(getCurDate());
    const [date, setDate] = useState(curDate);
    const [shifts, setShifts] = useState([
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
        scheduleService.getShift()
            .then((response) => setShifts(response.data))
            .catch((err) => {
                // thông báo lỗi ở đây
                console.log(err)
            })
    }, [])

    const [users, setUsers] = useState([
        {
            "_id": "636e7db6179be068b92a4310",
            "username": "killermh1352@gmail.com",
            "password": "$2b$10$ui8/YRZiLAEd7dePpFNSZuh.xOY/Hnu31HSu8VXAI/Hn5vSnp2gsa",
            "kind": "owner",
            "userType": {
                "_id": "636e8a89da0f543b598e1649",
                "fullName": "ADMIN 12",
                "image": "admin.jpg",
                "__v": 0
            },
            "status": true,
            "__v": 0,
            "role": "636e7468a1950561f2f4496b"
        }
    ]);

    useEffect(() => {
        scheduleService.getUsers()
            .then((response) => setUsers(response.data.users))
            .catch((err) => {
                // thông báo lỗi ở đây
                console.log(err)
            })
    }, [])

    const navigate = useNavigate();

    function createAssignment(event)
    {
        event.preventDefault();
        let userId = $('#users').val();
        let shiftId = $('#shift').val();
        let assignmentDate = $('#start').val();
        scheduleService.createAssignment(assignmentDate,shiftId,userId)
            .then((response) => {
                console.log(response.data);
                if(response.message!=='Add assignment successfully.')
                {
                    alert('Phân công thất bại, hãy thử lại.',response.message);
                }
                else
                {
                    alert('Phân công thành công.',response.message);
                    navigate("./..");
                }
            })
            .catch((err) => {
                // thông báo lỗi ở đây
                alert('Phân công thất bại, hãy thử lại.',err.message);
                console.log(err)
        })
    }

    function getBack()
    {
        navigate("./..");
    }

    var shiftsList=[];
    for (let i = 0; i < shifts.length; i++) {
        shiftsList.push(<option key={i*7} value={shifts[i]._id}>{shifts[i].name}</option>);
    }
    var usersList=[];
    for (let i = 0; i < users.length; i++) {
        usersList.push(<option key={i*11} value={users[i]._id}>{users[i].userType.fullName}</option>);
    }

    return (
        <div className='Form'>
            <form action="/action_page.php">

            <label htmlFor="users">Nhân viên</label>
            <br></br>
                <select id="users" name="users">
                    {usersList}
                </select>
                <br></br>
                <label htmlFor="shift">Ca làm</label>
                <br></br>
                <select id="shift" name="shift">
                    {shiftsList}
                </select>
                <br></br>
                <label htmlFor="start">Ngày làm việc</label>
                <br></br>
                <input type="date" id="start" name="trip-start"
                    value={date}
                    min={curDate} 
                    onChange={() => setDate($('#start').val())} 
                ></input>
                <input type="submit" value="Tạo phân công" onClick={createAssignment}/>
            </form>
            <button type='button' onClick={getBack}>Trở về lịch làm việc</button>
        </div>
    )
}

export default Form;