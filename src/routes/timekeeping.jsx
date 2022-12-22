import { Routes, Route } from "react-router-dom";
import { Timekeeping } from './../pages';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

function TimekeepingRouter() {
    return (
        <Routes>
            <Route index element={<Timekeeping />} />
        </Routes>
    )
}

export default TimekeepingRouter;