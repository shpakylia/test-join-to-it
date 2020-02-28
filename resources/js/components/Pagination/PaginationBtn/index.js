import React,{useState} from "react"

const PaginationBtn = ({title, handlePage, page, active}) => {
    return(
        <>
        {
            active ?
                (<button  onClick = {()=>{handlePage(page)}}> {title} </button>)
                :
                (<button> {title} </button>)
        }
        </>
    )
}

export default PaginationBtn
