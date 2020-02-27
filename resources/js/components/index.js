import React,{useState} from "react"
import NavPanel from "./NavPanel"
import UserForm from "./UserForm"
import Router from "../../Router"


 const MainPage = () => {

    const [items,setItems] = useState([{name:"name1",id:"id1"},{name:"name2",id:"id2"}]);

    return(
        <>        
        <NavPanel />
        <Router />
        </>
    )
}

export default MainPage