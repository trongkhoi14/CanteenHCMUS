
import { useState } from 'react';
import Food from '../../../components/Food';

import 'bootstrap/dist/css/bootstrap.css';
import './home.css';

import { useGoods } from '../../../hooks'
import { goods } from './../../../store/actions'
import { goodsService } from './../../../services'
import { useEffect } from 'react';

import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

function Home() {
    const [goodsState, goodsDispatch] = useGoods();
    useEffect(() => {
        
        goodsService.getAllGoodsOnStoreRoom()
            .then((response) => goodsDispatch(goods.getAllGoodsOnStoreRoom(response)))
            .catch((err) => {
                // thông báo lỗi ở đây
                toastr.warning(err, 'Error', {timeOut: 1000})
            })
            
    }, [])
    
   

    const [currentPage, setCurrentPage] = useState(1);
    const [typeFood, setTypeFood] = useState('Tất cả');
    const itemPerPage = 10;
    const data = goodsState.filter(d => {
        if(typeFood == 'Tất cả') {
            return d.type 
        }
        else if(typeFood == 'Món chính') {
            return d.type == 'mainDish'
        }
        else if(typeFood == 'Món phụ') {
            return d.type == 'sideDish'
        }
    })
    const typelist = ['Tất cả', 'Món chính', 'Món phụ'];
    
    const chosePage = (e) => {
        setCurrentPage(e.target.id);
    }

    const choseType = (e) => {
        setTypeFood(e.target.id);
    }


    const indexOfLastNews = currentPage * itemPerPage;
    const indexOfFirstNews = indexOfLastNews - itemPerPage;
    const currentTodos = data.slice(indexOfFirstNews, indexOfLastNews);
    const renderTodos = currentTodos.map((todo, index) => {
        return <Food key={index} data={todo} />
    });
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemPerPage); i++) {
      pageNumbers.push(i);
    }


    return (
    <div>
        <div className="container d-flex flex-wrap d-flex justify-content-between my-5">
            <div className="d-flex w-100">
                <ul className="type-list">
                    {
                        typelist.map(t => {
                            if(typeFood == t) {
                                return (
                                    <li id={t} key={t} className="active">{t}</li>
                                )
                            } else {
                                return (
                                    <li id={t} key={t} onClick={choseType}>{t}</li>
                                )
                            }
                        })
                    }
                </ul>
            </div>
            
            {renderTodos}
            
            
            <div className="pagination-custom d-flex justify-content-center w-100">
                <ul id="page-numbers" className="page-numbers">
                    {
                    pageNumbers.map(number => {
                        if (currentPage == number) {
                        return (
                            <li key={number} id={number} className="active">
                            {number}
                            </li>
                        )
                        }
                        else {
                        return (
                            <li key={number} id={number} onClick={chosePage}>
                            {number}
                            </li>
                        )
                        }
                    })
                    }
                </ul>
            </div>
        </div>
        
    </div>)
}

export default Home;