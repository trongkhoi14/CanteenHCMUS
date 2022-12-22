import { Routes, Route } from "react-router-dom";
import { Order } from './../pages';
function OrderRouter() {
    return (
        <Routes>
            <Route index element={<Order />} />
        </Routes>
    )
}

export default OrderRouter;