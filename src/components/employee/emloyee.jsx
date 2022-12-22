
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './employee.css'
import 'bootstrap/dist/css/bootstrap.css';
import { faFile, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Change from '../../pages/emloyees/change/change';


function Employee({
  info,
  key
}) {
    const navigate = useNavigate()
    const [isChange, setIsChange] = useState(false);
    const callbackFunction = (childData) => {
        setIsChange(childData)
    }
    const handleChange = () => {
        //
        if(isChange === false) {
            setIsChange(true)
        }
        else {
            setIsChange(false)
        }
    }
    const handleDelete = () => {
        //
        console.log('delete')
    }
    return ( 
        <div>
           
            <div className="container w1200 user-card-full card">
                <div className="row m-l-0 m-r-0">
                    <div className="col-sm-3 bg-c-lite-green user-profile">
                        <div className="card-block text-center text-white">
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <div className="card-block">
                            <div className="m-b-20 b-b-default d-flex align-items-center justify-content-end">
                            </div>
                            <div className="row justify-content-between">
                                <div className="col-sm-2 d-flex align-items-center">
                                    <h6 className="text-muted f-w-400 mb0">{info.userType.fullName}</h6>
                                </div>
                                <div className="col-sm-4 d-flex align-items-center">
                                    <h6 className="text-muted f-w-400 mb0">{info.username}</h6>
                                </div>
                                <div className="col-sm-3 d-flex align-items-center"> 
                                    <h6 className="text-muted f-w-400 mb0">{info.userType.sex}</h6>
                                </div>

                                {/* <FontAwesomeIcon icon={faPenToSquare} 
                                className="col-sm-1 fs-4 faPenToSquare" onClick={()=>{handleChange()}}/> */}
                                <FontAwesomeIcon icon={faTrash} 
                                className="col-sm-1 fs-4 faPenToSquare" onClick={()=>{handleDelete()}}/>
                            </div>
                            <h6 className="m-t-20 b-b-default f-w-600 mb0"></h6>
                        </div>
                    </div>
                </div>
            </div>  
            {isChange === true ? <Change info={info} parentCallback={callbackFunction}/> : <></> }
        </div>
          
     );
}

export default Employee;