import React,{useState, useEffect} from "react"
import { useSelector } from 'react-redux';
import MainList from "../MainList"
import ModalForm from "../ModalForm"
import axios from 'axios';
import EmployeeForm from './EmployeeForm';
import Pagination from '../Pagination';


const Employees = () => {

    const [items, setItems] = useState([]);
    const [itemId, setItemId] = useState(null);
    const [openModalStatus, setOpenModalStatus] = useState(false);
    const [companies, setCompanies] = useState([]);

    const langActive = useSelector((state)=>state.langsReducer.langActive);

    const addCompanyNameToList = (items)=>{
        items.map((el)=> {

            const company = companies.find((companyItem) => (companyItem.item_id === el.company_id))
            if(company){
                return el['company_name'] = company.name;
            }
            return el['company_name'] = '';
        })
        return items;
    }

    useEffect(()=>{
        axios.get("/api/companies/list?lang="+langActive.id)
            .then(response => {
                return response;
            })
            .then(result => {
                if(result.status === 200 && result.data){
                    setCompanies(result.data);
                }
            });

    }, [langActive]);


    const editItem = (id) => {
        setItemId(id);
        setOpenModalStatus(true);
    };
    const handleNewCompanyBtn = () => {
        setItemId(null);
        setOpenModalStatus(true);
    };
    const removeItem = (id) => {
        axios.delete("/api/employees/"+id)
            .then(response => {
                return response;
            })
            .then(result => {
                if(result.status === 200){
                    const newItems = items.filter((el) => (el['item_id'] !== id));
                    setItems(addCompanyNameToList(newItems));
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
        setItems(addCompanyNameToList(newItems));
    }
    return (
      <>
          <button type="button" onClick={handleNewCompanyBtn}>
              add new employee
          </button>
          <ModalForm
              title={'Employee'}
              openStatus={openModalStatus}
              setOpenModalStatus={setOpenModalStatus}
          >
            <EmployeeForm id={itemId} setOpenModalStatus={setOpenModalStatus} editDataAfterRequest={editDataAfterRequest} companies={companies}/>
          </ModalForm>
          <MainList title={'Employee list'} items={items} displayFields ={['first_name', 'last_name', 'email', 'company_name']} editItem={editItem} removeItem={removeItem} />
          <Pagination path={"/api/employees"} setItems={setItems}></Pagination>
      < />
    )
}
export default Employees
