import React from "react"
import ListElement from "../ListElement"

import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

// import Divider from '@material-ui/core/Divider';

const MainList = ({type, items, displayFields , editItem, removeItem}) => {
    const handleEditItem = (id) => {
        editItem(id)
    }
    const handleRemoveItem = (id) => {
        removeItem(id);
    }
    return(
      <Box >
        <h3>{type} List</h3>
        {items.map(item => {
        return(
            <ListElement type={type} item={item} displayFields={displayFields} handleEditItem={handleEditItem} handleRemoveItem={handleRemoveItem}/>
        )
      })}
    </Box>
    )
}

export default MainList
