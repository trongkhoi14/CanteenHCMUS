import { Routes, Route } from "react-router-dom";
import { Bussiness } from './../pages';
function BussinessRoute() {
    return (
        <Routes>
            <Route index element={<Bussiness />} />
        </Routes>
    )
}

export default BussinessRoute;