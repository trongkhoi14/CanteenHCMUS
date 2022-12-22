import { Routes, Route } from "react-router-dom";
import { Profile } from './../pages';
function ProfileRouter() {
    return (
        <Routes>
            <Route index element={<Profile />} />
        </Routes>
    )
}

export default ProfileRouter;