import { Routes, Route } from "react-router-dom";
import { Login, ForgotPw, ResetPw } from '../pages';
function OrderRouter() {
    return (
        <Routes>
            <Route index element={<Login />} />
            <Route path="/forgotpw" element={<ForgotPw />} />
            <Route path="/resetpw" element={<ResetPw/>} />
        </Routes>
    )
}

export default OrderRouter;