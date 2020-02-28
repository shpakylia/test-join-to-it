import React,{useState, useEffect} from "react"
import { useSelector } from 'react-redux';
import MainList from "../MainList"
import ModalForm from "../ModalForm"
import axios from 'axios';
import CompanyForm from './CompanyForm';
import Pagination from '../Pagination';
import * as trans from '../../../lang/admin/companies';


const Companies = () => {
    const langActive = useSelector((state)=>state.langsReducer.langActive);
    const translation = langActive.short ? trans[langActive.short] : trans['en'];
    const [items, setItems] = useState([]);
    const [itemId, setItemId] = useState(null);
    const [openModalStatus, setOpenModalStatus] = useState(false);
    const editItem = (id) => {
        setItemId(id);
        setOpenModalStatus(true);
    };
    const handleNewCompanyBtn = () => {
        setItemId(null);
        setOpenModalStatus(true);
    };
    const removeItem = (id) => {
        axios.delete("/api/companies/"+id)
            .then(response => {
                return response;
            })
            .then(result => {
                if(result.status === 200){
                    const newItems = items.filter((el) => (el['item_id'] !== id));
                    setItems(newItems);
                }
            });
    };

    const editDataAfterRequest = (item)=> {
        const existItem = items.find((el)=> {
            return el.id === item.id;
        });
        let newItems = [];
        if(existItem){
            newItems = items.map((el)=> {
                if(el === existItem ){
                    el = item;
                }
                return el;
            });
        }
        else {
            newItems = [item, ...items];
        }
        setItems(newItems);
    }
    return (
      <>
          <button type="button" onClick={handleNewCompanyBtn}>
              {translation.addBtn}
          </button>
          <ModalForm
              title={'Company'}
              openStatus={openModalStatus}
              setOpenModalStatus={setOpenModalStatus}
          >
            <CompanyForm id={itemId} setOpenModalStatus={setOpenModalStatus} editDataAfterRequest={editDataAfterRequest}/>
          </ModalForm>
          <MainList title={translation.listTitle} items={items} displayFields ={['name', 'email', 'website']} editItem={editItem} removeItem={removeItem} />
          <Pagination path={"/api/companies"} setItems={setItems}></Pagination>
      < />
    )
}
export default Companies
