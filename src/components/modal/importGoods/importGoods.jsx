import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/modal'
import 'bootstrap/dist/js/bootstrap.bundle'
import './importGoods.css'
import { useState } from 'react';
import { useReducer, useRef } from 'react';
import { receiveService, deliveryService } from '../../../services';
import NewGoods from '../newGoods/newGoods';

import { useGoods } from '../../../hooks'
import { goods } from './../../../store/actions'
import { goodsService } from '../../../services';

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

const initState = {
    nameGoods: '',
    idGoods: '',
    countGoods: '',
    priceGoods: '',
    listGoods: []
}

const SET_NAME = 'set_name';
const SET_ID = 'set_id';
const SET_COUNT = 'set_count';
const SET_PRICE = 'set_price';
const ADD_GOODS = 'add_goods';
const DELETE_GOODS = 'delete_goods'

const setName = payload => {
    return {
        type: SET_NAME,
        payload
    }
}
const setId = payload => {
    return {
        type: SET_ID,
        payload
    }
}
const setCount = payload => {
    return {
        type: SET_COUNT,
        payload
    }
}
const setPrice = payload => {
    return {
        type: SET_PRICE,
        payload
    }
}
const addGoods = payload => {
    return {
        type: ADD_GOODS,
        payload
    }
}
const deleteGoods = payload => {
    return {
        type: DELETE_GOODS,
        payload
    }
}

const reducer = (state, action) => {
    switch(action.type) {
        case SET_NAME: 
            return {
                ...state,
                nameGoods: action.payload
            }
        case SET_ID: 
            return {
                ...state,
                idGoods: action.payload
            }
        case SET_COUNT: 
            return {
                ...state,
                countGoods: action.payload
            }
        case SET_PRICE: 
            return {
                ...state,
                priceGoods: action.payload
            }
        case ADD_GOODS: 
            return {
                ...state,
                listGoods: [...state.listGoods, action.payload]
            }
        case DELETE_GOODS:
            const newListGoods = [...state.listGoods];
            newListGoods.splice(action.payload, 1);
            return {
                ...state,
                listGoods: newListGoods
            }
        default: 
            throw new Error('Invalid action')
    }
}

