

import './UploadImg.css'
import 'bootstrap/dist/css/bootstrap.css';
import Btn from '../../components/Btn';
import { useState } from 'react';

import storage from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from 'react-router-dom';

import { useGoods } from '../../hooks'
import { goods } from './../../store/actions'
import { goodsService } from './../../services'

import { useProfile } from '../../hooks'
import { profile } from './../../store/actions'
import { userService } from './../../services'

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

function UploadImg({
    type,
    id,
    p,
    ...props
}) {

    const [goodsState, goodsDispatch] = useGoods();
    const [profileState, profileDispatch] = useProfile()
    const navigate = useNavigate()
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [isUpload, setIsUpload] = useState(false);
    // progress
    const [percent, setPercent] = useState(0);

    const handleChange = e => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
            if(image!= null) {
                handleUpLoad();
            }
        }
    };

    const handleUpLoad = () => {
        const storageRef = ref(storage, `/files/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef,image)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
 
                // update progress
                setPercent(percent);
            },
            (error) => {
                console.log(error);
            },
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    // console.log(url);
                    setUrl(url);
                    setIsUpload(true);
                });
            }
        );
    }
    if(type == "food") {
        goodsService.getGoodsByID({
            goodsId: id
        })
            .then((response)=>console.log(response.data))
    }
    console.log('id', id);
    console.log('props', p);

    const handleSaveImage = () => {
        if(type == "food") {

            goodsService.updateGoodsByID({
                goodsId: id,
                image: url,
                type: p.type
            }).then((response)=>{
                goodsDispatch(goods.updateGoods(response.data))
                toastr.warning(response.message, 'Success', {timeOut: 1000})
            })
        }
        if(type == "person") {
            userService.updateProfile({
                image: url,
            }).then((response)=>{
                
                profileDispatch(profile.updateProfile(response.data));
                toastr.info(response.message, 'Success', {timeOut: 1000})
            })
            .catch((err) => {
                // thông báo lỗi ở đây
                console.log(err)
            })
        }
        props.parentCallback(false)
      
    }

    
    return (
        <div>
            <div className="bg-container"></div>
            <div className="mycontainer d-flex justify-content-between align-items-center 
            flex-column m-auto">
                <div className="d-flex justify-content-between align-items-center 
                flex-column">
                    <input type="file" className="form-control myinput"
                    onChange={handleChange}></input>
                    <p className="mb-0">Vui lòng chờ: {percent}%</p>
                </div>
                <img src={url || "http://via.placeholder.com/300"} alt="firebase-image" className="img"/>  
                <div className="d-flex justify-content-end my-3">
                    <div className="cancel-btn" onClick={handleUpLoad}><Btn str="Tải lên"/></div>
                    {isUpload? 
                    <Link to={type == "food"? "/canteen" : "/profile"}
                    onClick={handleSaveImage}><Btn str="Lưu"
                    /></Link>
                    :<></>}
                </div>
            </div>
        </div>
    )
}


export default UploadImg;