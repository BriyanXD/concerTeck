import React from "react";
import Style from "./ModalCalendar.module.css"
import { connect } from "react-redux";
import {ModalCalendarVisible} from "../../redux/actions"
import CardEvent from "../CardEvent/CardEvent";

class ModalCalendar extends React.Component{
    handlerClickForCloseModal=()=>{
        this.props.ModalCalendarVisible(false,[])
    }
    chargeEvents(){
        return this.props.stateModalCalendar.eventsForCalendar.map(e => {
         return <CardEvent name={e.name} genre={e.genre} schedule={e.schedule} image={e.performerImage} />})
    }
    errorEvents(){
        return <div>
            <h1>No se encontraron Eventos</h1>
        </div>
    }
    renderModal(){
         return <div className={Style.contenedorgeneral}>
         <div className={Style.info}>
            <div className={Style.containerClose}>
                <button className={Style.botonClose} onClick={this.handlerClickForCloseModal}>X</button>
            </div>
            <div className={Style.containerCards}>
            {this.props.stateModalCalendar.eventsForCalendar.length >= 1?  this.chargeEvents():this.errorEvents()}
            </div>
        </div>


        </div>
    }
    render() {
        return (
            
            this.props.stateModalCalendar.isVisbleModal ? this.renderModal():<></>
        
        );
    }
}
const mapSateToProps = (state) => {
    return {
        stateModalCalendar:state.stateModalCalendar
    }
}



export default connect(mapSateToProps,{ModalCalendarVisible})(ModalCalendar)