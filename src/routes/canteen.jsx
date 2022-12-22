import { Routes, Route } from "react-router-dom";
import { Canteen } from './../pages';
function CanteenRouter() {
    return (
        <Routes>
            <Route index element={<Canteen />} />
        </Routes>
    )
}

export default CanteenRouter;