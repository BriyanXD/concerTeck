import React from "react";
import { useSelector, useDispatch } from "react-redux";
import s from './Favorites.module.css'
import CardBigEvent from "../CardBigEvent/CardBigEvent";
import CardEvent from "../CardEvent/CardEvent";
import { RemoveFavorite } from "../../redux/actions";
import FooterFav from "./FooterFav/FooterFav";



export default function Favorites(){
    const {Likes} = useSelector((state)=> state)
    const dispatch = useDispatch()
    const bigEvents = Likes.filter((b)=>b.venue.isBigEvent===true)
    const events = Likes.filter((b)=>b.venue.isBigEvent===false)
    // console.log('likes:', Likes)

    return(
        <div>
            <div>
            <div className={s.container}>
            {
                bigEvents?.map((el)=>{
                    return (
                       
                     <div className={s.containerClose}>
                        <CardBigEvent
                        name={el.name}
                        genreId={el.genreId}
                        image={el.performerImage}
                        schedule={el.schedule}
                        id={el.id}
                      />
                      <button className={s.btn} onClick={()=>dispatch(RemoveFavorite(el))}>X</button>

                 </div>
                )})
            }
            {
                events?.map((el)=>{
                    return(
                     <div className={s.containerClose2}>
                        <CardEvent
                        name={el.name}
                        image={el.performerImage}
                        schedule={el.schedule}
                        id={el.id}
                        />
                        <button className={s.btn2} onClick={()=>dispatch(RemoveFavorite(el))}> X </button>
                     </div>
                        )
                    })
                }
                </div>
                </div>
                <div>
                    <FooterFav/>
                </div>
            </div>
    )

}