function ImportGoods({
    title,
    id,
}) {
    const [goodsState, goodsDispatch] = useGoods();
    const [errorMess, setErrorMess] = useState('');
    const [state, dispatch] = useReducer(reducer, initState);

    const inputRef = useRef()
    
    const { nameGoods, countGoods, priceGoods, listGoods, idGoods } = state;

    const goodsInWarehouse = goodsState.filter(g => g.type === "sideDish") 
    const handleAddGoods = () => {
        if(nameGoods !== '' && countGoods !== '' && priceGoods !== '') 
        {
            const getId = goodsInWarehouse.filter(g => g.name === nameGoods);
            console.log(getId[0])
            if(title === 'Xuất hàng') {
                //Nếu số lượng trong kho < số lượng xuất
                if(getId[0].goodsType.capacity < countGoods) {
                    setErrorMess('Số lượng trong kho không đủ')
                }
                else {
                    dispatch(addGoods({
                        name: nameGoods,
                        count: countGoods,
                        price: priceGoods,
                        id: getId[0]._id,
                    }))
                    dispatch(setName(''));
                    dispatch(setCount(''));
                    dispatch(setPrice(''));
                    setErrorMess('')
                }
            }
            else {
                dispatch(addGoods({
                    name: nameGoods,
                    count: countGoods,
                    price: priceGoods,
                    id: getId[0]._id,
                }))
                dispatch(setName(''));
                dispatch(setCount(''));
                dispatch(setPrice(''));
                setErrorMess('')
            }
           
        }
        else if(nameGoods === '') {
            setErrorMess('Vui lòng chọn món')
        }
        else if(countGoods == '') {
            setErrorMess('Vui lòng chọn số lượng')
        }
        else if(priceGoods == '') {
            setErrorMess('Vui lòng chọn giá lượng')
        }
        
    }

    const handleSave = () => {
        if(title === 'Nhập hàng') {
            if(listGoods.length !== 0) {
            const goodsArr = [];
            listGoods.map(l => {
                goodsArr.push({
                    "goodsInfo": l.id,
                    "quantity": l.count,
                    "price": l.price,
                })
            })
            receiveService.addNote({goods: goodsArr})
                .then((response)=> {
                    response.data.goods.map(g=>{
                        goodsDispatch(goods.updateGoods(g.goodsInfo))
                    })
                    //goodsDispatch(goods.updateGoods())
                    toastr.info(response.message, 'Success', {timeOut: 3000})
                })
                .catch((err) => {
                // thông báo lỗi ở đây
                console.log(err)
                })
            
            }
        }
        if(title === 'Xuất hàng') {
            if(listGoods.length !== 0) {
                const goodsArr = [];
                listGoods.map(l => {
                    goodsArr.push({
                        "goodsInfo": l.id,
                        "quantity": l.count,
                        "price": l.price,
                    })
                })
                deliveryService.addNote({goods: goodsArr})
                    .then((response)=> {
                        console.log(response)
                        response.data.goods.map(g=>{
                            goodsDispatch(goods.updateGoods(g.goodsInfo))
                        })
                        toastr.info(response.message, 'Success', {timeOut: 3000})
                    })
                    .catch((err) => {
                    // thông báo lỗi ở đây
                    console.log(err)
                    })
                
                }
        } 
    }

    const renderList = listGoods.map((goods, index) => {
        return (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                    <div className="fw-bold text-uppercase d-flex">
                        {goods.name}
                        <span className="badge bg-success rounded-pill mx-2">{goods.count}</span>
                    </div>
                    <div className="d-flex justify-content-between w-100">
                        <div>Giá: {goods.price} VNĐ</div>
                        
                    </div>
                    
                </div>
                <div className="d-flex flex-column justify-content-between">
                    <span className="fs-3 cursor-pointer" onClick={()=>dispatch(deleteGoods(index))}>&times;</span>
                </div>
                
            </li>
        )
    })

    return ( 

        <div>
            <button type="button" className="btn btn-outline-danger py-2 px-4" data-bs-toggle="modal" data-bs-target={'#'+id}>
                {title}
            </button>

            <div className="modal fade" id={id} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" 
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">{title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* Danh sách các món đã thêm */}
                            <ol className="list-group list-group-numbered">
                                {renderList}
                            </ol>
                             
                            {/* Thêm món */}
                            <div className="accordion py-3" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button" type="button" 
                                        data-bs-toggle="collapse" data-bs-target="#collapseOne" 
                                        aria-expanded="true" aria-controls="collapseOne">
                                            Thêm món
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <form onSubmit={(e)=>{e.preventDefault()}}>
                                            <div class="row g-3">
                                                <select class="form-select w-100 my-3" id="inputGroupSelect01"
                                                onChange={e=>{
                                                    dispatch(setName(e.target.value))}}>
                                                    <option value="" selected>Chọn món...</option>
                                                    {goodsInWarehouse.map((g,index)=>{
                                                        return (
                                                            <option value={g.name}>{g.name}</option>
                                                        )
                                                    })}
                                                    
                                                </select>
                                            </div>
                                            <div className="row g-3">
                                                <input type="text" className="form-control py-3 my-3" 
                                                placeholder="Số lượng" aria-label="First name" name="count"
                                                onChange={e=>{
                                                    dispatch(setCount(e.target.value));
                                                }}
                                                value={countGoods}/>
                                            </div>
                                            <div className="row g-3">
                                                <input type="text" className="form-control py-3 my-3" 
                                                placeholder="Giá" aria-label="First name" name="price"
                                                onChange={e=>{
                                                    dispatch(setPrice(e.target.value));
                                                }}
                                                value={priceGoods}/>
                                            </div>
                                            <div className="row g-3 ">
                                                <div className="form-control text-danger border-0 mt-0"> {errorMess}</div>
                                               
                                            </div>
                                            <div className="row g-3">
                                                <button type="submit" className="btn btn-light mx-0"
                                                onClick={handleAddGoods} >Thêm</button>
                                            </div>
                                        </form>
                                        
                                        
                                    </div>
                                    </div>
                                </div>
                            </div>
                            {/*  */}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                            <button type="button" className="btn btn-success"
                            onClick={handleSave} data-bs-dismiss="modal">Lưu</button>
                        </div>
                    </div>
                </div>
            </div>  
        </div> 
    );
}

export default ImportGoods;