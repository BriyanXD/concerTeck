import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import s from '../Calendar/Calendar.module.css'
import interactionPlugin from "@fullcalendar/interaction"; 
import {useSelector} from 'react-redux'



export default function Calendar() {

    const events = []
    const events2 = []

    const {AllEvents} = useSelector(state => state)
    // console.log('eventos:',AllEvents)


function handleDateClick(arg){ 
  AllEvents?.map((event) => {
    events2.push({title: event.name})
  })
    alert('Horario ' + arg.events2)
}

      return (
        <div className={s.calendar}>
        {
            AllEvents?.map((e)=>{
                events.push({title:e.name, date:e.schedule.split('T')[0], })
            })
            
        }
        <FullCalendar
          plugins={[ dayGridPlugin, interactionPlugin ]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          selectable={true}
          selectHelper={true}
          events={events}
          
        />
        </div>
      )
}

