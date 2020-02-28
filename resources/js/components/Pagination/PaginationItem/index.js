import React,{useState} from "react"

const PaginationItem = ({handlePage, page, active}) => {

    return(
        <>
        {
            active ?
                (<span style={{
                    fontWeight: 'bold',
                    backgroundColor: 'red',
                    padding: '10px',
                    color: 'white',
                    '&:hover': {
                        cursor: 'poiner'
                    }
                }}>
                        {page}
                </span>)
                :
                (<span
                    style={{
                        backgroundColor: 'black',
                        padding: '10px',
                        color: 'white'
                    }}
                    onClick={()=>{handlePage(page)}}>
                        { page}
                </span>)
        }
        </>
    )
}

export default PaginationItem
