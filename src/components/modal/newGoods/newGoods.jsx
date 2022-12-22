import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/modal';
import 'bootstrap/dist/js/bootstrap.bundle';
import './newGoods.css';
import { useState } from 'react';
import { useReducer, useRef } from 'react';
import { receiveService } from '../../../services';

import { useGoods } from '../../../hooks';
import { goods } from '../../../store/actions';
import { goodsService } from '../../../services';

import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const initState = {
    nameGoods: '',
    countGoods: '',
    priceGoods: '',
    listGoods: []
}

const SET_NAME = 'set_name';
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

function NewGoods({
    title,
    id,
}) {
    const [goodsState, goodsDispatch] = useGoods();
    
    const [state, dispatch] = useReducer(reducer, initState);

    const inputRef = useRef()
    
    const { nameGoods, countGoods, priceGoods, listGoods } = state;
    
    const handleAddGoods = () => {
        if(nameGoods !== '' && countGoods !== '' && priceGoods !== '') 
        {
            dispatch(addGoods({
                name: nameGoods,
                count: countGoods,
                price: priceGoods
            }))
            dispatch(setName(''));
            dispatch(setCount(''));
            dispatch(setPrice(''));
    
            inputRef.current.focus()
        }
        
    }
    const handleSave = () => {
        if(title == 'Nhập hàng') {
            if(listGoods.length !== 0) {
              receiveService.addNote({
                goods: [{
                    "goodsInfo": "637b84aba2ff532426888704",
                    "quantity": "80",
                    "price": "45000",
                },
                {
                    "goodsInfo": "638e00cd3f6f1dc0a1b7feed",
                    "quantity": "120",
                    "price": "7500",
                }],

              })
              .then((response)=> {
                console.log(response);
              })
              .catch((err) => {
                // thông báo lỗi ở đây
                console.log(err)
            })
            console.log('Nhập thành công')
            }
        }
        if(title == 'Xuất hàng') {
            listGoods.length !== 0 ? 
            console.log('Xuất: ',listGoods)
            : console.log('Danh sách rỗng')
        }
        if(title == 'Thêm món') {
            if(listGoods.length !== 0) {
                listGoods.map((g) => {
                    goodsService.addGoods({
                        name: g.name,
                        image: 'https://i.imgur.com/eFWRUuR.jpg',
                        price: g.price,
                        product: g.count,
                        type: 'mainDish',
                        goodsType: {
                            capacity: 0,
                        }
                    })
                    .then((response) => {
                        goodsDispatch(goods.addGoods(response.data));
                        toastr.info(response.message, 'Success', {timeOut: 1000})
                    })
                    .catch((err) => {
                        // thông báo lỗi ở đây
                        console.log(err)
                    })
                })
            }
            else{
                console.log('Danh sách rỗng')
            } 
        }
        if(title == 'Món mới') {
            if(listGoods.length !== 0) {
                listGoods.map((g) => {
                    goodsService.addGoods({
                        name: g.name,
                        image: 'https://i.imgur.com/eFWRUuR.jpg',
                        price: g.price,
                        product: 0,
                        type: 'sideDish',
                        goodsType: {
                            capacity: 0,
                        }
                    })
                    .then((response) => {
                        goodsDispatch(goods.addGoods(response.data));
                        toastr.info(response.message, 'Success', {timeOut: 1000})
                    })
                    .catch((err) => {
                        // thông báo lỗi ở đây
                        console.log(err)
                    })
                })
            }
            else{
                console.log('Danh sách rỗng')
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
                                            <div className="row g-3">
                                                <input type="text" className="form-control py-3 my-3" 
                                                placeholder="Tên món" aria-label="First name" name="name"
                                                ref={inputRef}
                                                onChange={e=>{
                                                    dispatch(setName(e.target.value));
                                                }}
                                                value={nameGoods} required/>
                                            </div>
                                            <div className="row g-3">
                                                <input type="text" className="form-control py-3 my-3" 
                                                placeholder="Số lượng" aria-label="First name" name="count"
                                                onChange={e=>{
                                                    dispatch(setCount(e.target.value));
                                                }}
                                                value={countGoods} required/>
                                            </div>
                                            <div className="row g-3">
                                                <input type="text" className="form-control py-3 my-3" 
                                                placeholder="Giá" aria-label="First name" name="price"
                                                onChange={e=>{
                                                    dispatch(setPrice(e.target.value));
                                                }}
                                                value={priceGoods} required/>
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

export default NewGoods;