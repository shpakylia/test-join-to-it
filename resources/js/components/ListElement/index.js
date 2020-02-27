import React from "react"
import Grid from '@material-ui/core/Grid/Grid';

const ListElement = ({ item, displayFields, handleEditItem, handleRemoveItem}) => {
    const elementList = ()=>{
        let list = [];
        for (let key in item){
            if(displayFields.includes(key)){
                list.push(<Grid item xs={3}><span>{item[key]}</span></Grid>)
            }
        }
        return list;
    }

    return(
    <Grid container direction={'row'} key={item.id}>
        {elementList()}
        <Grid item xs={1}>
            <button onClick={()=> handleEditItem(item['item_id'])}>Edit</button>
        </Grid>
        <Grid item xs={1}>
            <button onClick={() => handleRemoveItem(item['item_id'])}>Remove</button>
        </Grid>
    </Grid>
    )
}

export default ListElement
