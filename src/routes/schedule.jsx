import { Routes, Route } from "react-router-dom";
import { Schedule, Form } from './../pages';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

function ScheduleRouter() {
    return (
        <Routes>
            <Route index element={<Schedule />} />
            <Route path='createAssignment' element={<Form />} />
        </Routes>
    )
}

export default ScheduleRouter;