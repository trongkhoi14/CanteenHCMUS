import { Routes, Route } from "react-router-dom";
import { Warehouse } from './../pages';
function WarehouseRouter() {
    return (
        <Routes>
            <Route index element={<Warehouse />} />
        </Routes>
    )
}

export default WarehouseRouter;