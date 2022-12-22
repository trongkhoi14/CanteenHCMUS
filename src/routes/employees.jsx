import { Routes, Route } from "react-router-dom";
import { Employees } from '../pages';
import { Create, Change } from '../pages';
function OrderRouter() {
    return (
        <Routes>
            <Route index element={<Employees />} />
            <Route path='/create' element={<Create />} />
            <Route path='/change' element={<Change />} />
        </Routes>
    )
}

export default OrderRouter;