import React from "react";


export default function PaginadoEvents({allSmallEventsPagination, eventPerPage, pagination}){


    const pageNumber = []

    for (let i = 0; i <= Math.ceil(allSmallEventsPagination/eventPerPage); i++) {
        pageNumber.push(i+1)
    }

    return(
        <div>
            {
                pageNumber && pageNumber.map(n =>{
                    return <button key = {n} 
                    onClick = {() => pagination(n)}>{n}</button>
                })
            }
        </div>
    )
}