import { Carousel } from "react-responsive-carousel";
import React from 'react'
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import style from './Carousel.module.css'
import { useSelector } from "react-redux";

export default function Carrousel() {
const {AllBigEvents} = useSelector(state => state)

  return (
    <div className={style.container}>
        <Carousel autoPlay={true} infiniteLoop={true} showArrows={true} dynamicHeight={true} showThumbs={false}  centerMode={true}>
            {
              AllBigEvents?.map(e => {return(
                <div>
                  <img className={style.img} alt='' src={e.performerImage}/>
                  <p className={styles.legend}> {e.artist} </p>
                </div>
              )})
            }
            {/* <div>
            <img className={style.img} alt="" src="https://billboard.com.ar/wp-content/uploads/2018/06/69111417b33d14147714a0e09de29e71.jpg" />
            <p className={styles.legend}>Divididos</p>
            </div>
            <div>
            <img className={style.img} alt="" src="https://quedigital.com.ar/web/wp-content/uploads/2015/01/ARBOLITO-00-B.jpg" />
            <p className={styles.legend}>Arbolito</p>
            </div>
            <div>
            <img className={style.img} alt="" src="https://images.ole.com.ar/2021/09/21/JKyvsmFcC_1200x630__1.jpg" />
            <p className={styles.legend}>Depeche Mode</p>
            </div>
            <div>
            <img className={style.img} alt="" src="https://images.ole.com.ar/2021/09/21/JKyvsmFcC_1200x630__1.jpg" />
            <p className={styles.legend}>Coldplay</p>
            </div>
            <div>
            <img className={style.img} alt="" src="https://www.oxigeno.fm/wp-content/uploads/2021/07/Becky-G-estrena-Only-one.jpg" />
            <p className={styles.legend}>Becky G</p>
            </div> */}
        </Carousel>
    </div>
  )
}
