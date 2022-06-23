import React from "react";


export default function PaginadoEvents({allSmallEventsPagination, eventPerPage, pagination}){


    const pageNumber = []

    for (let i = 1; i <= Math.ceil(allSmallEventsPagination/eventPerPage); i++) {
        pageNumber.push(i)
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