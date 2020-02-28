import React, { useEffect,useState } from "react"
import PaginationItem from "./PaginationItem"
import PaginationBtn from "./PaginationBtn"
import axios from "axios"
import {useSelector} from 'react-redux';

const Pagination = ({ path='', setItems}) => {
    const [current, setCurrent] = useState(1);
    const [total,setTotal] = useState(1);
    const langActive = useSelector((state)=>state.langsReducer.langActive);

    const handlePage = (page) => {
        setCurrent(page);
        fetchItems(page);
    }

    useEffect(()=>{
        fetchItems();
    },[langActive]);

    const fetchItems = (page) => {
        axios.get(path + "?lang="+langActive.id + "&page=" + page)
            .then(response => {
                return response;
            })
            .then(result => {
                if(result.status === 200 && result.data.data){
                    setTotal(result.data.last_page);
                    setItems(result.data.data);
                }
            });
    };


    const getPaginationItems = ()=>{
        let paginationItems = [];
        for (let i = 1; i <= total ;i++){

            paginationItems.push(<PaginationItem  handlePage={handlePage} page={i} active={current===i} />)
        }
        return paginationItems;
    };
    const getPaginationBtns = ()=>{
        let paginationBtns = [];
        if(current == 1 && total > 1){
            paginationBtns.push(<PaginationBtn title={'prev'} active={false} />)
            paginationBtns.push(<PaginationBtn title={'next'} handlePage={handlePage} page={current+1} active={true} />)
            return paginationBtns;
        }
        if(current == total && total > 1){
            paginationBtns.push(<PaginationBtn title={'next'} active={false} />)
            paginationBtns.push(<PaginationBtn title={'prev'} handlePage={handlePage} page={current-1} active={true} />)
            return paginationBtns;
        }
        paginationBtns.push(<PaginationBtn title={'prev'} handlePage={handlePage} page={current-1} active={true} />)
        paginationBtns.push(<PaginationBtn title={'next'} handlePage={handlePage} page={current+1} active={true} />)
        return paginationBtns;
    };

    return(
        <div>
            {getPaginationBtns()}
        </div>
    )
}

export default Pagination
