
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './employees.css'
import 'bootstrap/dist/css/bootstrap.css';
import Employee from '../../../components/employee/emloyee';
import Btn from '../../../components/Btn/Btn'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useUser } from '../../../hooks'
import { user } from './../../../store/actions'
import { userService } from './../../../services'

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

function Employees() {
    const navigate = useNavigate();
    const [userState, userDispatch] = useUser()
    useEffect(() => {
        userService.getAllUser()
            .then((response) => userDispatch(user.getAllUser(response)))
            .catch((err) => {
                // thông báo lỗi ở đây
                toastr.warning(err, 'Error', {timeOut: 1000})
            })
    }, [])
    let data = userState.users;


    return ( 
        <div>
            <div className="w1200 mb-4">
                <button type="button" className="btn-add d-flex justify-content-center align-items-center" onClick={()=>{navigate('/employees/create')}}>
                    <FontAwesomeIcon icon={faPlus} className="fs-5 create-employee-btn"/>
                    <div className="create-employee-text">Tạo mới</div>
                </button> 
            </div>
            {userState.length === 0
            ? <div className="d-flex justify-content-center">
                Danh sách rỗng
            </div>
            : <>
            {data === undefined? <></>: data.map((info) => 
                info.kind === '' ?
                <></> :
                <Employee 
                    info={info}
                    key={info._id}
                />
                )
            }
            </>}
           
            
           
        </div>
     );
}

export default Employees;