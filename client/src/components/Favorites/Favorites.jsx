import React from "react";
import { useSelector } from "react-redux";
import s from './Favorites.module.css'
import CardBigEvent from "../CardBigEvent/CardBigEvent";
import CardEvent from "../CardEvent/CardEvent";



export default function Favorites(){
    const {Likes} = useSelector((state)=> state)
    const bigEvents = Likes.filter((b)=>b.venue.isBigEvent===true)
    const events = Likes.filter((b)=>b.venue.isBigEvent===false)
    console.log('likes:', Likes)

    return(
        <div className={s.font}>
            <h4>favoritos</h4>
            {
                bigEvents?.map((el)=>{
                    return (
                       
                        <div>
                            {/* <h3>{el.name}</h3> */}
                        <CardBigEvent
                        name={el.name}
                        genreId={el.genreId}
                        image={el.performerImage}
                        schedule={el.schedule}
                        id={el.id}
                      />
                    </div>
                )})
            }
            {
                                events?.map((el)=>{
                                    return(
                                        <CardEvent
                                        name={el.name}
                                        image={el.performerImage}
                                        schedule={el.schedule}
                                        id={el.id}
                                      />
                                    )
                                })
            }
        </div>
    )

}