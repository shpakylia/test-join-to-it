import React from "react"
import ListElement from "./ListElement"
import Box from '@material-ui/core/Box';

// import Divider from '@material-ui/core/Divider';

const MainList = ({title, items, displayFields , editItem, removeItem}) => {
    const handleEditItem = (id) => {
        editItem(id)
    }
    const handleRemoveItem = (id) => {
        removeItem(id);
    }
    return(
      <Box >
        <h3>{title}</h3>
        {items.map(item => {
        return(
            <ListElement key={item.id} item={item} displayFields={displayFields} handleEditItem={handleEditItem} handleRemoveItem={handleRemoveItem}/>
        )
      })}
    </Box>
    )
}

export default MainList
