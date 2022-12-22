import './timeKeeping.css';
import './../../assets/css/style.css';
import icons from './../../assets/icons';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { timeKeepingService } from './../../services';
import { useSchedule } from './../../hooks';
import { schedule } from './../../store/actions';
import { useNavigate } from 'react-router-dom';
import { ListAssignment1 } from './../../components';
import $ from 'jquery';

function getDateOfWeek(yw) {
    var y = parseInt(yw.slice(0,4));
    var w = parseInt(yw.slice(6));
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    var d = ISOweekStart.getDate();
    var m = ISOweekStart.getMonth();
    y = ISOweekStart.getFullYear();
    let date = `${y}-${m+1}-${d}`;
    return new Date(date);
}

function getCurrentWeek()
{
    let currentDate = new Date();
    let startDate = new Date(currentDate.getFullYear(), 0, 1);
    var days = Math.floor((currentDate.getTime() - startDate.getTime() ) /
        (24 * 60 * 60 * 1000));
          
    var weekNumber = Math.ceil(days / 7);
    var year = currentDate.getFullYear();
    return `${year}-W${weekNumber}`;
}

function Timekeeping() {

    const [timekeeping, setTimekeeping] = useState(null);
    const [weekState, setWeek] = useState(getCurrentWeek());

    useEffect(() => {setWeek($('#week').val())}, []);

    useEffect(() => {
        timeKeepingService.getTimeKeeping()
            .then((response) => setTimekeeping(response.data.timeKeeping[0]))
            .catch((err) => {
                // thông báo lỗi ở đây
                console.log(err)
            })
    }, [weekState])

    return (
        <div id="schedule">
            <div className="schedule-navigation">
                <div className="schedule-week">
                    <p>
                        <label htmlFor ="week">Lịch làm việc </label>
                        <input  type="week" id="week" 
                                onChange={() => {
                                    setWeek($('#week').val());
                                    timeKeepingService.getTimeKeeping()
                                    .then((response) => setTimekeeping(response.data.timeKeeping[0]))
                                    .catch((err) => {
                                        // thông báo lỗi ở đây
                                        console.log(err)
                                    })
                                }} 
                                value={weekState}></input>
                    </p>
                </div>
            </div>
            <div className="schedule-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Ca làm việc</th>
                            <th>Thứ hai</th>
                            <th>Thứ ba</th>
                            <th>Thứ bốn</th>
                            <th>Thứ năm</th>
                            <th>Thứ sáu</th>
                            <th>Thứ bảy</th>
                        </tr>
                    </thead>
                    {timekeeping === null
                        ? 
                        <>
                            <tbody>
                                <tr>
                                    <td>Lịch trống</td> 
                                </tr>
                            </tbody>
                        </>
                        : 
                        <>  
                            <ListAssignment1 week={getDateOfWeek(weekState)} data={timekeeping.workDays}/>
                        </>
                    }
                </table>
            </div>
        </div>
    )
}

export default Timekeeping;