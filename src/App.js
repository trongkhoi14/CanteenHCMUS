import { Routes, Route } from 'react-router-dom';
import { ProtectRoute } from './components/authorization';
import { role } from './config';
import { HomeLayout, CartRoute, PaymentRoute, OrderRoute, LoginRoute, 
    ProfileRoute, EmployeesRoute, Canteen, 
    Warehouse, BussinessRoute, ScheduleRoute, TimekeepingRoute } from './routes';
import Home from './pages/home/index/home';

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<HomeLayout />}>
                    <Route index element={<Home />} />
                    <Route path='/cart/*' element={<CartRoute />} />
                    <Route path='/payment/*' element={<PaymentRoute />} />
                    <Route element={<ProtectRoute />}>
                        <Route path='/order/*' element={<OrderRoute />} />
                        <Route path='/timekeeping/*' element={<TimekeepingRoute />} />
                        <Route path='/profile' element={<ProfileRoute/>} />
                        <Route path='/canteen' element={<Canteen/>} />
                    </Route>
                    <Route element={<ProtectRoute allowRoles={[role.OWNER]} />}>
                        <Route path='/employees/*' element={<EmployeesRoute />} />
                        <Route path='/bussiness' element={<BussinessRoute />} />
                        <Route path='/schedule/*' element={<ScheduleRoute />} />
                    </Route>
                    <Route element={<ProtectRoute allowRoles={[role.OWNER || role.STAFF]} />}>
                        
                       
                        <Route path='/warehouse/*' element={<Warehouse/>} />
                    </Route>
                    <Route path='/unauthorized' element={<Unauthorization />} />
                   
                </Route>
                
                <Route path='/login/*' element={<LoginRoute />} />
                

            </Routes>
        </>
    )
}


function Unauthorization() {
    return <h1>Unauthorization page</h1>
}
// function Home() {
//     return (
//         <>
//             <h1>Home page</h1>
//         </>
//     )
// }

export default App;
