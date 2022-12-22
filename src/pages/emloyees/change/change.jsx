
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './change.css'
import 'bootstrap/dist/css/bootstrap.css';
import Btn from '../../../components/Btn/Btn'
import UploadImg from '../../../components/UploadImg/UploadImg';
import avatar from '../../../assets/images/avatar_chu.jpg'
import { faClose, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import { useUser } from '../../../hooks'
import { user } from './../../../store/actions'
import { userService } from './../../../services'
import { useProfile } from '../../../hooks'
import { profile } from './../../../store/actions'

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { responsivePropType } from 'react-bootstrap/esm/createUtilityClasses';

function Change( props ) {
    const [userState, userDispatch] = useUser()
    const [profileState, profileDispatch] = useProfile()

    const [isLoadImg,setIsLoadImg] = useState(false);
    const [name, setName] = useState(props.info.userType.fullName);
    const [username, setUsername] = useState(props.info.username);
    const [sex, setSex] = useState(props.info.userType.sex);
    const handleSave = () => {
        if(name !== '' && username !== '' && sex !== '') {
            userService.updateProfile({
                fullName: name,
                username: username,
                sex: sex,
            })
                .then((response)=>{
                    response.data._id = props.info._id
                    profileDispatch(profile.updateProfile(response.data));
                    toastr.info(response.message, 'Success', {timeOut: 1000})
                })
                .catch((err) => {
                    // thông báo lỗi ở đây
                    console.log(err)
                    toastr.warning(err, 'Error', {timeOut: 1000})
                })
            props.parentCallback(false)
        }  
    }
    const callbackFunction = (childData) => {
        setIsLoadImg(childData)
    }


    return ( 

        <div>
            {isLoadImg?
            (<div>
                <FontAwesomeIcon icon={faClose} className="close-btn" onClick={()=>{setIsLoadImg(false)}}/>
                <UploadImg id={props._id} type={"person"} parentCallback={callbackFunction}/>
            </div>) 
            : <></>}
            <div className="container w1200 user-card-full card">
                <div className="row m-l-0 m-r-0">
                    <div className="col-sm-4 bg-c-lite-green user-profile pt-0">
                        <div className=" text-center text-white">
                            <div className="m-b-25">
                                <img className="card-img-top
                                border-top-right-radius-0 border-bottom-left-radius-0" src={props.info.userType.image}></img>
                            </div>
                            <button type="button" className="btn-upload d-flex justify-content-center align-items-center"
                            onClick={()=>{setIsLoadImg(true)}}>
                                    <FontAwesomeIcon icon={faUpload} className="fs-5 upload-img-btn"/>
                                    <div className="upload-img-text">Tải ảnh lên</div>
                            </button>
                            
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="card-block">
                            <div className="m-b-20 p-b-5 b-b-default d-flex align-items-center justify-content-between">
                                <h3 className="f-w-600 mb-0">Sửa thông tin</h3>
                                {/* <img className="mdi mdi-square-edit-outline feather icon-edit" src={images.close}></img> */}
                            </div>
                            
                            <div className="row">
                                <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600">Họ và tên</p>
                                    <input className="border0 text-muted f-w-400" 
                                    placeholder={props.info.userType.fullName}
                                    onChange={(e)=>setName(e.target.value)}/>
                                </div>
                                <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600">Email</p>
                                    <input className="border0 text-muted f-w-400" 
                                    placeholder={props.info.username}
                                    onChange={(e)=>setUsername(e.target.value)}/>
                                </div>
                            </div>
                            <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"></h6>
                            <div className="row">
                                <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600">Giới tính</p>
                                    <input className="border0 text-muted f-w-400" 
                                    placeholder={props.info.userType.sex}
                                    onChange={(e)=>setSex(e.target.value)}/>
                                </div>
                                <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600">Địa chỉ</p>
                                    <input className="border0 text-muted f-w-400" />
                                </div>
                            </div>
                            <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"></h6>
                           
                            
                            <div className="d-flex justify-content-end mt-3">
                                {/* <div className="mx-4" onClick={()=> {navigate('/employees')}}>{Btn({str: 'Hủy'})}</div> */}
                                <div onClick={handleSave}>{Btn({str: 'Lưu'})}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </div> 
    );
}

export default Change;